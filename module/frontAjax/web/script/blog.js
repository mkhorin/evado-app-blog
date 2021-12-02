'use strict';

Vue.mixin({
    data () {
        return {
            loading: false
        };
    },
    mounted () {
        this.translateElement();
    },
    updated () {
        this.translateElement();
    },
    methods: {
        getDataUrl (action) {
            return `${this.$root.dataUrl}/${action}`;
        },
        getThumbnailUrl (id, size = 'sm') {
            return `${this.$root.thumbnailUrl}&s=${size}&id=${id}`;
        },
        fetchJson () {
            return this.fetchByMethod('getJson', ...arguments);
        },
        fetchText (url, data) {
            return this.fetchByMethod('getText', ...arguments);
        },
        fetchByMethod (name, action, data) {
            try {
                const csrf = this.$root.csrf;
                this.loading = true;
                return (new Jam.Fetch)[name](this.getDataUrl(action), {csrf, ...data});
            } finally {
                this.loading = false;
            }
        },
        toArticles () {
            this.$root.$emit('articles');
        },
        toArticle () {
            this.$root.$emit('article', ...arguments);
        },
        toCategory () {
            this.$root.$emit('category', ...arguments);
        },
        searchArticles () {
            this.$root.$emit('search-articles', ...arguments);
        },
        translateElement () {
            Jam.i18n.translate($(this.$el));
        }
    }
});

const blog = new Vue({
    el: '#blog',
    props: {
        csrf: String,
        dataUrl: String,
        thumbnailUrl: String,
        userName: String,
        userEmail: String
    },
    propsData: {
        ...document.querySelector('#blog').dataset
    },
    data () {
        return {
            activeArticle: '',
            activeCategory: '',
            activePage: 'articles',
            activeSearch: ''
        };
    },
    computed: {
        activePageProps () {
            switch (this.activePage) {
                case 'articles': return {
                    category: this.activeCategory,
                    search: this.activeSearch
                };
                case 'article-view': return {
                    article: this.activeArticle,
                    key: this.activeArticle
                };
            }
        }
    },
    created () {
        this.$on('articles', this.onArticles);
        this.$on('article', this.onArticle);
        this.$on('category', this.onCategory);
        this.$on('search-articles', this.onSearchArticles);
    },
    methods: {
        onArticles () {
            this.activePage = 'articles';
        },
        onArticle (id) {
            this.activePage = 'article-view';
            this.activeArticle = id;
        },
        onCategory (id) {
            this.activeCategory = id;
            this.toArticles();
        },
        onSearchArticles (text) {
            this.activeSearch = text;
            this.toArticles();
        }
    }
});