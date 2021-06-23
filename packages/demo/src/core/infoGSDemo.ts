import conf from '../lib/conf';
import { getDemoCount } from './demoIndex';

export {
  getInfo
};

function getInfo() {
  const configuration = conf.store;
  return {
    name: configuration.name,
    location: configuration.root,
    description: configuration.description,
    demoCount: getDemoCount()
  };
}