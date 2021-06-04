'use strict';

const { Command } = require('commander');
const proxy = require('./proxy');
const log = require('@glorywong/log');

const program = new Command();
const VERSION = '0.0.1';
program
  .version(VERSION, '-v, --version', 'output the current version')
  .option('-t, --toggle <app>', 'toggle proxy of an app on or off')
  .option('-g, --get <app>', 'get proxy of an app')
  // .option('-s, --set <app> <proxy service>', 'set proxy of an app with')
  .action(({ toggle, get, set }) => {
    try {
      if (toggle) {
        proxy.toggle(toggle);
        return;
      }

      if (get) {
        proxy.get(get);
        return;
      }

      if (set) {
        proxy.set(set);
        return;
      }
    } catch (error) {
      log.error(error);
    }
  })
  .parse();
