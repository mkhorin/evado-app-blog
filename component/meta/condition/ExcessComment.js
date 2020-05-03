/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('areto/base/Base');

module.exports = class ExcessComment extends Base {

    async resolve (model) {
        const query = model.class.find().and({
            article: model.get('article')
        });
        const counter = await query.count();
        return counter > this.counter;
    }
};