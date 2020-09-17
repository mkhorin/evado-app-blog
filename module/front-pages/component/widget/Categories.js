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
        const activeId = this.active ? this.active.getId() : null;
        const query = category.createQuery({module: this.module}).withCalc().withTitle();
        const models = await query.all();
        const categories = [];
        for (const model of models) {
            categories.push(this.getCategoryData(model, activeId));
        }
        return this.render({categories});
    }

    getCategoryData (model, activeId) {
        return {
            id: model.getId(),
            title: model.getTitle(),
            counter: model.get('publicArticleCounter'),
            active: CommonHelper.isEqual(model.getId(), activeId)
        };
    }

    render (data) {
        return this.renderTemplate('_widget/categories', data);
    }
};

const CommonHelper = require('areto/helper/CommonHelper');