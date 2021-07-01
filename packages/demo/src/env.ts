import dotenv from 'dotenv';
import path from 'path';

const envPath = path.resolve(__dirname, '..', process.env.NODE_ENV === 'test' ? '.env.test' : '.env');
dotenv.config({ path: envPath });
