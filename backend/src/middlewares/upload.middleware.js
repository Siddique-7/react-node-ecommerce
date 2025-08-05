// multer.config.js
import multer from 'multer';

const storage = multer.memoryStorage(); //  safer for deployment
export const upload = multer({ storage });
