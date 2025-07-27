import { AnimalsController } from "../animals.controller";
import { UpdateAnimalDto } from "../dto/update-animal.dto";

describe('AnimalsController', () => {

	const animalsService = {
		create: jest.fn(),
		findAll: jest.fn(),
		uploadImage: jest.fn(),
		findOne: jest.fn(),
		update: jest.fn(),
		remove: jest.fn(),
	};

	let animalsController: AnimalsController;

	beforeEach(() => {
		animalsController = new AnimalsController(animalsService as any);

		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(animalsController).toBeDefined();
	});

	describe('create', () => {

		it('should create an animal', async () => {
			const createAnimalDto = { descricao: 'Dog', dono: 'John', endereco: '123 Street', contato: '1234567890', referencia: 'Near park', status: 'available' };
			const req = { user: { userId: 'user123' } };
			const expectedResponse = { success: true, message: 'Animal cadastrado com sucesso', data: { animal: { id: 'animal123', ...createAnimalDto, user_id: req.user.userId } } };

			animalsService.create.mockResolvedValue(expectedResponse.data.animal);

			const result = await animalsController.create(createAnimalDto, req);

			expect(result).toEqual(expectedResponse);
			expect(animalsService.create).toHaveBeenCalledWith(createAnimalDto, req.user.userId);
		});
	});

	describe('findAll', () => {

		it('should return all animals', async () => {
			const query = { status: 'available', user_id: 'user123', page: 1, limit: 10 };
			const expectedResponse = { success: true, data: { animals: [], pagination: { current: 1, pages: 1, total: 0 } } };

			animalsService.findAll.mockResolvedValue(expectedResponse.data);

			const result = await animalsController.findAll(query);

			expect(result).toEqual(expectedResponse);
			expect(animalsService.findAll).toHaveBeenCalledWith(query);
		});
	});

	describe('uploadImage', () => {

		it('should upload an image for an animal', async () => {
			const id = 'animal123';
			const req = { user: { userId: 'user123' } };
			const file = { originalname: 'image.jpg', mimetype: 'image/jpeg' } as Express.Multer.File;
			const mockedAnimal = { id, imagem_url: 'http://example.com/image.jpg' };
			const expectedResponse = { 
				success: true,
				message: 'Imagem enviada com sucesso',
				data: {
					animal: mockedAnimal,
					imagem_url: 'http://example.com/image.jpg'
				}
			};

			animalsService.uploadImage.mockResolvedValue(mockedAnimal);

			const result = await animalsController.uploadImage(id, req, file);

			expect(result).toEqual(expectedResponse);
			expect(animalsService.uploadImage).toHaveBeenCalledWith(id, req.user.userId, file);
		});
	});
	describe('findOne', () => {

		it('should return an animal by id', async () => {
			const id = 'animal123';
			const expectedResponse = { success: true, data: { animal: { id, descricao: 'Dog' } } };

			animalsService.findOne.mockResolvedValue(expectedResponse.data.animal);

			const result = await animalsController.findOne(id);

			expect(result).toEqual(expectedResponse);
			expect(animalsService.findOne).toHaveBeenCalledWith(id);
		});
	});
	describe('update', () => {

		it('should update an animal', async () => {
			const id = 'animal123';
			const updateAnimalDto = { descricao: 'Updated Dog' };
			const req = { user: { userId: 'user123' } };
			const expectedResponse = { success: true, message: 'Animal atualizado com sucesso', data: { animal: { id, ...updateAnimalDto } } };

			animalsService.update.mockResolvedValue(expectedResponse.data.animal);

			const result = await animalsController.update(id, updateAnimalDto as UpdateAnimalDto, req);

			expect(result).toEqual(expectedResponse);
			expect(animalsService.update).toHaveBeenCalledWith(id, updateAnimalDto, req.user.userId);
		});
	});
	describe('remove', () => {

		it('should remove an animal', async () => {
			const id = 'animal123';
			const req = { user: { userId: 'user123' } };
			const expectedResponse = { success: true, message: 'Animal removido com sucesso' };

			animalsService.remove.mockResolvedValue(expectedResponse);

			const result = await animalsController.remove(id, req);

			expect(result).toEqual(expectedResponse);
			expect(animalsService.remove).toHaveBeenCalledWith(id, req.user.userId);
		});
	});
});