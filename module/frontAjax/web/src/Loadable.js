/**
 * @copyright Copyright (c) 2021 Maxim Khorin <maksimovichu@gmail.com>
 */
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