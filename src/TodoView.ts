import Item from "@/Item";
import { statTpl, todoListTpl } from "@/templates";
import View from "@/core/View";
import { clone } from "@/helpers";

interface Data {
    items: Array<Item>;
    lefts: number;
}

export default class TodoView extends View<Data> {
    private readonly $todoList: Element | null;
    private readonly $todoInput: HTMLInputElement | null;
    private readonly $todoStat: Element | null;
    private readonly data: Data;

    constructor(data: Data) {
        super();

        this.data = data;
        this.$todoList = document.querySelector("#todo-list");
        this.$todoInput = document.querySelector("#todo-input");
        this.$todoStat = document.querySelector("#todo-stat");
    }

    public onSubmit(handler: Function): void {
        if (this.$todoInput) {
            this.$todoInput.addEventListener("keypress", (event: KeyboardEvent) => {
                if (event.key === "Enter") {
                    const target: HTMLInputElement = event.target as HTMLInputElement;

                    handler(target.value);
                    target.value = "";
                }
            });
        }
    }

    public onClickCheckbox(handler: Function): void {
        if (this.$todoList) {
            this.$todoList.addEventListener("click", (event: Event) => {
                const target: HTMLInputElement = event.target as HTMLInputElement;

                if (target.tagName === "INPUT" && target.type === "checkbox") {
                    if (target.parentElement) {
                        handler(target.parentElement.dataset["id"]);
                    }
                }
            });
        }
    }

    public onClickButton(handler: Function): void {
        if (this.$todoList) {
            this.$todoList.addEventListener("click", (event: Event): void => {
                const target: HTMLElement = event.target as HTMLInputElement;

                if (target.tagName === "BUTTON") {
                    if (target.parentElement) {
                        handler(target.parentElement.dataset["id"]);
                    }
                }
            });
        }
    }

    public render(): void {
        if (this.$todoList) {
            this.$todoList.innerHTML = todoListTpl(this.data.items);
        }

        if (this.$todoStat) {
            this.$todoStat.innerHTML = statTpl(this.data.lefts);
        }

        this.requestRender = 0;
    }

    protected onTick(): void {
        const data: Data = this.model as Data;

        if (data.items) {
            if (JSON.stringify(data.items).toString() !== JSON.stringify(this.data.items).toString()) {
                data.items = clone(this.data.items);
            }
        } else {
            data.items = clone(this.data.items);
        }
    }
}
