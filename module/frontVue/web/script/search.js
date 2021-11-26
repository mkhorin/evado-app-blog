'use strict';

Vue.component('search', {
    template: '#search',
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
    }
});