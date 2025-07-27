import { JwtStrategy } from "../jwt.strategy";

describe('JwtStrategy', () => {
	const mockConfigService = {
		get: jest.fn().mockReturnValue('secret_key'),
	} as any;

	let jwtStrategy: JwtStrategy;

	beforeEach(() => {
		jwtStrategy = new JwtStrategy(mockConfigService);
	});

	it('should be defined', () => {
		expect(jwtStrategy).toBeDefined();
	});

	it('should be defined without config service', () => {
		jwtStrategy = new JwtStrategy({
			get: jest.fn().mockReturnValue(null),
		} as any);

		expect(jwtStrategy).toBeDefined();
	});

	describe('validate', () => {
		it('should return userId and email from payload', async () => {
			const payload = { sub: '1', email: 'test@example.com' };
			const result = await jwtStrategy.validate(payload);
			expect(result).toEqual({ userId: '1', email: 'test@example.com' });
		});
	});
});