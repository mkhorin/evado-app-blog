'use strict';

Vue.component('article-categories', {
    props: {
        items: Array
    },
    methods: {
        onItem (event) {
            this.toCategory(event.currentTarget.dataset.id);
        }
    },
    template: '#article-categories'
});