import conf from '../lib/conf';

export {
  getInfo
};

function getInfo() {
  const configuration = conf.store;
  return configuration;
}