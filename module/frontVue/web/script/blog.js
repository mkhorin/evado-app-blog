'use strict';

const blog = new Vue({
    el: '#blog',
    props: {
        'csrf': String,
        'listUrl': String,
        'createUrl': String,
        'readUrl': String,
        'thumbnailUrl': String
    },
    propsData: {
        ...document.querySelector('#blog').dataset
    },
    data () {
        return {
            activePage: 'articles'
        };
    },
    created () {
        this.$on('articles', this.onArticles);
        this.$on('article', this.onArticle);
        this.$on('update-articles', this.onUpdateArticle);
    },
    methods: {
        onArticles () {
            this.activePage = 'articles';
        },
        onArticle () {
            this.activePage = 'article';
        },
        onUpdateArticle () {
            this.$emit('articles');
        },
        getThumbnailUrl (id, size = 'sm') {
            return `${this.thumbnailUrl}&s=${size}&id=${id}`;
        },
        formatDate (data) {
            return (new Date(data)).toLocaleDateString();
        },
        formatDatetime (data) {
            return (new Date(data)).toLocaleString();
        },
        async fetchJson () {
            const res = await this.fetch(...arguments);
            return res.json();
        },
        async fetch (url, data) {
            data = {
                csrf: this.csrf,
                ...data
            };
            const res = await fetch(url, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            });
            if (res.status === 200) {
                return res;
            }
            const text = await res.text() ;
            throw new Error(text || res.statusText);
        }
    }
});