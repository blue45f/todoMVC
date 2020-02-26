import Controller from "./Controller";

new Controller("TodoList");

import TodoStat from "../src/components/stat/TodoStat";

customElements.define("todo-stat", TodoStat);

const todoStat: TodoStat = document.querySelector("todo-stat") as TodoStat;

if (todoStat.data) {
    todoStat.data.lefts = 2;
}
