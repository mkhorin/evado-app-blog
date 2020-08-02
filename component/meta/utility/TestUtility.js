/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('evado/component/utility/MetaUtility');

module.exports = class TestUtility extends Base {

    async execute () {
        const {model} = await this.resolveMetaParams();
        const security = this.createMetaSecurity();
        this.controller.sendText('Test utility completed');
    }
};