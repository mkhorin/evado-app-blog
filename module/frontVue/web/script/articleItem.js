'use strict';

Vue.component('articles-item', {
    template: '#articles-item',
    props: {
        'item': Object
    },
    methods: {
        onArticle (event) {
            this.$root.$emit('article', this.item.id);
        }
    }
});