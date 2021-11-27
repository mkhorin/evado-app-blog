'use strict';

Vue.component('article-categories', {
    props: {
        items: Array
    },
    methods: {
        onItem (event) {
            this.$root.$emit('select-category', event.currentTarget.dataset.id);
        }
    },
    template: '#article-categories'
});