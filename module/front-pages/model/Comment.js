'use strict';

const Base = require('areto/base/Model');

module.exports = class Comment extends Base {

    static getConstants () {
        return {
            ATTRS: [
                'name',
                'email',
                'content'
            ],
            RULES: [
                [['name','email','content'], 'required'],
                ['name', 'string', {min: 2, max: 32}],
                ['email', 'email'],
                ['content', 'string', {min: 3, max: 512}]
            ]
        };
    }

    async save (view, article, user) {
        if (!await this.validate()) {
            return false;
        }
        const model = view.spawnModel({user});
        await model.setDefaultValues();
        model.setFromModel('name', this);
        model.setFromModel('email', this);
        model.setFromModel('content', this);
        model.set('article', article.getId());
        if (await model.save()) {
            return true;
        }
        this.addErrors(model.getErrors());
        return false;
    }
};
module.exports.init(module);