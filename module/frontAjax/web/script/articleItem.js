'use strict';

Vue.component('articles-item', {
    props: {
        item: Object
    },
    methods: {
        onArticle () {
            this.toArticle(this.item.id);
        }
    },
    template: '#articles-item'
});