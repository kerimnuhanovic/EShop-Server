import { StoreImageRepository } from '@src/domain/repository/StoreImageRepository';
import { StorageEngine } from 'multer';
import multer from 'multer';
import { Request } from 'express';
import { injectable } from 'inversify';

@injectable()
export class StoreImageRepositoryImpl implements StoreImageRepository {
  storage: StorageEngine = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb) => {
      cb(null, 'src/images');
    },
    filename: (req: Request, file: Express.Multer.File, cb) => {
      cb(null, file.originalname);
    },
  });
}
