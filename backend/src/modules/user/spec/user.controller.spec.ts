import { UsersController } from "../user.controller";
import { UsersService } from "../user.service";

describe('UsersController', () => {

	const usersService = {
		findById: jest.fn(),
		update: jest.fn(),
		remove: jest.fn()
	};

	let usersController: UsersController;

	beforeEach(() => {
		usersController = new UsersController(usersService as unknown as UsersService);

		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(usersController).toBeDefined();
	});

	describe('getProfile', () => {

		it('should return user profile', async () => {
			const input = {
				user: {
					userId: '1'
				}
			}
			const mockUser = {
				id: '1',
				nome: 'Test User',
				email: 'testuser@example.com'
			};
			const expected = {
				success: true,
				data: { user: mockUser }
			}
			
			usersService.findById.mockResolvedValue(mockUser);

			const result = await usersController.getProfile(input);

			expect(result).toEqual(expected);
		});
	});

	describe('updateProfile', () => {

		it('should update user profile', async () => {

			const input = {
				user: {
					userId: '1'
				}
			}
			const updateUserDto = {
				nome: 'Test User',
				email: 'newemail@example.com',
				senha: 'newpassword123',
				cidade: 'New City',
				sexo: 'Masculino',
				endereco: '456 New St'
			};
			const expected = {
				success: true,
				message: 'Dados atualizados com sucesso',
				data: { user: { ...input.user, ...updateUserDto, senha: undefined } }
			};

			usersService.update.mockResolvedValue({ ...input.user, ...updateUserDto });

			const result = await usersController.updateProfile(input, updateUserDto);

			expect(result).toEqual(expected);
		});
	});

	describe('removeProfile', () => {

		it('should remove user profile', async () => {
			const input = {
				user: {
					userId: '1'
				}
			};
			const expected = {
				success: true,
				message: 'Conta removida com sucesso'
			};

			usersService.remove.mockResolvedValue(undefined);

			const result = await usersController.removeProfile(input);

			expect(result).toEqual(expected);
		});
	});
});