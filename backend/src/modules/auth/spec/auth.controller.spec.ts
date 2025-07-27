import { CreateUserDto } from "../../user/dto/create-user.dto";
import { AuthController } from "../auth.controller";
import { AuthService } from "../auth.service";

describe('AuthController', () => {

	const authService = {
		register: jest.fn(),
		login: jest.fn()
	};

	let authController: AuthController;

	beforeEach(() => {

		authController = new AuthController(authService as unknown as AuthService);
	});

	it('should be defined', () => {
		expect(authController).toBeDefined();
	});

	describe('register', () => {

		it('should call authService.register with CreateUserDto', async () => {
			const createUserDto = {
				nome: 'Test User',
				email: 'test@example.com',
				senha: 'password'
			};

			await authController.register(createUserDto as CreateUserDto);

			expect(authService.register).toHaveBeenCalledWith(createUserDto);
		});
	});

	describe('login', () => {

		it('should call authService.login with user from request', async () => {
			const req = { user: { email: 'test@example.com', senha: 'password' } };

			await authController.login(req, req.user);

			expect(authService.login).toHaveBeenCalledWith(req.user);
		});
	});
});