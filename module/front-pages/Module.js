'use strict';

const Base = require('evado/component/base/BaseModule');

module.exports = class FrontPagesModule extends Base {

    constructor (config) {
        super({
            ...config
        });
    }
};
module.exports.init(module);