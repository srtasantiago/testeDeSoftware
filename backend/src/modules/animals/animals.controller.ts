import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query, Put, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('animals')
@UseGuards(JwtAuthGuard)
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

  @Post(':id/image')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('imagem'))
  async uploadImage(
    @Param('id') id: string,
    @Request() req,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB
          new FileTypeValidator({ fileType: /^image\/(jpeg|png|jpg|gif|webp)$/ }),
        ],
        fileIsRequired: true,
      }),
    )
    file: Express.Multer.File,
  ) {
    const animal = await this.animalsService.uploadImage(id, req.user.userId, file);
    
    return {
      success: true,
      message: 'Imagem enviada com sucesso',
      data: { 
        animal,
        imagem_url: animal.imagem_url 
      },
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