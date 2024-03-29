'use strict';

const parent = require('evado/config/default-utilities');

module.exports = {

    ...parent,

    'test': {
        Class: 'component/meta/utility/TestUtility',
        name: 'Test utility',
        hint: 'Test utility hint',
        enabled: true,
        actions: ['update'],
        clientClass: 'Test',
        targetClass: 'article'
    }
};