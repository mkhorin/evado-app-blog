'use strict';

Blog.Pagination = class Pagination {

    constructor (params = {}) {
        this.page = 0;
        this.pageSize = params.pageSize || 5;
        this.params = params;
        this.$container = params.$container;

        this.$container.on('click', '.pagination [data-action="first"]', this.onFirst.bind(this));
        this.$container.on('click', '.pagination [data-action="prev"]', this.onPrev.bind(this));
        this.$container.on('click', '.pagination [data-action="next"]', this.onNext.bind(this));
        this.$container.on('click', '.pagination [data-action="last"]', this.onLast.bind(this));
        this.$container.on('click', '.pagination [data-page]', this.onPage.bind(this));
    }

    isValidPage (page) {
        return Number.isInteger(page) && page >= 0 && page < this.numPages;
    }

    getOffset () {
        return this.page * this.pageSize;
    }

    getPageSize () {
        return this.pageSize;
    }

    onFirst (event) {
        event.preventDefault();
        this.setPage(0);
    }

    onPrev (event) {
        event.preventDefault();
        this.setPage(this.page - 1);
    }

    onLast (event) {
        event.preventDefault();
        this.setPage(this.numPages - 1);
    }

    onNext (event) {
        event.preventDefault();
        this.setPage(this.page + 1);
    }

    onPage (event) {
        event.preventDefault();
        this.setPage(event.target.dataset.page);
    }

    setPage (page) {
        page = Number(page);
        if (page !== this.page && this.isValidPage(page)) {
            this.page = page;
            this.$container.trigger('pagination:change', {page});
        }
    }

    setTotal (total) {
        total = Number.isInteger(total) ? total : 0;
        this.numPages = Math.ceil(total / this.pageSize);
    }

    render () {
        if (this.numPages < 2) {
            return '';
        }
        return Blog.resolveTemplate(this.params.paginationTemplate, {
            pages: this.renderPages()
        });
    }

    renderPages () {
        let result = '';
        for (let i = 0; i < this.numPages; ++i) {
            result += Blog.resolveTemplate(this.params.pageTemplate, {
                active: i === this.page ? 'active' : '',
                page: i,
                text: i + 1
            });
        }
        return result;
    }
};