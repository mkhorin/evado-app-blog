'use strict';

const parent = require('evado/config/default-security');

module.exports = {

    metaPermissions: [{
        description: 'Full access to data',
        roles: [
            'administrator',
            'editor'
        ],
        type: 'allow',
        actions: 'all',
        targets: {
            type: 'all'
        }
    }, {
        roles: 'writer',
        type: "deny",
        actions: 'read',
        targets: {
            type: 'node',
            section: 'main',
            node: ['categories', 'comments']
        }
    }, {
        description: 'Restrict access to non-own objects',
        roles: 'writer',
        type: 'allow',
        actions: 'all',
        targets: {
            type: 'class',
            class: ['article', 'photo']
        },
        rule: 'creator'
    }, {
        roles: 'writer',
        type: 'allow',
        actions: 'read',
        targets: {
            type: 'class',
            class: ['category', 'comment']
        }
    }, {
        description: 'Access guest users to read public data',
        roles: 'guest',
        type: 'allow',
        actions: 'read',
        targets: [{
            type: 'class',
            class: ['category', 'photo']
        }, {
            type: 'view',
            class: 'article',
            view: ['publicList', 'publicView']
        }, {
            type: 'view',
            class: 'comment',
            view: 'publicList'
        }]
    }, {
        description: 'Access guest users to comment articles',
        roles: 'guest',
        type: 'allow',
        actions: 'create',
        targets: {
            type: 'view',
            class: 'comment',
            view: 'publicCreate'
        }
    }],

    permissions: {
        ...parent.permissions,

        'moduleAdmin': {
            label: 'Admin module',
            description: 'Access to Admin module'
        },
        'moduleOffice': {
            label: 'Office module',
            description: 'Access to Office module'
        },
        'moduleStudio': {
            label: 'Studio module',
            description: 'Access to Studio module'
        },
        'moduleApiBaseUpload': {
            label: 'Upload files'
        },
        'utilityTest': {
            label: 'Test utility'
        }
    },

    roles: {
        'administrator': {
            label: 'Administrator',
            description: 'Full access to all',
            children: [
                'moduleAdmin',
                'moduleOffice',
                'moduleStudio',
                'moduleApiBaseUpload',
                'utilityTest'
            ]
        },
        'editor': {
            label: 'Editor',
            description: 'Full office data management',
            children: [
                'guest',
                'moduleOffice',
                'moduleApiBaseUpload',
                'utilityTest'
            ]
        },
        'writer': {
            label: 'Writer',
            description: 'Create and manage your own articles',
            children: [
                'guest',
                'moduleOffice',
                'moduleApiBaseUpload'
            ]
        },
        'guest': {
            label: 'Guest',
            description: 'Auto-assigned role for unauthenticated users'
        }
    },

    rules: {
        'creator': {
            label: 'Creator',
            description: 'Check user is object creator',
            config: {
                Class: 'evado/component/meta/rbac/rule/UserRule',
                userAttr: '_creator'
            }
        }
    },

    assignments: {
        'Adam': 'administrator',
        'Edward': 'editor',
        'Walter': 'writer'
    }
};