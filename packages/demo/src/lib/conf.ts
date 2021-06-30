import Conf from 'conf';

const conf: any = new Conf({
  configName: process.env.CONFIG_NAME
});

export default conf;