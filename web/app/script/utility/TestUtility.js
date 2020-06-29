/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

Jam.Utility.Test = class TestUtility extends Jam.Utility {

    onItem (event) {
        this.checkModelChanged()
            ? event.preventDefault()
            : super.onItem(event);
    }

    execute () {
        const data = this.getRequestData({
            test: 'Test data'
        });
        Jam.toggleGlobalLoader(true);
        Jam.Helper.post(this.$item, this.getUrl(), data)
            .done(this.onDone.bind(this))
            .fail(this.onFail.bind(this));
    }

    onDone (data) {
        Jam.toggleGlobalLoader(false);
        this.modal.reload().done(()=> this.getModel().notice.success(data));
    }

    onFail (data) {
        Jam.toggleGlobalLoader(false);
        this.parseModelError(data);
    }
};