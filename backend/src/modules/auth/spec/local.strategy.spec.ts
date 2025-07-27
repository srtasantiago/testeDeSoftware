import { LocalStrategy } from "../local.strategy";

describe('LocalStrategy', () => {
	const mockAuthService = {
		validateUser: jest.fn(),
	} as any;

	let localStrategy: LocalStrategy;

	beforeEach(() => {
		localStrategy = new LocalStrategy(mockAuthService);
	});

	it('should be defined', () => {
		expect(localStrategy).toBeDefined();
	});

	describe('validate', () => {

		it('should return user if credentials are valid', async () => {
			const email = 'test@example.com';
			const password = 'password';

			mockAuthService.validateUser.mockResolvedValue({
				id: '1',
				email: 'test@example.com',
			});

			const result = await localStrategy.validate(email, password);

			expect(result).toEqual({ email: 'test@example.com', id: '1' });
		});

		it('should throw an error if credentials are invalid', async () => {

			const email = 'test@example.com';
			const password = 'wrongpassword';

			mockAuthService.validateUser.mockResolvedValue(null);

			await expect(localStrategy.validate(email, password)).rejects.toThrow('Credenciais inválidas');
		});
	});
});