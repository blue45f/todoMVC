export default class Model<T> {
    constructor(callback: Function) {
        const proxy: Model<T> = new Proxy<Model<T>>(this, {
            get(target: any, property: string | number | symbol) {
                return target[property];
            },
            set(target: any, property: string | number | symbol, value: T) {
                const oldValue = target[property];

                target[property] = value;

                if (value !== oldValue && callback) {
                    callback(property, oldValue, value);
                }

                return true;
            }
        });

        return proxy;
    }
}
