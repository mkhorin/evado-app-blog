'use strict';

Vue.component('categories', {
    props: {
        category: String
    },
    data () {
        return {
            items: []
        };
    },
    computed: {
        empty () {
            return !this.items.length;
        }
    },
    async created () {
        this.$on('load', this.onLoad);
        await this.load();
    },
    methods: {
        getActiveElement () {
            return this.$el.querySelector('.active');
        },
        onItem (id) {
            this.toCategory(this.category === id ? null : id);
        },
        onLoad ({items}) {
            this.items = items;
        },
        async load () {
            const data = await this.fetchJson('list', {
                class: 'category'
            });
            this.$emit('load', data);
        }
    },
    template: '#categories'
});