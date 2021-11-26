'use strict';

Vue.component('carousel', {
    template: '#carousel',
    props: {
        items: Array
    },
    computed: {
        empty () {
            return !this.items.length;
        }
    },
    watch: {
        items: function () {
            bootstrap.Carousel.getInstance(this.$el)?.to(0);
        }
    }
});