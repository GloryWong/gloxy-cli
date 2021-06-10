import conf from '../lib/conf';
import copy from 'recursive-copy';
import fs from 'fs';
import path from 'path';
import { DateTime } from 'luxon';
import log from '@glorywong/log';

function archive(): boolean {
  try {
    const root = String(conf.get('root'));
    const { name } = path.parse(root);

    // move GS Demo to archive
    const archivedPath = path.join(process.env.HOME || '', '.gsdemo-archive', `${name}.${DateTime.now()}`);
    copy(root, archivedPath);
    fs.rmdirSync(root, {
      recursive: true
    });
    
    // delete 'root' in conf
    conf.delete('root');

    log.success(`Successfully archive GS Demo '${name}' to '${archivedPath}'`);
    return true;
  } catch (error) {
    log.error('Faied to archive:', error);
    return false;
  }
}

export {
  archive
};