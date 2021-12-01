'use strict';

Vue.component('articles', {
    props: {
        category: String,
        search: String,
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
        empty () {
            return !this.items.length;
        }
    },
    watch: {
        category () {
            this.reload();
        },
        search () {
            this.reload();
        }
    },
    async created () {
        this.$on('load', this.onLoad);
        await this.reload();
    },
    methods: {
        onLoad ({items}) {
            this.items = this.formatItems(items);
        },
        async reload () {
            await this.load(0);
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
            const category = this.$root.activeCategory;
            if (category) {
                return [{
                    attr: 'categories',
                    op: 'equal',
                    value: category
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