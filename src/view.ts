import Item from "@/Item";
import { statTpl, todoListTpl } from "@/templates";

export default class View {
    private readonly $todoList: Element | null;
    private readonly $todoInput: HTMLInputElement | null;
    private readonly $todoStat: Element | null;

    constructor() {
        this.$todoList = document.querySelector("#todo-list");
        this.$todoInput = document.querySelector("#todo-input");
        this.$todoStat = document.querySelector("#todo-stat");
    }

    onSubmit(handler: Function): void {
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

    onClickCheckbox(handler: Function): void {
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

    onClickButton(handler: Function): void {
        if (this.$todoList) {
            this.$todoList.addEventListener("click", (event: Event) => {
                const target: HTMLElement = event.target as HTMLInputElement;

                if (target.tagName === "BUTTON") {
                    if (target.parentElement) {
                        handler(target.parentElement.dataset["id"]);
                    }
                }
            });
        }
    }

    render(todoList: Array<Item>, lefts: number): void {
        if (this.$todoList) {
            this.$todoList.innerHTML = todoListTpl(todoList);
        }

        if (this.$todoStat) {
            this.$todoStat.innerHTML = statTpl(lefts);
        }
    }
}
