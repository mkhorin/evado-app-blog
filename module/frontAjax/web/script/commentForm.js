'use strict';

Vue.component('comment-form', {
    props: {
        article: String
    },
    data () {
        return {
            name: '',
            email: '',
            content: '',
            done: false,
            failed: false
        };
    },
    watch: {
        article () {
            this.content = '';
            this.done = false;
        }
    },
    created () {
        this.name = this.$root.userName;
        this.email = this.$root.userEmail;
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
                article: this.article,
                name: this.name,
                email: this.email,
                content: this.content
            };
            await this.fetchText('create', {
                class: 'comment',
                view: 'publicCreate',
                data
            });
        }
    },
    template: '#comment-form'
});