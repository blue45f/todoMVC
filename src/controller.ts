import Item from "./Item";
import Store from "./Store";
import View from "./View";

export default class Controller {
    private view: View;
    private store: Store;

    constructor(key: string) {
        this.view = new View();
        this.store = new Store(key);

        this.view.onSubmit((value: string) => {
            const todo: Item = new Item(value);
            this.store.insert(todo);
        });

        this.view.onClickCheckbox((targetId: string) => {
            const targetTodo: Item = this.store.find({ id: targetId })[0];
            targetTodo.toggle();
            this.store.update(targetTodo);
        });

        this.view.onClickButton((targetId: string) => {
            this.store.remove({ id: targetId });
        });

        this.store.subscribe((todos: Array<Item>) => {
            this.view.render(todos, this.store.count({ done: false }));
        });

        this.store.initialize();
    }
}
