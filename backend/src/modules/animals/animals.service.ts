import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { Animal } from '../../core/entities/animal.entity';

@Injectable()
export class AnimalsService {
  constructor(
    @InjectRepository(Animal)
    private animalsRepository: Repository<Animal>,
  ) {}

  async create(createAnimalDto: CreateAnimalDto, userId: string): Promise<Animal> {
    const animal = this.animalsRepository.create({
      ...createAnimalDto,
      user_id: userId,
    });

    return await this.animalsRepository.save(animal);
  }

  async findAll(query: any) {
    const { status, user_id, page = 1, limit = 10 } = query;

    const queryBuilder = this.animalsRepository.createQueryBuilder('animals')

    if (status) {
      queryBuilder.andWhere('animals.status = :status', { status });
    }

	if (user_id) {
      queryBuilder.andWhere('animals.user_id = :user_id', { user_id });
    }

    const offset = (page - 1) * limit;
    queryBuilder.skip(offset).take(limit);
    queryBuilder.orderBy('animals.criadoEm', 'DESC');

    const [animals, total] = await queryBuilder.getManyAndCount();

    return {
      animals,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total,
      },
    };
  }

  async findOne(id: string): Promise<Animal> {
    const animal = await this.animalsRepository.findOne({
      where: { id }
    });

    if (!animal) {
      throw new NotFoundException('Animal não encontrado');
    }

    return animal;
  }

  async update(id: string, updateAnimalDto: UpdateAnimalDto, userId: string): Promise<Animal> {
    const animal = await this.findOne(id);

    if (animal.user_id !== userId) {
      throw new ForbiddenException('Não autorizado');
    }

    Object.assign(animal, updateAnimalDto);

    return await this.animalsRepository.save(animal);
  }

  async remove(id: string, userId: string): Promise<void> {
    const animal = await this.findOne(id);

    if (animal.user_id !== userId) {
      throw new ForbiddenException('Não autorizado');
    }

    await this.animalsRepository.remove(animal);
  }
}