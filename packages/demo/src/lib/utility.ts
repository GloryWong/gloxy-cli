import _ from 'lodash';
import fs from 'fs';
import path from 'path';

function isNumeric(val: string | number): boolean {
  return typeof val === 'number' ? _.isNumber(val) : /^\d+$/.test(val);
}

function readPackageJson(keys?: string | string[]): any {
  try {
    const packageJsonPath = path.resolve(__dirname, '../../package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    if (!keys) {
      return packageJson;
    }

    if (typeof keys === 'string') {
      return packageJson[keys];
    }

    if (Array.isArray(keys)) {
      const obj: { [key: string]: any } = {};
      keys.forEach(key => {
        obj[key] = packageJson[key];
      });
      return obj;
    }
    
    return void 0;
  } catch (error) {
    throw `readPackageJson failed: ${error}`;
  }
}

export {
  isNumeric,
  readPackageJson
};