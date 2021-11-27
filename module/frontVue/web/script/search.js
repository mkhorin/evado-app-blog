'use strict';

Vue.component('search', {
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
            this.$root.$emit('update-articles');
        }
    },
    template: '#search'
});