import Item from "./Item";
import Store from "./Store";
import TodoView from "./TodoView";

interface Data {
    items: Array<Item>;
    lefts: number;
}

export default class Controller {
    private view: TodoView;
    private store: Store;
    private data: Data = { items: [], lefts: 0 };

    constructor(key: string) {
        this.view = new TodoView(this.data);
        this.store = new Store(key);

        this.view.onSubmit((value: string): void => {
            this.data.items.push(new Item(value));
        });

        this.view.onClickCheckbox((id: string) => {
            const item: Item | undefined = this.data.items.find((item: Item): boolean => item.id === id);

            if (item) {
                item.toggle();
            }

            this.data.lefts = this.data.items.filter((item: Item): boolean => item.done).length;
        });

        this.view.onClickButton((id: string) => {
            this.data.items.splice(
                this.data.items.findIndex((item: Item): boolean => item.id === id),
                1
            );
        });
    }
}
