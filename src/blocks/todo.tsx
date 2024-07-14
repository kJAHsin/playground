import { useEffect, useState, FormEvent } from "react";
import Todo from "../classes/todo-item.tsx";

export default function Block() {
	const [todos, setTodos] = useState<Array<string | Todo | any>>([]);
	const [isValid, setIsValid] = useState(false);

	function addListItem(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const form: HTMLFormElement | null = document.querySelector("form");
		const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll(
			'form > input:not([type="submit"])'
		);
		const itemName = form?.todo.value;
		const fullDate = form?.date.value;

		if (!itemName || !fullDate) return;
		const dateObj = new Date(fullDate);
		const weekday = dateObj.toLocaleDateString("en-US", {
			weekday: "long",
		});
		const date = dateObj.getDate();
		const month = dateObj.toLocaleDateString("en-US", { month: "long" });
		const year = dateObj.getFullYear();

		const todoItem = new Todo(itemName, weekday, date, month, year);
		setTodos([...todos, todoItem]);

		inputs.forEach((i) => (i.value = ""));
	}

	function checkValidity() {
		const form = document.querySelector("form");

		!(form?.todo.value && form?.date.value)
			? setIsValid(false)
			: setIsValid(true);
	}

	useEffect(() => {
		const itemList: HTMLElement | null = document.querySelector(".list");
		if (itemList) {
			itemList.innerHTML = "";
			if (todos.length === 0) return;
			for (let i = 0; i < todos.length; i++) {
				todos[i].addListItem();
			}
		}
	}, [todos]);

	useEffect(() => {
		const form = document.querySelector("form");
		isValid
			? form?.classList.remove("invalid")
			: form?.classList.add("invalid");
	}, [isValid]);

	return (
		<>
			<div className="logo"></div>
			<div className="container">
				<h2>You&apos;ve got stuff to do:</h2>
				<button
					className="clear-btn"
					onClick={() => {
						setTodos([]);
					}}
				>
					clear list
				</button>
				<form onSubmit={addListItem}>
					<input
						type="text"
						name="todo"
						id="todoEl"
						aria-label="enter an item"
						placeholder="Enter your todo"
						onChange={() => checkValidity()}
					/>
					<input
						type="date"
						name="date"
						id="dateEl"
						aria-label="enter the date"
						onChange={() => checkValidity()}
					/>
					<input
						type="submit"
						value="Add to list"
						title="add new item to list"
						aria-label="add new item to list"
					/>
				</form>
			</div>
			<div className="sort-btns">
				<span>Sort Todos by:</span>
				<button>a-z</button>
				<button>date</button>
			</div>
			<ul className="list"></ul>
		</>
	);
}
