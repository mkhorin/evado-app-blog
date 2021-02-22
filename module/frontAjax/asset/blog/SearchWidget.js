/**
 * @copyright Copyright (c) 2021 Maxim Khorin <maksimovichu@gmail.com>
 */
Blog.SearchWidget = class SearchWidget extends Blog.Element {

    init () {
        this.$search = this.$container.find('[type="search"]');
        this.$container.on('submit', this.onSubmit.bind(this));
        this.blog.on('search:clear', this.onClear.bind(this));
    }

    onClear () {
        this.$search.val('');
    }

    onSubmit (event) {
        event.preventDefault();
        this.triggerChange();
    }

    triggerChange () {
        this.blog.trigger('search:change', {search: this.$search.val()});
    }
};