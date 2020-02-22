import Item from "@/Item";

export default class Store {
    private localStorage: Storage;
    private items: Array<Item> = [];
    private subscribers: Array<Function>;
    private key: string;

    constructor(key: string) {
        this.localStorage = window.localStorage;
        this.subscribers = [];
        this.key = key;
        this.publish();
    }

    private getStorage(): Array<Item> {
        return this.items || this.storage;
    }

    private get storage(): Array<Item> {
        return (JSON.parse(this.localStorage.getItem(this.key) || "") || []).map((item: Record<string, any>): Item => new Item(item));
    }

    private setStorage(itemList: Array<Item>): void {
        this.localStorage.setItem("TodoList", JSON.stringify(itemList));
        this.publish();
    }

    private publish(): void {
        this.subscribers.forEach(subscriber => subscriber(this.getStorage()));
    }

    public insert(item: Item): void {
        this.setStorage((this.items = this.getStorage().concat([item])));
    }

    public find(id: string): Item | undefined {
        return this.getStorage().find((item: Item): boolean => item.id === id);
    }

    public update(patch: Item): void {
        this.setStorage(
            this.getStorage().map((target: Item) => {
                if (target.equal(patch)) {
                    target = patch;
                }
                return target;
            })
        );
    }

    public remove(query: any): void {
        this.setStorage(
            (this.items = this.getStorage().filter((item: any) => {
                for (const key in query) {
                    if (item[key] !== query[key]) {
                        return true;
                    }
                }
                return false;
            }))
        );
    }

    public count(query: any): number {
        return this.getStorage().filter((item: any) => {
            for (const key in query) {
                if (item[key] !== query[key]) {
                    return false;
                }
            }
            return true;
        }).length;
    }

    public subscribe(subscriber: Function): void {
        this.subscribers.push(subscriber);
    }
}
