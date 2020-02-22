import { clone } from "@/helpers";

export default class Model {
    constructor(callback: Function) {
        const proxy: Model = new Proxy<Model>(this, {
            get(target: any, property: string | number | symbol) {
                return target[property];
            },
            set(target: any, property: string | number | symbol, value: any) {
                const oldValue = target[property];

                if (target[property]) {
                    if (JSON.stringify(target[property]).toString() !== JSON.stringify(value).toString()) {
                        target[property] = clone(value);
                    } else {
                        return true;
                    }
                } else {
                    target[property] = clone(value);
                }

                if (value !== oldValue) {
                    callback(property, oldValue, value);
                }

                return true;
            }
        });

        return proxy;
    }
}
