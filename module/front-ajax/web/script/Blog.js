'use strict';

class Blog {

    static getElementClass (name) {
        return Blog[name]?.prototype instanceof Blog.Element ? Blog[name] : null;
    }

    static toggle ($element, state) {
        return $element.toggleClass('hidden', !state);
    }

    static getTemplate (name, container) {
        return container.querySelector(`template[data-id="${name}"]`)?.innerHTML;
    }

    static resolveTemplate (text, data) {
        return text.replace(/{{(\w+)}}/gm, (match, key)=> data.hasOwnProperty(key) ? data[key] : '');
    }

    static setPageTitle (text) {
        const $title = $(document.head).find('title');
        const base = $title.data('title');
        $title.html(text ? `${Jam.t(text)} - ${base}` : base);
    }

    static escapeData (data, keys) {
        for (const key of keys || Object.keys(data)) {
            data[key] = this.escapeHtml(data[key]);
        }
    }

    static escapeHtml (value) {
        return typeof value === 'string' ? value.replace(/</g, '&lt;').replace(/>/g, '&gt;') : value;
    }

    constructor () {
        this.ajaxQueue = new Blog.AjaxQueue;
        this.$container = $('.blog');
        this.createHandlers();
        this.initHandlers();
        this.on('article:ready', this.onReadyArticle.bind(this));
        this.on('articles:ready', this.onReadyArticles.bind(this));
        this.constructor.setPageTitle();
    }

    createHandlers () {
        this._handlers = [];
        for (const element of document.querySelectorAll('[data-blog-handler]')) {
            const name = element.dataset.blogHandler;
            const Class = this.constructor.getElementClass(name);
            if (Class) {
                this._handlers.push(new Class(element, this));
            } else {
                console.error(`Handler not found: ${name}`);
            }
        }
    }

    initHandlers () {
        for (const handler of this._handlers) {
            if (handler.init) {
                handler.init();
            }
        }
    }

    toggleLoader (state) {
        $('.global-loader').toggle(state);
    }

    on () {
        this.$container.on(...arguments);
    }

    trigger () {
        this.$container.trigger(...arguments);
    }

    onReadyArticle (event, {title}) {
        this.$container.addClass('article-view');
        this.$container.removeClass('articles-view');
        this.constructor.setPageTitle(title);
    }

    onReadyArticles () {
        this.$container.removeClass('article-view');
        this.$container.addClass('articles-view');
        this.constructor.setPageTitle('Articles');
    }
}

Blog.Element = class Element {

    constructor (container, blog) {
        this.blog = blog;
        this.container = container;
        this.$container = $(container);
        this.dataMap = this.$container.data();
    }

    getTemplate (name) {
        return Blog.getTemplate(name, this.container);
    }

    resolveTemplate (name, data) {
        return Blog.resolveTemplate(this.getTemplate(name), data);
    }

    renderError (data) {
        return `${data.statusText}: ${data.responseText}`;
    }
};

Blog.AjaxQueue = class AjaxQueue {

    constructor () {
        this._tasks = [];
    }

    post (...args) {
        const deferred = $.Deferred();
        this._tasks.push({deferred, args});
        this.execute();
        return deferred;
    }

    remove (deferred) {
        const index = this.getTaskIndex(deferred);
        if (index !== undefined) {
            this._tasks.splice(index, 1);
        }
    }

    getTaskIndex (deferred) {
        for (let i = 0; i < this._tasks.length; ++i) {
            if (this._tasks[i].deferred === deferred) {
                return i;
            }
        }
    }

    execute () {
        if (this._xhr || !this._tasks.length) {
            return false;
        }
        const {deferred, args} = this._tasks.splice(0, 1)[0];
        const csrf = Jam.getCsrfToken();
        const data = {csrf, ...args[1]};
        const params = {
            method: 'post',
            contentType: 'application/json',
            url: args[0],
            data: JSON.stringify(data)
        };
        this._xhr = $.ajax(params)
            .always(() => this._xhr = null)
            .done(data => deferred.resolve(data))
            .fail(data => deferred.reject(data));
        deferred.done(this.next.bind(this));
        deferred.fail(this.next.bind(this));
    }

    next () {
        this.execute();
    }

    abort () {
        this._xhr?.abort();
        this._xhr = null;
    }
};

Blog.Loadable = class Loadable extends Blog.Element {

    init () {
        this.load();
    }

    load () {
        this._deferred = this.blog.ajaxQueue
            .post(this.dataMap.url, this.getPostData())
            .done(this.onDone.bind(this))
            .fail(this.onFail.bind(this));
    }

    getPostData () {
        return {};
    }

    onDone (data) {
        this.container.innerHTML = this.render(data);
    }

    onFail (data) {
        this.container.innerHTML = this.renderError(data);
    }

    render (data) {
        return data;
    }

    renderError (data) {
        return `${data.statusText}: ${data.responseText}`;
    }
};

Blog.SearchWidget = class SearchWidget extends Blog.Element {

    init () {
        this.$search = this.$container.find('[type="search"]');
        this.$container.on('submit', this.onSubmit.bind(this));
        this.blog.on('search:clear', this.onClear.bind(this));
    }

    onClear () {
        this.$search.val('');
    }

    onSubmit (event) {
        event.preventDefault();
        this.triggerChange();
    }

    triggerChange () {
        this.blog.trigger('search:change', {search: this.$search.val()});
    }
};