'use strict';

const Base = require('areto/view/Widget');

module.exports = class Categories extends Base {

    async run () {
        const meta = this.module.getBaseMeta();
        const className = 'category';
        const category = meta.getClass(className);
        if (!category) {
            return this.render({error: `Meta class not found: ${className}`});
        }
        const id = this.active ? this.active.getId() : null;
        const models = await category.find(this.module).withCalc().withTitle().all();
        const categories = [];
        for (const model of models) {
            categories.push({
                'id': model.getId(),
                'title': model.getTitle(),
                'counter': model.get('publicArticleCounter'),
                'active': CommonHelper.isEqual(id, model.getId())
            });
        }
        return this.render({categories});
    }

    render (data) {
        return this.renderTemplate('_widget/categories', data);
    }
};

const CommonHelper = require('areto/helper/CommonHelper');