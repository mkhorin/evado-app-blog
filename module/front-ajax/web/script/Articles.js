'use strict';

Blog.Articles = class Articles extends Blog.Element {

    init () {
        this.list = this.container.querySelector('.list');
        this.pagination = new Blog.Pagination({
            $container: this.$container,
            pageTemplate: this.getTemplate('page'),
            paginationTemplate: this.getTemplate('pagination')
        });
        this.$container.on('pagination:change', this.onChangePage.bind(this));
        this.$container.on('click', '.article-list-item', this.onArticle.bind(this));
        this.$container.on('click', '.tag-item', this.onCategoryTag.bind(this));

        this.blog.on('category:change', this.onChangeCategory.bind(this));
        this.blog.on('search:change', this.onSearch.bind(this));
        this.load();
    }

    load () {
        this.blog.toggleLoader(true);
        this.blog.ajaxQueue.abort(this.deferred);
        this.deferred = this.blog.ajaxQueue.post(this.dataMap.url, this.getPostData())
            .done(this.onDone.bind(this))
            .fail(this.onFail.bind(this));
    }

    getPostData () {
        return {
            class: 'article',
            view: 'publicList',
            start: this.pagination.getOffset(),
            length: this.pagination.getPageSize(),
            search: this.search,
            filter: this.getFilterData()
        };
    }

    getFilterData () {
        const data = [];
        if (this.category) {
            data.push({
                attr: 'categories',
                op: 'equal',
                value: this.category
            })
        }
        return data.length ? data : null;
    }

    onArticle (event) {
        event.preventDefault();
        const id =  $(event.target).closest('[data-id]').data('id');
        this.blog.trigger('article:show', {id});
    }

    onCategoryTag (event) {
        event.preventDefault();
        this.blog.trigger('category:change', {id: event.target.dataset.id});
    }

    onChangeCategory (event, {id}) {
        this.category = id;
        this.search = null;
        this.blog.trigger('search:clear');
        this.load();
    }

    onSearch (event, {search}) {
        this.search = search;
        this.load();
    }

    onChangePage (event, {page}) {
        this.load();
    }

    onDone (data) {
        let items = data && data.items;
        items = Array.isArray(items) ? items : [];
        items = items.map(this.prepareItem, this);
        this.pagination.setTotal(data && data.totalSize);
        this.list.innerHTML = this.renderItems(items) + this.pagination.render();
        Jam.i18n.translateContainer($(this.list));
        this.completeLoad();
    }

    onFail (data) {
        this.list.innerHTML = this.renderError(data);
        this.completeLoad();
    }

    completeLoad () {
        scrollTo(0, 0);
        this.blog.toggleLoader(false);
        this.blog.trigger('articles:ready');
    }

    prepareItem (data) {
        data.date = data.date ? moment(data.date).format('L') : '';
        return data;
    }

    renderItems (items) {
        if (items.length) {
            return items.map(this.resolveItemTemplate, this).join('');
        }
        return this.resolveTemplate('alert', {
            text: Jam.i18n.translate('No articles found')
        });
    }

    resolveItemTemplate (data) {
        let template = 'article';
        if (data.mainPhoto) {
            template = 'photoArticle';
            data.thumbnail = data.mainPhoto._id || data.mainPhoto;
            data.thumbnailText = data.mainPhoto.text;
        }
        if (Array.isArray(data.categories)) {
            data.categories = data.categories.map(this.resolveItemCategory, this).join('');
        }
        return this.resolveTemplate(template, data);
    }

    resolveItemCategory (data) {
        data._title = Jam.Helper.escapeTags(data._title);
        data.name = Jam.Helper.escapeTags(data.name) || data._title;
        return this.resolveTemplate('category', data);
    }
};