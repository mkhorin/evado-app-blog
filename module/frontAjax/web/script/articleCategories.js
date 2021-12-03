'use strict';

Vue.component('article-categories', {
    props: {
        items: Array
    },
    methods: {
        onItem (id) {
            this.toCategory(id);
        }
    },
    template: '#article-categories'
});