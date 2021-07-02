'use strict';

const execa = require('execa');
const { unilog } = require('@gloxy/unilog');
// const ConfigStore = require('configstore');
// const fs = require('fs');

module.exports = {
    toggle,
    get,
    set,
    remove
};

////////////////////////////////////////////////////////////////

const PROXY_SERVICE = {
    default: 'http://localhost:51837'
}

const CMD = {
    git: {
        get: ['git', ['config', '--global', '--get', 'http.proxy']],
        set: ['git', ['config', '--global', '--add', 'http.proxy', PROXY_SERVICE.default]],
        remove: ['git', ['config', '--global', '--unset', 'http.proxy']],
    },
    npm: {
        get: ['npm', ['config', 'get', 'proxy']],
        set: ['npm', ['config', 'set', 'proxy', PROXY_SERVICE.default]],
        remove: ['npm', ['config', 'delete', 'proxy']]
    }
}

// const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
// const configStore = new ConfigStore(packageJson.name);
// configStore.get('server');

function _get(app) {
    try {
        const { stdout } = execa.sync(...CMD[app].get);
        return _isTruth(stdout) ? stdout : '';
    } catch (error) {
        if (error.exitCode === 1) {
            return '';
        } else {
            throw (app, '_get proxy failed:', error);
        }
    }
}

function _set(app) {
    try {
        if (_get(app)) {
            _remove(app);
        }

        execa.sync(...CMD[app].set);
    } catch (error) {
        throw (app, '_set proxy failed:', error);
    }
}

function _remove(app) {
    try {
        if (_get(app)) {
            execa.sync(...CMD[app].remove);
        }
    } catch (error) {
        throw (app, '_remove proxy failed:', error);
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
    unilog.succeed(app, val || 'has no proxy set.');
    return val;
}

function set(app) {
    _set(app);
    unilog.succeed(`set ${app} proxy successfully`);
}

function remove(app) {
    remove(app);
    unilog.succeed(`remove ${app} proxy successfully`);
}

function toggle(app) {
    if (_get(app)) {
        _remove(app);
        unilog.succeed(`${app} proxy off`);
    } else {
        _set(app);
        unilog.succeed(`${app} proxy on`);
    }
}
