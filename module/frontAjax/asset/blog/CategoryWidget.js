/**
 * @copyright Copyright (c) 2021 Maxim Khorin <maksimovichu@gmail.com>
 */
Blog.CategoryWidget = class CategoryWidget extends Blog.Loadable {

    init () {
        super.init();
        this.$container.on('click', '[data-id]', this.onItem.bind(this));
        this.blog.on('category:change', this.onChangeCategory.bind(this));
    }

    getPostData () {
        return {
            class: 'category'
        };
    }

    onChangeCategory (event, {id}) {
        this.$container.find('.active').removeClass('active');
        this.$container.find(`[data-id="${id}"]`).addClass('active');
    }

    onItem (event) {
        event.preventDefault();
        const $target = $(event.currentTarget);
        const id = $target.hasClass('active') ? null : $target.data('id');
        this.blog.trigger('category:change', {id});
    }

    render (data) {
        let items = data?.items;
        items = Array.isArray(items) ? items : [];
        items = items.filter(data => data.publicArticleCounter);
        items = items.map(data => {
            data._title = Jam.StringHelper.escapeTags(data._title);
            return this.resolveTemplate('item', data);
        }).join('');
        return items
            ? this.resolveTemplate('list', {items})
            : this.resolveTemplate('error', {text: Jam.t('No categories with articles')});
    }

    renderError () {
        const text = super.renderError(...arguments);
        return this.resolveTemplate('error', {text});
    }
};