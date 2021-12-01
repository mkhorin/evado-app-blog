'use strict';

Vue.component('search', {
    props: {
        search: String
    },
    data () {
        return {
            text: ''
        };
    },
    methods: {
        onInput () {
            if (!this.text) {
                this.onSearch();
            }
        },
        onSearch () {
            this.searchArticles(this.text);
        }
    },
    template: '#search'
});