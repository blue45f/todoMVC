import { statTpl } from "@/components/stat/templates";
import CustomView from "@/core/CustomView";
import Item from "@/Item";

interface Data {
    items: Array<Item>;
    lefts: number;
}

export default class TodoStat extends CustomView<Data> {
    constructor() {
        super();

        this.data = {
            items: [],
            lefts: 0
        };
    }

    public render(): void {
        this.attachShadow({ mode: "open" }).innerHTML = statTpl(this.data?.lefts);
    }
}
