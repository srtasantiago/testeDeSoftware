import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class S3Service {
	private s3Client: S3Client;
	private bucketName: string;

	constructor() {

		console.log({
			accessKeyId: process.env.AWS_ACCESS_KEY_ID,
			secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
			region: process.env.AWS_REGION,
			bucketName: process.env.AWS_S3_BUCKET_NAME,
		})
		if (!process.env.AWS_ACCESS_KEY_ID
			|| !process.env.AWS_SECRET_ACCESS_KEY
			|| !process.env.AWS_REGION
			|| !process.env.AWS_S3_BUCKET_NAME) {
			throw new Error('Missing AWS S3 configuration in environment variables');
		}

		const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
		const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
		const region = process.env.AWS_REGION;

		this.s3Client = new S3Client({
			region,
			credentials: {
				accessKeyId,
				secretAccessKey,
			},
		});

		this.bucketName = process.env.AWS_S3_BUCKET_NAME;
	}

	async uploadFile(file: Express.Multer.File, folder: string = 'animals'): Promise<string> {
		const fileExtension = file.originalname.split('.').pop();
		const fileName = `${folder}/${uuidv4()}.${fileExtension}`;

		const command = new PutObjectCommand({
			Bucket: this.bucketName,
			Key: fileName,
			Body: file.buffer,
			ContentType: file.mimetype,
		});

		await this.s3Client.send(command);

		return `https://${this.bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
	}

	async deleteFile(fileUrl: string): Promise<void> {
		const fileName = fileUrl.split('/').slice(-2).join('/');

		const command = new DeleteObjectCommand({
			Bucket: this.bucketName,
			Key: fileName,
		});

		await this.s3Client.send(command);
	}
}