import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../../user/user.service";
import { AuthService } from "../auth.service";
import { User } from "../../../core/entities/user.entity";
import { CreateUserDto } from "../../user/dto/create-user.dto";

describe('AuthService', () => {

	const usersService = {
		validateUser: jest.fn(),
		create: jest.fn(),
	};
	const jwtService = {
		sign: jest.fn(),
	};

	let authService: AuthService;

	beforeEach(() => {
		authService = new AuthService(
			usersService as unknown as UsersService,
			jwtService as unknown as JwtService);

		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(authService).toBeDefined();
	});

	describe('validateUser', () => {

		it('should return user without password if valid', async () => {
			const email = 'test@example.com';
			const password = 'password';

			usersService.validateUser.mockResolvedValue({ email, senha: password });

			const result = await authService.validateUser(email, password);

			expect(result).toEqual({ email });
		});

		it('should return null if user is not valid', async () => {
			const email = 'test@example.com';
			const password = 'wrongpassword';

			usersService.validateUser.mockResolvedValue(null);

			const result = await authService.validateUser(email, password);

			expect(result).toBeNull();
		});
	});

	describe('login', () => {

		it('should return user data and token on successful login', async () => {
			const user = { id: '1', email: 'test@example.com', senha: 'password' };

			jwtService.sign.mockReturnValue('token');

			const result = await authService.login(user as User);

			expect(result).toEqual({
				success: true,
				message: 'Login realizado com sucesso',
				data: {
					user: { id: '1', email: 'test@example.com' },
					token: 'token',
				},
			});
		});
	});

	describe('register', () => {

		it('should register a new user and return user data', async () => {
			const createUserDto = { email: 'test@example.com', senha: 'password' };

			usersService.create.mockResolvedValue({ id: '1', ...createUserDto });

			const result = await authService.register(createUserDto as CreateUserDto);

			expect(result).toEqual({
				success: true,
				message: 'Usuário cadastrado com sucesso',
				data: {
					user: { id: '1', email: 'test@example.com' },
				},
			});
		});
	});
});
