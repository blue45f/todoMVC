import Model from "@/core/Model";

export default class View {
    private readonly model: Model;

    private timer: number | undefined;

    private readonly renderFunc: OmitThisParameter<any>;

    protected readonly data: any;

    private requestRender: number;

    constructor(data: any) {
        this.data = data;
        this.model = new Model(this.onChanges.bind(this));
        this.timer = setInterval(this.onTick.bind(this), 100);
        this.renderFunc = this.render.bind(this);
        this.requestRender = 0;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private onChanges(property: string, oldValue: any, newValue: any): void {
        if (this.requestRender) {
            cancelAnimationFrame(this.requestRender);
        }

        this.requestRender = requestAnimationFrame(this.renderFunc);
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    protected render(): void {
        this.requestRender = 0;
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private onTick(): void {
        const model: any = this.model;

        model.data = this.data;
    }
}
