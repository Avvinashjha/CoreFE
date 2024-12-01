export interface TodoInterface {
    title: string,
    id: number,
    description: string,
    createdBy:string,
    createdAt: Date,
    completed: boolean,
    completedAt?: Date,
    status: string,
}

export default class TodoItem implements TodoInterface{

    constructor(
        private _id:number = 0,
        private _title: string = '',
        private _description: string = '',
        private _createdBy: string = '',
        private _createdAt: Date = new Date(),
        private _completed: boolean = false,
        private _completedAt?: Date,
        private _status: string = 'active',
    ){
    }

    get id(): number {
        return this._id;
    }
    set id(value: number) {
        this._id = value;
    }
    get title(): string {
        return this._title;
    }
    set title(value: string) {
        this._title = value;
    }
    get description(): string {
        return this._description;
    }
    set description(value: string) {
        this._description = value;
    }
    get createdBy(): string {
        return this._createdBy;
    }
    set createdBy(value: string) {
        this._createdBy = value;
    }
    get createdAt(): Date {
        return this._createdAt;
    }
    set createdAt(value: Date) {
        this._createdAt = value;
    }
    get completed(): boolean {
        return this._completed;
    }
    set completed(value: boolean) {
        this._completed = value;
    }
    get completedAt(): Date | undefined {
        return this._completedAt;
    }
    set completedAt(value: Date | undefined) {
        this._completedAt = value;
    }
    get status(): string {
        return this._status;
    }
    set status(value: string) {
        this._status = value;
    }
}