import { Controller, Get, Body, Delete, UseGuards, Request, Put } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  async getProfile(@Request() req) {
    const user = await this.usersService.findById(req.user.userId);
    const { senha, ...result } = user;
    
    return {
      success: true,
      data: { user: result },
    };
  }

  @Put('profile')
  async updateProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(req.user.userId, updateUserDto);
    const { senha, ...result } = user;
    
    return {
      success: true,
      message: 'Dados atualizados com sucesso',
      data: { user: result },
    };
  }

  @Delete('profile')
  async removeProfile(@Request() req) {
    await this.usersService.remove(req.user.userId);
    
    return {
      success: true,
      message: 'Conta removida com sucesso',
    };
  }
}