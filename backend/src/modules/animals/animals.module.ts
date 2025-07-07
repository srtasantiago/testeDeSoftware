import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Animal } from '../../core/entities/animal.entity';
import { AnimalsController } from './animals.controller';
import { AnimalsService } from './animals.service';
import { CloudinaryModule } from '../../core/cloudinary/cloudinary.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Animal]),
    CloudinaryModule
  ],
  controllers: [AnimalsController],
  providers: [AnimalsService],
})
export class AnimalsModule {}