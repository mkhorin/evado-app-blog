/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('evado/component/utility/MetaUtility');

module.exports = class TestUtility extends Base {

    isActive () {
        if (!this.enabled || !this.isUpdateAction()) {
            return false;
        }
        const meta = this.parseBaseMeta();
        return meta.class && meta.class.name === this.targetClass;
    }

    async execute () {
        const meta = this.parseBaseMeta();
        const query = this.findModel(this.postParams.model, meta.view);
        const model = query ? await query.one() : null;
        const security = this.createMetaSecurity();
        this.controller.sendText('Test utility completed');
    }
};