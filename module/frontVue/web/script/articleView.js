'use strict';

Vue.component('article-view', {
    props: {
        url: String
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
    computed: {
        active () {
            return this.$root.activePage === 'article';
        },
    },
    async created () {
        this.$root.$on('article', this.onArticle);
        this.$on('load', this.onLoad);
    },
    methods: {
        onArticles () {
            this.$root.$emit('articles');
        },
        onArticle (id) {
            this.load(id);
        },
        onLoad (data) {
            this.id = data._id;
            this.content = data.content;
            this.date = this.$root.formatDate(data.date);
            this.title = data.title;
            this.subtitle = data.subtitle;
            this.categories = data.categories;
            this.photos = this.formatPhotos(data.photos);
            this.comments = this.formatComments(data.comments);
        },
        async load (id) {
            const data = await this.$root.fetchJson(this.$root.readUrl, {
                class: 'article',
                view: 'publicView',
                id
            });
            this.$emit('load', data);
        },
        formatPhotos (items) {
            return items.map((item, index) => ({
                description: item.description,
                url: this.$root.getThumbnailUrl(item._id, 'lg'),
                active: !index
            }));
        },
        formatComments (items) {
            return items.map(item => ({
                user: item.user,
                date: this.$root.formatDatetime(item._createdAt),
                content: item.content
            }));
        }
    },
    template: '#article-view'
});