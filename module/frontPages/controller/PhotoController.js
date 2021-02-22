/**
 * @copyright Copyright (c) 2020 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('evado/component/base/BaseController');

module.exports = class PhotoController extends Base {

    async actionThumbnail () {
        const meta = this.module.getBaseMeta();
        const cls = meta.getClass('photo');
        if (!cls) {
            return this.sendStatus(501, 'Metadata class not found: photo');
        }
        const id = this.getQueryParam('id');
        const model = await cls.createQuery({module: this.module}).byId(id).one();
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