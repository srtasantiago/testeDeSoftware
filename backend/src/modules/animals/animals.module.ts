import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Animal } from '../../core/entities/animal.entity';
import { AnimalsController } from './animals.controller';
import { AnimalsService } from './animals.service';
import { S3Module } from '../../core/s3/s3.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Animal]),
    S3Module
  ],
  controllers: [AnimalsController],
  providers: [AnimalsService],
})
export class AnimalsModule {}