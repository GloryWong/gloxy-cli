import _ from 'lodash';
import { readFileSync } from 'fs';
import path from 'path';

function isNumeric(val: string | number): boolean {
  return typeof val === 'number' ? _.isNumber(val) : /^\d+$/.test(val);
}

function readPackageJson(name?: string): any {
  try {
    const packageJsonPath = path.resolve(__dirname, '../../package.json');
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
    return name ? packageJson[name] : packageJson;
  } catch (error) {
    throw `readPackageJson failed: ${error}`;
  }
}

export {
  isNumeric,
  readPackageJson
};