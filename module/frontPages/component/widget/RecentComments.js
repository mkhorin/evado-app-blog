'use strict';

const Base = require('areto/view/Widget');

module.exports = class RecentComments extends Base {

    async execute () {
        const {module} = this;
        const meta = module.getBaseMeta();
        const className = 'comment';
        const viewName = 'publicList';
        const view = meta.getViewByClass(viewName, className);
        if (!view) {
            return this.render({
                error: `Metadata view not found: ${viewName}.${className}`
            });
        }
        const query = view.createQuery({module});
        const comments = await query.limit(3).all();
        return this.render({
            comments: comments.reverse()
        });
    }

    render (data) {
        return this.renderTemplate('_widget/recentComments', data);
    }
};