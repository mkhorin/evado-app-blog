'use strict';

Vue.component('comment-form', {
    template: '#comment-form',
    props: {
        article: String
    },
    data () {
        return {
            done: false,
            failed: false
        };
    },
    watch: {
        article () {
            this.getFormEl('content').value = '';
            this.done = false;
        }
    },
    methods: {
        async onSubmit () {
            try {
                await this.create();
                this.done = true;
            } catch (err) {
                this.failed = err;
            }
        },
        async create () {
            const data = {
                article: {links: this.article},
                name: this.getValue('name'),
                email: this.getValue('email'),
                content: this.getValue('content')
            };
            await this.$root.fetch(this.$root.createUrl, {
                class: 'comment',
                view: 'publicCreate',
                data
            });
        },
        getValue (name) {
            return this.getFormEl(name)?.value;
        },
        getFormEl (name) {
            return this.$el.querySelector(`[name="${name}"]`);
        }
    }
});