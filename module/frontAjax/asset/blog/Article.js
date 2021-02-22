/**
 * @copyright Copyright (c) 2021 Maxim Khorin <maksimovichu@gmail.com>
 */
Blog.Article = class Article extends Blog.Element {

    init () {
        this.article = this.container.querySelector('.article');
        this.blog.on('article:show', this.onShow.bind(this));
        this.$container.on('submit', '.comment-form', this.onSubmitComment.bind(this));
        this.$container.on('click', '.to-articles', this.onArticles.bind(this));
        this.$container.on('click', '.category-item', this.onCategory.bind(this));
    }

    load () {
        this.blog.toggleLoader(true);
        this.blog.ajaxQueue.post(this.dataMap.url, this.getPostData())
            .done(this.onDone.bind(this))
            .fail(this.onFail.bind(this));
    }

    getPostData () {
        return {
            class: 'article',
            view: 'publicView',
            id: this.id
        };
    }

    onCategory (event) {
        event.preventDefault();
        this.blog.trigger('category:change', {id: event.target.dataset.id});
    }

    onArticles (event) {
        event.preventDefault();
        this.blog.trigger('articles:ready');
    }

    onShow (event, {id}) {
        this.id = id;
        this.load();
    }

    onDone (data) {
        data = data || {};
        blog.constructor.escapeData(data, ['title', 'subtitle']);
        data.date = data.date ? moment(data.date).format('L') : '';
        data.categories = Array.isArray(data.categories) ? data.categories : [];
        data.categories = data.categories.map(this.resolveCategoryTemplate, this).join('');

        data.photos = Array.isArray(data.photos) ? data.photos : [];
        const photos = data.photos.map(this.resolvePhotoTemplate, this).join('');
        data.carousel = photos ? this.resolveTemplate('carousel', {photos}) : '';

        data.comments = Array.isArray(data.comments) ? data.comments : [];
        data.commentCounter = data.comments.length;
        data.comments = data.comments.map(this.resolveCommentTemplate, this).join('');

        this.article.innerHTML = this.resolveTemplate('article', data);
        Jam.t(this.$container);
        this.completeLoad(data);
    }

    onFail (data) {
        const text = this.renderError(data);
        this.article.innerHTML = this.resolveTemplate('alert', {text});
        this.completeLoad({title: text});
    }

    completeLoad (data) {
        scrollTo(0, 0);
        this.blog.toggleLoader(false);
        this.blog.trigger('article:ready', data);
    }

    resolveCategoryTemplate (data) {
        if (!data || typeof data !== 'object') {
            return 'Invalid category data';
        }
        data._title = Jam.escape(data._title);
        return this.resolveTemplate('category', data);
    }

    resolvePhotoTemplate (data, index) {
        if (!data || typeof data !== 'object') {
            return 'Invalid photo data';
        }
        data.active = index ? '' : 'active';
        blog.constructor.escapeData(data);
        return this.resolveTemplate('photo', data);
    }

    resolveCommentTemplate (data) {
        if (!data || typeof data !== 'object') {
            return 'Invalid comment data';
        }
        blog.constructor.escapeData(data);
        data.date = data._createdAt ? moment(data._createdAt).format('L LTS') : '';
        data.user = data.name;
        return this.resolveTemplate('comment', data);
    }

    onSubmitComment (event) {
        event.preventDefault();
        const data = {
            name: this.getFormValue('name'),
            email: this.getFormValue('email'),
            content: this.getFormValue('content'),
            article: {links: [this.id]}
        };
        const params = {
            class: 'comment',
            view: 'publicCreate',
            data
        };
        this.clearFormErrors();
        this.blog.ajaxQueue.post(this.getForm().attr('action'), params)
            .done(this.onCommentDone.bind(this))
            .fail(this.onCommentFail.bind(this));
    }

    onCommentDone () {
        Blog.toggle(this.getForm(), false);
        Blog.toggle(this.getDoneAlert(), true);
    }

    onCommentFail ({responseText}) {
        try {
            const data = JSON.parse(responseText);
            for (const element of this.getForm().find('[name]')) {
                this.addFormError(data[element.name], element);
                delete data[element.name];
            }
            if (Object.values(data).length) {
                Blog.toggle(this.getFailAlert(), true).html(JSON.stringify(data));
            }
        } catch {
            Blog.toggle(this.getFailAlert(), true).html(responseText || 'Comment failed');
        }
    }

    getDoneAlert () {
        return this.$container.find('.done-comment');
    }

    getFailAlert () {
        return this.$container.find('.fail-comment');
    }

    getForm () {
        return this.$container.find('.comment-form');
    }

    getFormValue (name) {
        return this.getFormInput(name).val();
    }

    getFormAttr (name) {
        return this.getFormInput(name).closest('.form-group');
    }

    getFormInput (name) {
        return this.$container.find(`[name="${name}"]`);
    }

    addFormError (message, element) {
        if (typeof message === 'string') {
            const $attr = this.getFormAttr(element.name);
            $attr.addClass('has-error');
            $attr.find('.error-block').html(Jam.t(message));
        }
    }

    clearFormErrors () {
        this.getForm().find('.has-error').removeClass('has-error');
        Blog.toggle(this.$container.find('.alert'), false);
    }
};