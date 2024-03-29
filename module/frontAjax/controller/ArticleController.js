/**
 * @copyright Copyright (c) 2021 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('evado/component/base/BaseController');

module.exports = class ArticleController extends Base {

    actionIndex () {
        return this.render('index');
    }
};
module.exports.init(module);