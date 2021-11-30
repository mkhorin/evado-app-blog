'use strict';

Vue.component('categories', {
    data () {
        return {
            items: [],
            selected: null
        };
    },
    computed: {
        empty () {
            return !this.items.length;
        }
    },
    async created () {
        this.$root.$on('select-category', this.onSelect);
        this.$on('load', this.onLoad);
        await this.load();
    },
    methods: {
        getActiveElement () {
            return this.$el.querySelector('.active');
        },
        onItem ({currentTarget}) {
            const id = this.getActiveElement() === currentTarget ? null : currentTarget.dataset.id;
            this.$root.$emit('select-category', id);
        },
        onLoad ({items}) {
            this.items = items;
        },
        onSelect (id) {
            const target = this.$el.querySelector(`[data-id="${id}"]`);
            if (this.getActiveElement() !== target) {
                this.unselect();
                target?.classList.add('active');
                this.selected = target?.dataset.id;
                this.$root.$emit('update-articles');
            }
        },
        async load () {
            const data = await this.fetchJson('list', {
                class: 'category'
            });
            this.$emit('load', data);
        },
        unselect () {
            this.getActiveElement()?.classList.remove('active');
        }
    },
    template: '#categories'
});