import { StoreImageRepository } from '@src/domain/repository/StoreImageRepository';
import { StorageEngine } from 'multer';
import multer from 'multer';
import { Request } from 'express';
import { injectable } from 'inversify';
import { generateUUID } from 'src/data/util/hashGeneratorUtil';
import fs from 'fs';

@injectable()
export class StoreImageRepositoryImpl implements StoreImageRepository {
  fileName: string | null = null;
  storage: StorageEngine = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb) => {
      cb(null, 'src/images');
    },
    filename: (req: Request, file: Express.Multer.File, cb) => {
      this.fileName = generateUUID(file.originalname);
      cb(null, this.fileName);
    },
  });
  deleteImage(path: string): void {
    fs.unlinkSync(path);
  }
}
