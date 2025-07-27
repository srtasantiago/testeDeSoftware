import { Repository } from "typeorm";
import { UsersService } from "../user.service";
import * as bcrypt from 'bcryptjs';
import { User } from "../../../core/entities/user.entity";
import { CreateUserDto } from "../dto/create-user.dto";
import { ConflictException } from "@nestjs/common";

jest.mock('bcryptjs');
const mockedBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;

describe('UsersService', () => {

	const userRepository = {
		findOne: jest.fn(),
		create: jest.fn(),
		save: jest.fn(),
		remove: jest.fn()
	};

	let usersService: UsersService;

	beforeEach(() => {

		usersService = new UsersService(userRepository as unknown as Repository<User>);

		jest.clearAllMocks();
	});

	it('has instance', () => {
		expect(usersService).toBeInstanceOf(UsersService);
	});

	describe('create', () => {

		it('should create a user', async () => {
			const createUserDto = {
				nome: 'Test User',
				email: 'test.user@example.com',
				senha: 'password123',
				cidade: 'Test City',
				sexo: 'Masculino',
				endereco: '123 Test St'
			} as CreateUserDto;
			const hashedPassword = 'hashedPassword123';

			userRepository.findOne.mockResolvedValue(null);
			userRepository.create.mockImplementation((obj) => obj);
			userRepository.save.mockImplementation((obj) => obj);

			mockedBcrypt.hash.mockResolvedValue(hashedPassword as never);

			const result = await usersService.create(createUserDto);
			expect(result).toEqual({ ...createUserDto, senha: hashedPassword });
			expect(userRepository.findOne).toHaveBeenCalledWith({ where: { email: createUserDto.email } });
			expect(userRepository.create).toHaveBeenCalledWith({ ...createUserDto, senha: hashedPassword });
			expect(userRepository.save).toHaveBeenCalledWith({ ...createUserDto, senha: hashedPassword });
		});

		it('should throw ConflictException if user already exists', async () => {
			const createUserDto = {
				nome: 'Test User',
				email: 'test.user@example.com',
				senha: 'password123',
				cidade: 'Test City',
				sexo: 'Masculino',
				endereco: '123 Test St'
			} as CreateUserDto;

			userRepository.findOne.mockResolvedValue(createUserDto);

			await expect(usersService.create(createUserDto)).rejects.toThrow(ConflictException);
			expect(userRepository.findOne).toHaveBeenCalledWith({ where: { email: createUserDto.email } });
		});
	});

	describe('update', () => {

		it('should update a user', async () => {
			const updateUserDto = {
				email: 'test.user@example.com',
				senha: 'newpassword123',
				cidade: 'New City',
				sexo: 'Masculino',
				endereco: '456 New St'
			} as CreateUserDto;
			const mockedCurrentUser = {
				id: 'user-id',
				email: 'test.user@example.com',
				senha: 'hashedPassword123',
				cidade: 'Test City',
				sexo: 'Masculino',
				endereco: '123 Test St'
			};
			const expectedUpdatedUser = {
				...mockedCurrentUser,
				...updateUserDto,
				senha: 'hashedNewPassword123'
			};

			userRepository.findOne.mockResolvedValueOnce(mockedCurrentUser);
			userRepository.findOne.mockResolvedValueOnce(null);
			userRepository.save.mockImplementation((obj) => obj);

			mockedBcrypt.compareSync.mockReturnValue(false);
			mockedBcrypt.hash.mockResolvedValue('hashedNewPassword123' as never);

			const result = await usersService.update('user-id', updateUserDto);
			expect(result).toEqual(expectedUpdatedUser);
			expect(userRepository.findOne).toHaveBeenCalledWith({ where: { email: 'test.user@example.com' } });
			expect(userRepository.save).toHaveBeenCalledWith(expectedUpdatedUser);
		});

		it('should throw NotFoundException if user does not exist', async () => {
			const updateUserDto = {
				email: 'test.user@example.com',
				senha: 'newpassword123',
				cidade: 'New City',
				sexo: 'Masculino',
				endereco: '456 New St'
			} as CreateUserDto;

			userRepository.findOne.mockResolvedValue(null);

			await expect(usersService.update('non-existing-id', updateUserDto)).rejects.toThrow('Usuário não encontrado');
			expect(userRepository.findOne).toHaveBeenCalledWith({ where: { id: 'non-existing-id' } });
			expect(userRepository.save).not.toHaveBeenCalled();
		});

		it('should throw ConflictException if email already exists', async () => {
			const updateUserDto = {
				email: 'existing.user@example.com',
				senha: 'newpassword123',
				cidade: 'New City',
				sexo: 'Masculino',
				endereco: '456 New St'
			} as CreateUserDto;
			const mockedCurrentUser = {
				id: 'user-id',
				email: 'test.user@example.com',
				senha: 'hashedPassword123',
				cidade: 'Test City',
				sexo: 'Masculino',
				endereco: '123 Test St'
			};
			const existingUser = {
				id: 'existing-user-id',
				email: 'existing.user@example.com',
				senha: 'hashedPassword456',
				cidade: 'Existing City',
				sexo: 'Feminino',
				endereco: '789 Existing St'
			};

			userRepository.findOne.mockResolvedValueOnce(mockedCurrentUser);
			userRepository.findOne.mockResolvedValueOnce(existingUser);

			await expect(usersService.update('user-id', updateUserDto)).rejects.toThrow('Usuário já existe com este email');
			expect(userRepository.findOne).toHaveBeenCalledWith({ where: { email: updateUserDto.email } });
			expect(userRepository.save).not.toHaveBeenCalled();
		});
	});

	describe('remove', () => {

		it('should remove a user', async () => {
			const mockedUser = {
				id: 'user-id',
				nome: 'Test User',
				email: 'test.user@example.com',
				senha: 'hashedPassword123',
				cidade: 'Test City',
				sexo: 'Masculino',
				endereco: '123 Test St'
			};

			userRepository.findOne.mockResolvedValueOnce(mockedUser);
			userRepository.remove.mockResolvedValueOnce(undefined);

			await usersService.remove('user-id');

			expect(userRepository.findOne).toHaveBeenCalledWith({ where: { id: 'user-id' } });
			expect(userRepository.remove).toHaveBeenCalledWith(mockedUser);
		});
	});

	describe('validateUser', () => {

		it('should validate user with correct credentials', async () => {
			const email = 'test.user@example.com';
			const password = 'password123';

			userRepository.findOne.mockResolvedValueOnce({
				id: 'user-id',
				email,
				senha: 'hashedPassword123',
			});

			mockedBcrypt.compareSync.mockReturnValue(true);

			const result = await usersService.validateUser(email, password);

			expect(result).toEqual({
				id: 'user-id',
				email,
				senha: 'hashedPassword123',
			});
		});

		it('should return null for invalid credentials', async () => {
			const email = 'test.user@example.com';
			const password = 'wrongpassword';

			userRepository.findOne.mockResolvedValueOnce({
				id: 'user-id',
				email,
				senha: 'hashedPassword123',
			});

			mockedBcrypt.compareSync.mockReturnValue(false);

			const result = await usersService.validateUser(email, password);

			expect(result).toBeNull();
		});
	});

	describe('findByEmail', () => {

		it('should find user by email', async () => {
			const email = 'test.user@example.com';

			userRepository.findOne.mockResolvedValueOnce({
				id: 'user-id',
				email,
				senha: 'hashedPassword123',
			});

			const result = await usersService.findByEmail(email);

			expect(result).toEqual({
				id: 'user-id',
				email,
				senha: 'hashedPassword123',
			});
		});
	});

	describe('findById', () => {

		it('should find user by id', async () => {
			const id = 'user-id';

			userRepository.findOne.mockResolvedValueOnce({
				id,
				nome: 'Test User',
				email: 'test.user@example.com',
				senha: 'hashedPassword123',
			});

			const result = await usersService.findById(id);

			expect(result).toEqual({
				id,
				nome: 'Test User',
				email: 'test.user@example.com',
				senha: 'hashedPassword123',
			});
		});

		it('should throw NotFoundException if user does not exist', async () => {
			const id = 'non-existing-id';

			userRepository.findOne.mockResolvedValueOnce(null);

			await expect(usersService.findById(id)).rejects.toThrow('Usuário não encontrado');
			expect(userRepository.findOne).toHaveBeenCalledWith({ where: { id } });
		});
	});
});