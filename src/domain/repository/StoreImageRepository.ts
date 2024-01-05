import multer from 'multer';

export interface StoreImageRepository {
  singleStorage: multer.StorageEngine;
  multiStorage: multer.StorageEngine;
  fileName: string | null;
  files: string[];
  deleteImages(paths: string[]): void;
}
