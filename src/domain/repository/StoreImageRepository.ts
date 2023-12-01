import multer from 'multer';

export interface StoreImageRepository {
  storage: multer.StorageEngine;
}
