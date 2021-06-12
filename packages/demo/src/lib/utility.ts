import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import conf from './conf';
import copy from 'recursive-copy';

function isNumeric(val: string | number): boolean {
  return typeof val === 'number' ? _.isNumber(val) : /^\d+$/.test(val);
}

function readPackageJson(name?: string): any {
  try {
    const packageJsonPath = path.resolve(__dirname, '../../package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    return name ? packageJson[name] : packageJson;
  } catch (error) {
    throw `readPackageJson failed: ${error}`;
  }
}

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
  isNumeric,
  readPackageJson,
  archive
};