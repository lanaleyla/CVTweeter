import { LocalStorage } from 'node-localstorage';

export class LocalStorageService {

    private localStorage = new LocalStorage('./scratch');
    constructor() {
    }

    public getLocalStorage(key: string): any {
        return this.localStorage.getItem(key);
    }

    public setLocalStorage(key: string, value: any) {
        this.localStorage.setItem(key, value);
    }
}