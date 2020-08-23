'use strict';

module.exports = {

    title: 'Blog',

    components: {
        'db': {
            settings: {
                'database': process.env.MONGO_NAME || 'evado-blog',
            }
        },
        'cookie': {
            secret: 'blog.evado'
        },
        'session': {
            secret: 'blog.evado'
        },
        'i18n': {
            // language: 'ru'
        },
        'router': {
            // defaultModule: 'frontAjax'
        },
        'fileStorage': {
            thumbnail: {
                sizes: {
                    'large': {
                        composite: [{
                            input: 'asset/watermark/fileLarge.png',
                            gravity: 'center'
                        }]
                    }
                }
            }
        }
    },
    metaModels: {
        'base': {
            Class: require('evado-meta-base/base/BaseMeta')
        },
        'navigation': {
            Class: require('evado-meta-navigation/base/NavMeta')
        }
    },
    modules: {
        'api': {
            config: {
                modules: {
                    'base': {
                        Class: require('evado-api-base/Module')
                    },
                    'navigation': {
                        Class: require('evado-api-navigation/Module')
                    }
                }
            }
        },
        'studio': {
            Class: require('evado-module-studio/Module')
        },
        'office': {
            Class: require('../module/office/Module')
        },
        'account': {
            Class: require('evado-module-account/Module')
        },
        'admin': {
            Class: require('evado-module-admin/Module'),
            params: {
                separateNextCommonMenuItem: true
            }
        },
        'frontAjax': {
            Class: require('../module/front-ajax/Module')
        },
        'frontPages': {
            Class: require('../module/front-pages/Module')
        }
    },
    users: require('./default-users'),
    security: require('./default-security'),
    tasks: require('./default-tasks'),
    utilities: require('./default-utilities'),
    params: {        
        'enablePasswordReset': false,
        'enableSignUp': false,
        'enableSignUpVerification': false
    }
};