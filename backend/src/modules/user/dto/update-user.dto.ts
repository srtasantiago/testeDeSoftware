import { IsOptional, IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsEmail()
  email: string;

  @IsString()
  senha: string;

  @IsString()
  cidade: string;

  @IsString()
  @IsOptional()
  sexo: string;

  @IsString()
  endereco: string;
}