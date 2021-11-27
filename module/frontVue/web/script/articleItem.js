'use strict';

Vue.component('articles-item', {
    props: {
        item: Object
    },
    methods: {
        onArticle () {
            this.$root.$emit('article', this.item.id);
        }
    },
    template: '#articles-item'
});