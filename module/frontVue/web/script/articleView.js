'use strict';

Vue.component('article-view', {
    props: {
        article: String
    },
    data () {
        return {
            id: null,
            categories: [],
            commentCounter: 0,
            comments: [],
            content: '',
            date: null,
            photos: [],
            subtitle: '',
            title: ''
        };
    },
    async created () {
        this.$on('load', this.onLoad);
        await this.reload();
    },
    methods: {
        async reload () {
            await this.load(this.article);
        },
        async load (id) {
            const data = await this.fetchJson('read', {
                class: 'article',
                view: 'publicView',
                id
            });
            this.$emit('load', data);
        },
        onLoad (data) {
            this.id = data._id;
            this.content = data.content;
            this.date = Jam.FormatHelper.asDate(data.date);
            this.title = data.title;
            this.subtitle = data.subtitle;
            this.categories = data.categories;
            this.photos = this.formatPhotos(data.photos);
            this.comments = this.formatComments(data.comments);
        },
        formatPhotos (items) {
            return items.map((item, index) => ({
                description: item.description,
                url: this.getThumbnailUrl(item._id, 'lg'),
                active: !index
            }));
        },
        formatComments (items) {
            return items.map(item => ({
                user: item.user,
                date: Jam.FormatHelper.asDatetime(item._createdAt),
                content: item.content
            }));
        }
    },
    template: '#article-view'
});