/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('areto/base/Controller');

module.exports = class ArticleController extends Base {

    constructor (config) {
        super(config);
        this.baseMeta = this.module.getBaseMeta();
    }

    async actionIndex () {
        const articleView = await this.getMetaView('publicList', 'article');
        if (!articleView) {
            throw new InvalidMetadata('Public article list not found');
        }
        const query = articleView.find(this.module).withListData().withTitle();
        const search = this.getQueryParam('text');
        if (search) {
            this.spawn(MetaCommonSearch, {controller: this}).resolve(query, search);
        }
        const provider = await this.prepareProvider({query});
        await this.render('index', {search, provider});
    }

    async actionCategory () {
        const articleView = await this.getMetaView('publicList', 'article');
        if (!articleView) {
            throw new InvalidMetadata('Public article list not found');
        }
        const categoryView = await this.getMetaView(null, 'category');
        if (!categoryView) {
            throw new InvalidMetadata('Category class not found');
        }
        const category = await categoryView.findById(this.getQueryParam('id')).withTitle().one();
        if (!category) {
            throw new NotFound('Category not found');
        }
        const query = articleView.find(this.module).withListData().withTitle();
        query.and({categories: category.getId()});
        const provider = await this.prepareProvider({query});
        await this.render('category', {category, provider});
    }

    async actionView () {
        const articleView = await this.getMetaView('publicView', 'article');
        if (!articleView) {
            throw new InvalidMetadata('Public article view not found');
        }
        const id = this.getQueryParam('id');
        const model = await articleView.findById(id, this.getSpawnConfig()).withReadData().one();
        if (!model) {
            throw new NotFound('Article not found');
        }
        const comment = this.spawn(Comment);
        if (this.isGet()) {
            return this.renderView(model, comment);
        }
        const commentView = await this.getMetaView(null, 'comment');
        if (!commentView) {
            throw new InvalidMetadata('Comment class not found');
        }
        comment.load(this.getPostParams());
        if (!await comment.save(commentView, model, this.user)) {
            return this.renderView(model, comment);
        }
        this.setFlash('commentDone', 'You message has been sent successfully and will be published after moderation');
        this.redirect(['view', model]);
    }

    getSpawnConfig () {
        return {
            module: this.module,
            user: this.user
        };
    }

    getMetaView (viewName, className) {
        const metaClass = this.baseMeta.getClass(className);
        if (!metaClass) {
            return this.renderError(`Meta class not found: ${className}`);
        }
        const view = viewName ? metaClass.getView(viewName) : metaClass;
        if (!view) {
            return this.renderError(`Meta view not found: ${viewName}.${className}`);
        }
        return view;
    }

    async prepareProvider (config) {
        const provider = this.spawn(ActiveDataProvider, {
            controller: this,
            pagination: {pageSize: 5},
            ...config
        });
        await provider.prepare();
        return provider;
    }

    renderError (message) {
        return this.render('error', {message});
    }

    renderView (model, comment) {
        return this.render('view', {model, comment});
    }
};
module.exports.init(module);

const NotFound = require('areto/error/http/NotFound');
const InvalidMetadata = require('evado/component/meta/error/InvalidMetadata');
const ActiveDataProvider = require('areto/data/ActiveDataProvider');
const MetaCommonSearch = require('evado/component/meta/MetaCommonSearch');
const Comment = require('../model/Comment');