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
        getThumbnailUrl (id, size = '') {
            return id ? `${this.$root.thumbnailUrl}&s=${size}&id=${id}` : null;
        },
        fetchJson () {
            return this.fetchByMethod('getJson', ...arguments);
        },
        fetchText () {
            return this.fetchByMethod('getText', ...arguments);
        },
        fetchByMethod (name, action, data) {
            try {
                this.loading = true;
                const csrf = this.$root.csrf;
                const url = this.getDataUrl(action);
                return (new Jam.Fetch)[name](url, {csrf, ...data});
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