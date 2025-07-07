import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../../core/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.validateUser(email, password);
    
    if (user) {
      const { senha, ...result } = user;
      return result;
    }
    
    return null;
  }

  async login(user: User) {
	const { senha, ...userWithoutPassword } = user;
    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);
    
    return {
      success: true,
      message: 'Login realizado com sucesso',
      data: {
        user: userWithoutPassword,
        token,
      },
    };
  }

  async register(createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    const { senha, ...result } = user;
    
    return {
      success: true,
      message: 'Usuário cadastrado com sucesso',
      data: {
        user: result,
      },
    };
  }
}