import { AnimalsService } from "../animals.service";
import { CreateAnimalDto } from "../dto/create-animal.dto";
import { UpdateAnimalDto } from "../dto/update-animal.dto";

describe('AnimalsService', () => {
	const queryBuilderMock = {
		andWhere: jest.fn().mockReturnThis(),
		skip: jest.fn().mockReturnThis(),
		take: jest.fn().mockReturnThis(),
		orderBy: jest.fn().mockReturnThis(),
		getManyAndCount: jest.fn().mockResolvedValue([[], 0])
	};
	const animalRepositoryMock = {
		create: jest.fn(),
		save: jest.fn(),
		findOne: jest.fn(),
		createQueryBuilder: jest.fn(),
		remove: jest.fn()
	};
	const cloudinaryServiceMock = {
		uploadFile: jest.fn(),
		deleteFile: jest.fn()
	};

	let animalsService: AnimalsService;

	beforeEach(() => {
		animalsService = new AnimalsService(
			animalRepositoryMock as any,
			cloudinaryServiceMock as any
		);

		jest.clearAllMocks();

		animalRepositoryMock.createQueryBuilder.mockReturnValue(queryBuilderMock);
	});

	it('should be defined', () => {
		expect(animalsService).toBeDefined();
	});

	describe('create', () => {

		it('should create and save an animal', async () => {
			const createAnimalDto: CreateAnimalDto = {
				descricao: 'Animal description',
				dono: 'Owner Name',
				endereco: '123 Street',
				contato: '1234567890',
				referencia: 'Near the park',
				status: 'available'
			};
			const userId = 'user123';

			const animal = { id: 'animal123', ...createAnimalDto, user_id: userId };
			animalRepositoryMock.create.mockImplementation((obj) => ({ ...obj, id: 'animal123', user_id: userId }));
			animalRepositoryMock.save.mockImplementation((obj) => ({ ...obj, id: 'animal123', user_id: userId }));

			const result = await animalsService.create(createAnimalDto, userId);

			expect(result).toEqual(animal);
			expect(animalRepositoryMock.create).toHaveBeenCalledWith({
				...createAnimalDto,
				user_id: userId
			});
			expect(animalRepositoryMock.save).toHaveBeenCalledWith(animal);
		});
	});

	describe('uploadImage', () => {

		it('should upload an image and update the animal', async () => {

			const id = 'animal123';
			const userId = 'user123';
			const file = { originalname: 'test.jpg' } as Express.Multer.File;
			const animal = { id, user_id: userId, imagem_url: 'old_image_url' };

			animalRepositoryMock.findOne.mockResolvedValue(animal);
			cloudinaryServiceMock.uploadFile.mockResolvedValue('new_image_url');
			cloudinaryServiceMock.deleteFile.mockResolvedValue(undefined);
			animalRepositoryMock.save.mockResolvedValue({ ...animal, imagem_url: 'new_image_url' });

			const result = await animalsService.uploadImage(id, userId, file);

			expect(result).toEqual({ ...animal, imagem_url: 'new_image_url' });
			expect(animalRepositoryMock.findOne).toHaveBeenCalledWith({
				where: { id }
			});
			expect(cloudinaryServiceMock.uploadFile).toHaveBeenCalledWith(file);
			expect(cloudinaryServiceMock.deleteFile).toHaveBeenCalledWith('old_image_url');
			expect(animalRepositoryMock.save).toHaveBeenCalledWith({ ...animal, imagem_url: 'new_image_url' });
		});

		it('should throw ForbiddenException if user does not own the animal', async () => {
			const id = 'animal123';
			const userId = 'user123';
			const file = { originalname: 'test.jpg' } as Express.Multer.File;
			const animal = { id, user_id: 'other_user', imagem_url: 'old_image_url' };

			animalRepositoryMock.findOne.mockResolvedValue(animal);

			await expect(animalsService.uploadImage(id, userId, file)).rejects.toThrow('Não autorizado');
			expect(animalRepositoryMock.findOne).toHaveBeenCalledWith({
				where: { id }
			});
			expect(cloudinaryServiceMock.uploadFile).not.toHaveBeenCalled();
			expect(cloudinaryServiceMock.deleteFile).not.toHaveBeenCalled();
			expect(animalRepositoryMock.save).not.toHaveBeenCalled();
		});
	});

	describe('findAll', () => {

		it.each([
			[1, 10],
			[undefined, undefined]
		])('should return all animals with pagination', async (page, limit) => {
			const query = { status: 'available', user_id: 'user123', page, limit };
			const animals = [{ id: 'animal123' }, { id: 'animal456' }];
			const total = 2;

			queryBuilderMock.getManyAndCount.mockResolvedValue([animals, total]);

			const result = await animalsService.findAll(query);

			expect(result).toEqual({
				animals,
				pagination: {
					current: 1,
					pages: 1,
					total
				}
			});
			expect(queryBuilderMock.andWhere).toHaveBeenCalledWith('animals.status = :status', { status: 'available' });
			expect(queryBuilderMock.andWhere).toHaveBeenCalledWith('animals.user_id = :user_id', { user_id: 'user123' });
			expect(queryBuilderMock.skip).toHaveBeenCalledWith(0);
			expect(queryBuilderMock.take).toHaveBeenCalledWith(10);
			expect(queryBuilderMock.orderBy).toHaveBeenCalledWith('animals.criadoEm', 'DESC');
		});
	});

	describe('findOne', () => {

		it('should return an animal by id', async () => {
			const id = 'animal123';
			const animal = { id, descricao: 'Animal description' };

			animalRepositoryMock.findOne.mockResolvedValue(animal);

			const result = await animalsService.findOne(id);

			expect(result).toEqual(animal);
			expect(animalRepositoryMock.findOne).toHaveBeenCalledWith({
				where: { id }
			});
		});

		it('should throw an error if animal not found', async () => {
			const id = 'animal123';

			animalRepositoryMock.findOne.mockResolvedValue(null);

			await expect(animalsService.findOne(id)).rejects.toThrow('Animal não encontrado');
			expect(animalRepositoryMock.findOne).toHaveBeenCalledWith({
				where: { id }
			});
		});
	});

	describe('update', () => {

		it('should update an animal if user owns it', async () => {
			const id = 'animal123';
			const userId = 'user123';
			const updateAnimalDto = { descricao: 'Updated description' };
			const animal = { id, user_id: userId, descricao: 'Old description' };

			animalRepositoryMock.findOne.mockResolvedValue(animal);
			animalRepositoryMock.save.mockResolvedValue({ ...animal, ...updateAnimalDto });

			const result = await animalsService.update(id, updateAnimalDto as UpdateAnimalDto, userId);

			expect(result).toEqual({ ...animal, ...updateAnimalDto });
			expect(animalRepositoryMock.findOne).toHaveBeenCalledWith({
				where: { id }
			});
			expect(animalRepositoryMock.save).toHaveBeenCalledWith({ ...animal, ...updateAnimalDto });
		});

		it('should throw ForbiddenException if user does not own the animal', async () => {
			const id = 'animal123';
			const userId = 'user123';
			const updateAnimalDto = { descricao: 'Updated description' };
			const animal = { id, user_id: 'other_user', descricao: 'Old description' };

			animalRepositoryMock.findOne.mockResolvedValue(animal);

			await expect(animalsService.update(id, updateAnimalDto as UpdateAnimalDto, userId)).rejects.toThrow('Não autorizado');
			expect(animalRepositoryMock.findOne).toHaveBeenCalledWith({
				where: { id }
			});
			expect(animalRepositoryMock.save).not.toHaveBeenCalled();
		});
	});

	describe('remove', () => {

		it('should remove an animal if user owns it', async () => {
			const id = 'animal123';
			const userId = 'user123';
			const animal = { id, user_id: userId };

			animalRepositoryMock.findOne.mockResolvedValue(animal);
			animalRepositoryMock.remove.mockResolvedValue(undefined);

			await animalsService.remove(id, userId);

			expect(animalRepositoryMock.findOne).toHaveBeenCalledWith({
				where: { id }
			});
			expect(animalRepositoryMock.remove).toHaveBeenCalledWith(animal);
		});

		it('should throw ForbiddenException if user does not own the animal', async () => {
			const id = 'animal123';
			const userId = 'user123';
			const animal = { id, user_id: 'other_user' };

			animalRepositoryMock.findOne.mockResolvedValue(animal);

			await expect(animalsService.remove(id, userId)).rejects.toThrow('Não autorizado');
			expect(animalRepositoryMock.findOne).toHaveBeenCalledWith({
				where: { id }
			});
			expect(animalRepositoryMock.remove).not.toHaveBeenCalled();
		});
	});
});