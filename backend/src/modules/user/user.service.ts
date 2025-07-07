import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../../core/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email, senha, ...rest } = createUserDto;

    const existingUser = await this.findByEmail(email);

    if (existingUser) {
      throw new ConflictException('Usuário já existe com este email');
    }

    const hashedPassword = await bcrypt.hash(senha, 10);

    const user = this.usersRepository.create({
      ...rest,
      email,
      senha: hashedPassword,
    });

    return await this.usersRepository.save(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findById(id);

    const existingUser = await this.findByEmail(updateUserDto.email);

    if (existingUser && existingUser.id !== user.id) {
      throw new ConflictException('Usuário já existe com este email');
    }

    if (updateUserDto.senha && updateUserDto.senha !== user.senha) {
      updateUserDto.senha = await bcrypt.hash(updateUserDto.senha, 10);
    }

    Object.assign(user, updateUserDto);

    return await this.usersRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findById(id);
    await this.usersRepository.remove(user);
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.findByEmail(email);

    if (user && bcrypt.compareSync(password, user.senha)) {
      return user;
    }

    return null;
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findOne({
      where: { email },
    });
  }

  async findById(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }
}
