import { CloudinaryService } from "../cloudinary.service";
import { v2 as cloudinary } from 'cloudinary';

jest.mock('cloudinary');
const mockedCloudinary = cloudinary as jest.Mocked<typeof cloudinary>;

describe('CloudinaryService', () => {
	let cloudinaryService: CloudinaryService;

	beforeEach(() => {
		cloudinaryService = new CloudinaryService();
	});

	it('should be defined', () => {
		expect(cloudinaryService).toBeDefined();
	});

	describe('uploadFile', () => {

		it('should upload a file and return the secure URL', async () => {
			const file = { buffer: Buffer.from('test'), originalname: 'test.jpg' } as Express.Multer.File;
			const secureUrl = 'https://res.cloudinary.com/test/image/upload/v123456789/test.jpg';

			(mockedCloudinary.uploader.upload_stream as jest.Mock).mockImplementation((options, callback) => {
				callback(null, { secure_url: secureUrl });
				return { end: jest.fn() };
			});

			const result = await cloudinaryService.uploadFile(file);
			expect(result).toBe(secureUrl);
			expect(mockedCloudinary.uploader.upload_stream).toHaveBeenCalled();
		});

		it('should throw an error if upload fails', async () => {
			const file = { buffer: Buffer.from('test'), originalname: 'test.jpg' } as Express.Multer.File;

			(mockedCloudinary.uploader.upload_stream as jest.Mock).mockImplementation((options, callback) => {
				callback(new Error('Upload failed'), null);
				return { end: jest.fn() };
			});

			await expect(cloudinaryService.uploadFile(file)).rejects.toThrow('Upload failed');
		});

		it('should throw an error if no secure URL is returned', async () => {
			const file = { buffer: Buffer.from('test'), originalname: 'test.jpg' } as Express.Multer.File;

			(mockedCloudinary.uploader.upload_stream as jest.Mock).mockImplementation((options, callback) => {
				callback(null, {});
				return { end: jest.fn() };
			});

			await expect(cloudinaryService.uploadFile(file)).rejects.toThrow('Upload failed: No result returned from Cloudinary.');
		});
	});

	describe('deleteFile', () => {

		it('should delete a file from Cloudinary', async () => {
			const fileUrl = 'https://res.cloudinary.com/test/image/upload/v123456789/test.jpg';
			const publicId = 'animals/test';

			(mockedCloudinary.uploader.destroy as jest.Mock).mockResolvedValue({ result: 'ok' });

			await cloudinaryService.deleteFile(fileUrl);
			expect(mockedCloudinary.uploader.destroy).toHaveBeenCalledWith(publicId);
		});

		it('should throw an error if deletion fails', async () => {
			const fileUrl = 'https://res.cloudinary.com/test/image/upload/v123456789/test.jpg';
			const publicId = 'animals/test';

			(mockedCloudinary.uploader.destroy as jest.Mock).mockRejectedValue(new Error('Deletion failed'));

			await expect(cloudinaryService.deleteFile(fileUrl)).rejects.toThrow('Deletion failed');
		});
	});
});
