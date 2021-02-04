'use strict';

Blog.RecentCommentWidget = class RecentCommentWidget extends Blog.Loadable {

    getPostData () {
        return {
            class: 'comment',
            view: 'publishedList',
            length: 3
        };
    }

    render (data) {
        let items = data?.items;
        items = Array.isArray(items) ? items : [];
        items = items.reverse();
        return items.map(data => this.resolveTemplate('item', data)).join('');
    }

    renderError () {
        const text = super.renderError(...arguments);
        return this.resolveTemplate('error', {text});
    }
};