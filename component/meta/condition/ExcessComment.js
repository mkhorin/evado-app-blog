/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('areto/base/Base');

module.exports = class ExcessComment extends Base {

    async resolve (model) {
        const article = model.get('article');
        const query = model.class.find({article});
        const counter = await query.count();
        return counter > this.counter;
    }
};