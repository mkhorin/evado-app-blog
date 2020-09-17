'use strict';

const Base = require('areto/view/Widget');

module.exports = class RecentComments extends Base {

    async run () {
        const meta = this.module.getBaseMeta();
        const className = 'comment';
        const viewName = 'publicList';
        const view = meta.getViewByClass(viewName, className);
        if (!view) {
            return this.render({error: `Meta view not found: ${viewName}.${className}`});
        }
        const query = view.createQuery({module: this.module});
        const comments = await query.limit(3).all();
        return this.render({comments: comments.reverse()});
    }

    render (data) {
        return this.renderTemplate('_widget/recentComments', data);
    }
};