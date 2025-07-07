import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query, Put } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createAnimalDto: CreateAnimalDto, @Request() req) {
    const animal = await this.animalsService.create(createAnimalDto, req.user.userId);
    
    return {
      success: true,
      message: 'Animal cadastrado com sucesso',
      data: { animal },
    };
  }

  @Get()
  async findAll(@Query() query: any) {
    const result = await this.animalsService.findAll(query);
    
    return {
      success: true,
      data: result,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const animal = await this.animalsService.findOne(id);
    
    return {
      success: true,
      data: { animal },
    };
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateAnimalDto: UpdateAnimalDto, @Request() req) {
    const animal = await this.animalsService.update(id, updateAnimalDto, req.user.userId);
    
    return {
      success: true,
      message: 'Animal atualizado com sucesso',
      data: { animal },
    };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @Request() req) {
    await this.animalsService.remove(id, req.user.userId);
    
    return {
      success: true,
      message: 'Animal removido com sucesso',
    };
  }
}