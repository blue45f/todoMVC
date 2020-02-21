import { guid } from "./helpers";

export default class Item {
    private readonly _id: string;
    private _content: string;
    private _done: boolean;

    constructor(item: string | any) {
        if (typeof item === "string") {
            this._id = guid();
            this._content = item;
            this._done = false;
        } else {
            this._id = item._id;
            this._content = item._content;
            this._done = item._done;
        }
    }

    public get id(): string {
        return this._id;
    }

    public get done(): boolean {
        return this._done;
    }

    public get content(): string {
        return this._content;
    }

    public set content(_content: string) {
        this._content = _content;
    }

    public equal(_todo: Item): boolean {
        return this._id === _todo.id;
    }

    public toggle(): boolean {
        return (this._done = !this._done);
    }
}
