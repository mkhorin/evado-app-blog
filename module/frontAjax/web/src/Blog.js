/**
 * @copyright Copyright (c) 2021 Maxim Khorin <maksimovichu@gmail.com>
 */
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