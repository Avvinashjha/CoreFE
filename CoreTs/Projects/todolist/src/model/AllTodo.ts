import TodoItem, { TodoInterface } from "./TodoItem";

interface Todo {
    todo: TodoItem[];
    load(): void;
    save(): void;
    clearList(): void;
    addTodo(item: TodoItem): void;
    deleteTodo(itemId: number): void;
    changeStatus(itemId: number, status: string): void;
    updateTodo(itemId: number, updatedItem: TodoItem): void;
}

export default class TodoList implements Todo{

    static instance: TodoList = new TodoList();
    constructor(private _todo: TodoItem[] = []){}
    get todo(): TodoItem[] {
        return this._todo;
    }
    load(): void {
        const storedTodo: string | null  = localStorage.getItem('myTodo');
        if(storedTodo !== null){
            const parsedTodo: TodoInterface[] = JSON.parse(storedTodo);
            parsedTodo.forEach(item => TodoList.instance.addTodo(new TodoItem(item.id, item.title, item.description, item.createdBy, new Date(item.createdAt), item.completed, item.completedAt, item.status)));
        }else{
            this._todo = [];
            this.save();
        }
    }
    save(): void {
        localStorage.setItem("myTodo", JSON.stringify(this._todo));
    }
    clearList(): void {
        this._todo = [];
        localStorage.removeItem("myTodo");
    }
    addTodo(item: TodoItem): void {
        this._todo.push(item);
        this.save();
    }
    deleteTodo(itemId: number): void {
        this._todo = this._todo.filter(item => item.id!== itemId);
        this.save();
    }
    changeStatus(itemId: number, status: string): void {
        this._todo = this._todo.map(item => {
            if(item.id === itemId) {
                item.status = status;
            }
            return item;
        });
        this.save();
    }
    updateTodo(itemId: number, updatedItem: TodoItem): void {
        this._todo = this._todo.map(item => {
            if(item.id === itemId) {
                return updatedItem;
            }
            return item;
        });
        this.save();
    }
    static getInstance(): TodoList {
        return TodoList.instance;
    }
}