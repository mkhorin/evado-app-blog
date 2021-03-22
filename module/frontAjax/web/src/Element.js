/**
 * @copyright Copyright (c) 2021 Maxim Khorin <maksimovichu@gmail.com>
 */
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