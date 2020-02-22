import Model from "@/core/Model";

export default class View<T> {
    constructor() {
        this.model = new Model<T>(this.onChanges.bind(this));
        this.timer = setInterval(this.onTick.bind(this), 100);
        this.renderFunc = this.render.bind(this);
        this.requestRender = 0;
    }

    protected model: Model<T>;

    private timer: number | undefined;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private readonly renderFunc: OmitThisParameter<any>;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private onChanges(property: string, oldValue: any, newValue: any): void {
        if (this.requestRender) {
            cancelAnimationFrame(this.requestRender);
        }

        this.requestRender = requestAnimationFrame(this.renderFunc);
    }

    protected requestRender: number;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    protected render(): void {}

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    protected onTick(): void {}
}
