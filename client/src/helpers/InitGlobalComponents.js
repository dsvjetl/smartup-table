import Vue from 'vue';
import Modal from '@/components/global/Modal';

export class InitGlobalComponents {

    constructor() {
        this.initGlobalComponents();
    }

    initGlobalComponents() {
        Vue.component('vModal', Modal);
    }

}