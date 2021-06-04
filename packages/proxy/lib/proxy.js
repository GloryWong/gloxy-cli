'use strict';

const execa = require('execa');
const log = require('@glorywong/log');

module.exports = {
    toggle,
    get,
    set,
    remove
};

//

const PROXY_SERVICE = {
    default: 'http://localhost:51837'
}

const CMD = {
    git: {
        get: ['git', ['config', '--global', '--get', 'http.proxy']],
        set: ['git', ['config', '--global', '--add', 'http.proxy', PROXY_SERVICE.default]],
        remove: ['git', ['config', '--global', '--unset', 'http.proxy']],
    }
}

function _get(app) {
    try {
        if (!_exist(app)) {
            return '';
        }

        const { stdout } = execa.sync(...CMD[app].get);
        return stdout;
    } catch (error) {
        throw (app, '_get proxy failed:', error);
    }
}

function _exist(app) {
    try {
        execa.sync(...CMD[app].get);
        return true;
    } catch (error) {
        if (error.exitCode === 1) {
            return false;
        } else {
            throw (app, '_exist checkingfailed:', error);
        }
    }
}

function _set(app) {
    try {
        if (_exist(app)) {
            _remove(app);
        }

        execa.sync(...CMD[app].set);
    } catch (error) {
        throw (app, '_set proxy failed:', error);
    }
}

function _remove(app) {
    try {
        if (_exist(app)) {
            execa.sync(...CMD[app].remove);
        }
    } catch (error) {
        throw (app, '_remove proxy failed:', error);
    }
}

function get(app) {
    const val = _get(app);
    log.success(app, val || 'has no proxy set.');
    return val;
}

function set(app) {
    _set(app);
    log.success(`set ${app} proxy successfully`);
}

function remove(app) {
    remove(app);
    log.success(`remove ${app} proxy successfully`);
}

function toggle(app) {
    if (_exist(app)) {
        _remove(app);
        log.success(`${app} proxy off`);
    } else {
        log.success(`${app} proxy on`);
        _set(app);
    }
}
