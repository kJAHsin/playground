export default class Todo {
	constructor(name, weekday, date, month, year) {
		this.name = name;
		this.weekday = weekday;
		this.date = date;
		this.month = month;
		this.year = year;
	}

	addListItem() {
		if (!this.name || !this.date) return;
		const list = document.querySelector(".list");
		const newListItem = document.createElement("li");
		newListItem.setAttribute("title", this.name);
		newListItem.innerHTML = `
        <span>${this.name}</span>
        <span>${this.month} ${this.date},${this.year}</span>
        `;

		list.appendChild(newListItem);
	}
}
