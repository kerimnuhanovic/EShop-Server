import multer from 'multer';

export interface StoreImageRepository {
  storage: multer.StorageEngine;
  fileName: string | null;
  deleteImage(path: string): void;
}
