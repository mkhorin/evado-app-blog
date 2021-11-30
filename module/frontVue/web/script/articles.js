'use strict';

Vue.component('articles', {
    props: {
        activePage: String,
        pageSize: {
            type: Number,
            default: 5
        }
    },
    data () {
        return {
            alert: 'text',
            items: []
        };
    },
    computed: {
        active () {
            return this.activePage === 'articles';
        },
        empty () {
            return !this.items.length;
        }
    },
    async created () {
        this.$root.$on('update-articles', this.onUpdate);
        this.$on('load', this.onLoad);
        await this.load(0);
    },
    methods: {
        onLoad ({items}) {
            this.items = this.formatItems(items);
        },
        onUpdate () {
            this.load(0);
        },
        async load (page) {
            const pageSize = this.pageSize;
            const data = await this.fetchJson('list', {
                class: 'article',
                view: 'publicList',
                length: pageSize,
                start: pageSize * page,
                search: this.$root.$refs.search?.text,
                filter: this.getFilter()
            });
            this.$emit('load', {...data, pageSize, page});
        },
        getFilter () {
            const id = this.$root.$refs.categories?.selected;
            if (id) {
                return [{
                    attr: 'categories',
                    op: 'equal',
                    value: id
                }];
            }
        },
        formatItems (items) {
            return items.map(item => ({
                id: item._id,
                title: item._title,
                subtitle: item.subtitle,
                date: Jam.FormatHelper.asDate(item.date),
                categories: item.categories,
                thumbnail: item.mainPhoto ? this.formatThumbnail(item.mainPhoto) : null
            }));
        },
        formatThumbnail (data) {
            return {
                url: this.getThumbnailUrl(data._id, 'sm'),
                text: data.description
            };
        }
    },
    template: '#articles'
});