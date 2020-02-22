import Item from "./Item";

export const todoTpl: Function = (item: Item): string => `<li data-id="${item.id}"><input type="checkbox" ${item.done ? "checked" : ""} /><label ${item.done ? 'style="text-decoration: line-through"' : ""}>${item.content}</label><button>X</button></li>`;

export const todoListTpl: Function = (items: Array<Item>): string => items.map((item: Item) => todoTpl(item)).join("");

export const statTpl: Function = (leftItemListCount: number): string => `${leftItemListCount} item${leftItemListCount === 1 ? "" : "s"} left.`;
