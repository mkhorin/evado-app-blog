'use strict';

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