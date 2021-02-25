/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

module.exports = {

    title: 'Front pages',

    components: {
        'cache': {
            Class: require('areto/cache/MemoryCache')
        },
        'router': {
            defaultController: 'article'
        },
    },
    widgets: {
        'categories': {
            Class: require('../component/widget/Categories'),
            caching: false,
            cacheDuration: 60, // seconds
            disabled: false
        },
        'recentComments': {
            Class: require('../component/widget/RecentComments'),
            caching: false,
            cacheDuration: 60,
            disabled: false
        }
    },
    params: {
        // defaultUrl: 'office/model?n=[item].[section]'
    }
};