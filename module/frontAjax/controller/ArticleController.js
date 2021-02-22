/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('areto/base/Controller');

module.exports = class ArticleController extends Base {

    actionIndex () {
        return this.render('index');
    }
};
module.exports.init(module);