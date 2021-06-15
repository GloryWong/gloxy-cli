import fs from 'fs';
import path from 'path';
import copy from 'recursive-copy';

async function archive(source: string, destName: string, subpath: string = '') {
  try {
    // move GS Demo to archive
    const archivedPath = path.join(process.env.HOME || '', '.gsdemo-archive', subpath, destName);
    await copy(source, archivedPath);
    fs.rmdirSync(source, {
      recursive: true
    });
  } catch (error) {
    throw `archive failed: ${error}`;
  }
}

export {
  archive
};