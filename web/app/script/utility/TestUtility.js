/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

Jam.Utility.Test = class TestUtility extends Jam.Utility {

    onItem (event) {
        this.checkModelChanges()
            ? event.preventDefault()
            : super.onItem(event);
    }

    execute () {
        const data = this.getRequestData({
            test: 'Test data'
        });
        Jam.toggleLoader(true);
        return Jam.post(this.getUrl(), data)
            .done(this.onDone.bind(this))
            .fail(this.onFail.bind(this));
    }

    onDone (data) {
        Jam.toggleLoader(false);
        this.frame.reload().done(() => {
            this.getModel().alert.success(data);
        });
    }

    onFail (data) {
        Jam.toggleLoader(false);
        this.parseModelError(data);
    }
};