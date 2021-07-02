'use strict';

const execa = require('execa');
const { unilog } = require('@gloxy/unilog');

module.exports = {
    toggle,
    get
};

////////////////////////////////////////////////////////////////

const REGISTRIES = {
    npm: {
        official: 'https://registry.npmjs.org/',
        gs: 'http://npm.gs.me/'
    }
}

const CMD = {
    npm: {
        get: ['npm', ['config', 'get', 'registry']],
        set: ['npm config set registry ']
    }
}

function _get(app) {
    try {
        const { stdout } = execa.sync(...CMD[app].get);
        return _isTruth(stdout) ? stdout : '';
    } catch (error) {
        throw (app, '_get registry failed:', error);
    }
}

function _set(app, registry) {
    try {
        execa.commandSync(CMD[app].set + registry);
    } catch (error) {
        throw (app, '_set registry failed:', error);
    }
}

function _isTruth(val) {
    try {
        return (!!val && val.toLowerCase() !== 'null' && val.toLowerCase() !== 'undefined')
    } catch (error) {
        throw (app, '_isTruth check failed:', error);
    }
}

function get(app) {
    const val = _get(app);
    unilog.succeed(app, val || 'has no registry set.');
    return val;
}

// toggle two registries
function toggle(app) {
    const currentRegistry = _get(app);

    const registries = REGISTRIES[app];
    let newRegistry = '';
    for (const key in registries) {
        const val = registries[key];
        if (currentRegistry !== val) {
            newRegistry = val;
            break;
        }
    }
    _set(app, newRegistry);

    unilog.succeed(app, 'registry was toggled from', currentRegistry, 'to', newRegistry);
}
