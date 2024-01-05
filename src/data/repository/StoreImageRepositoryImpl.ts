import { StoreImageRepository } from '@src/domain/repository/StoreImageRepository';
import { StorageEngine } from 'multer';
import multer from 'multer';
import { Request } from 'express';
import { injectable } from 'inversify';
import { generateUUID } from 'src/data/util/hashGeneratorUtil';
import fs from 'fs';

@injectable()
export class StoreImageRepositoryImpl implements StoreImageRepository {
  // fileName used for single image upload
  fileName: string | null = null;
  singleStorage: StorageEngine = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb) => {
      cb(null, 'src/images');
    },
    filename: (req: Request, file: Express.Multer.File, cb) => {
      this.fileName = generateUUID(file.originalname);
      cb(null, this.fileName);
    },
  });
  multiStorage: StorageEngine = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb) => {
      cb(null, 'src/images');
    },
    filename: (req: Request, file: Express.Multer.File, cb) => {
      cb(null, file.originalname)
    }
  })
  deleteImages(paths: string[]): void {
    paths.forEach((path) => {
      fs.unlinkSync('src/images/' + path)
    })
  }
}
