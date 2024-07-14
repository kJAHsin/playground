export default class Todo {
	public name: string;
	public weekday: string;
	public date: number;
	public month: string;
	public year: number;

	constructor(
		name: string,
		weekday: string,
		date: number,
		month: string,
		year: number
	) {
		this.name = name;
		this.weekday = weekday;
		this.date = date;
		this.month = month;
		this.year = year;
	}

	addListItem(): void {
		if (!this.name || !this.date) return;
		const list: Element | any = document.querySelector(".list");
		const newListItem = document.createElement("li");
		newListItem.setAttribute("title", this.name);
		newListItem.innerHTML = `
        <span>${this.name}</span>
        <span>${this.month} ${this.date},${this.year}</span>
        `;

		list.appendChild(newListItem);
	}
}
