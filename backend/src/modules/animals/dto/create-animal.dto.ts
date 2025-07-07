import { IsString } from 'class-validator';

export class CreateAnimalDto {

	@IsString()
	descricao: string;

	@IsString()
	dono: string;

	@IsString()
	endereco: string;

	@IsString()
	contato: string;

	@IsString()
	referencia: string;

	@IsString()
	status: string;
}