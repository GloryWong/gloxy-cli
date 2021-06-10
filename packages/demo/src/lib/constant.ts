import path from 'path';
import conf from './conf';

const ROOT = String(conf.get('root'));
const STORAGE_DIR = path.join(ROOT, '.storage');
const LOG_DIR = path.join(ROOT, '.log');

export {
  ROOT,
  STORAGE_DIR,
  LOG_DIR
};