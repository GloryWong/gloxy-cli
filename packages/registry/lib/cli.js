'use strict';

const { Command } = require('commander');
const registry = require('./registry');
const log = require('@glorywong/log');

const program = new Command();
const VERSION = '0.0.1';
program
  .version(VERSION, '-v, --version', 'output the current version')
  .option('-t, --toggle <app>', 'toggle registry of an app')
  .option('-g, --get <app>', 'get registry of an app')
  .action(({ toggle, get, set }) => {
    try {
      if (toggle) {
        registry.toggle(toggle);
        return;
      }

      if (get) {
        registry.get(get);
        return;
      }
    } catch (error) {
      log.error(error);
    }
  })
  .parse();
