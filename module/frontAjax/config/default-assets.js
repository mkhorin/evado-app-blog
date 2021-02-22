/**
 * @copyright Copyright (c) 2021 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

module.exports = {

    build: [{
        Class: 'FileMerger',
        sources: [
            'blog/Blog.js',
            'blog/Element.js',
            'blog/Loadable.js',
            'blog'
        ],
        target: 'dist/blog.min.js'
    }],

    deploy: {
        'vendor': 'dist/blog.min.js'
    }
};