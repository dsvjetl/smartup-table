import Vue from 'vue';
import * as svgicon from 'vue-svgicon';

export class SvgIcons {
    constructor() {
        this.useIcons();
    }

    useIcons() {
        Vue.use(svgicon, {
            tagName: 'icon',
            classPrefix: 'c-svgicon'
        });
    }
}