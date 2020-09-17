/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('areto/base/Controller');

module.exports = class PhotoController extends Base {

    async actionThumbnail () {
        const meta = this.module.getBaseMeta();
        const metaClass = meta.getClass('photo');
        if (!metaClass) {
            return this.sendStatus(501, 'Meta class not found: photo');
        }
        const id = this.getQueryParam('id');
        const model = await metaClass.createQuery({module: this.module}).byId(id).one();
        if (!model) {
            return this.sendStatus(501, 'Model not found');
        }
        const size = this.getQueryParam('s');
        const storage = this.module.getFileStorage();
        const file = await storage.ensureThumbnail(size, model.get('file'));
        if (!file) {
            return this.sendStatus(404, 'File not found');
        }
        const name = model.get('name') || model.getId();
        this.setHttpHeader(storage.thumbnail.getHeaders(name));
        this.sendFile(file);
    }
};
module.exports.init(module);