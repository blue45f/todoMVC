import Model from "@/core/Model";

export default class CustomView<T> extends HTMLElement {
    private readonly model: Model;

    private timer: number | undefined;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private readonly renderFunc: OmitThisParameter<any>;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    protected _data: T | undefined;

    private requestRender: number;

    constructor() {
        super();

        this.model = new Model(this.onChanges.bind(this));
        this.timer = setInterval(this.onTick.bind(this), 100);
        this.renderFunc = this.render.bind(this);
        this.requestRender = 0;
    }

    public get data(): T | undefined {
        return this._data;
    }

    public set data(_data: T | undefined) {
        this._data = _data;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private onChanges(): void {
        if (this.requestRender) {
            cancelAnimationFrame(this.requestRender);
        }

        this.requestRender = requestAnimationFrame(this.renderFunc);
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private onTick(): void {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const model: any = this.model;

        model.data = this._data;
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    protected render(): void {
        this.requestRender = 0;
    }
}
