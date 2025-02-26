const tasksContainer = document.getElementById("tasksContainer");
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("todoInput");

const trashIcon = `
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256">
		<path fill="currentColor" d="M216 48h-40v-8a24 24 0 0 0-24-24h-48a24 24 0 0 0-24 24v8H40a8 8 0 0 0 0 16h8v144a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16V64h8a8 8 0 0 0 0-16M96 40a8 8 0 0 1 8-8h48a8 8 0 0 1 8 8v8H96Zm96 168H64V64h128Zm-80-104v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0m48 0v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0"/>
	</svg>
`;

let tasks = JSON.parse(localStorage.getItem("tasks")) || [
	{ title: "Do the dishes", done: false, id: "0001" },
	{ title: "Walk the dog", done: true, id: "0002" }
];

refresh();

function refresh() {
	tasksContainer.innerHTML = "";
	tasks.forEach((task) => {
		const taskHtml = `
			<div class="item ${task.done ? "item--done" : ""}" id="${task.id}">
				<div class="checkbox" onclick="toggleItem('${task.id}')"></div>
				<p>${task.title}</p>
				<button onclick="deleteItem('${task.id}')">${trashIcon}</button>
			</div>
		`;
		tasksContainer.innerHTML += taskHtml;
	});
	localStorage.setItem("tasks", JSON.stringify(tasks));
}

taskForm.addEventListener("submit", (e) => {
	e.preventDefault();
	if (!taskInput.value.trim()) return;
	tasks.push({ title: taskInput.value.trim(), done: false, id: Date.now().toString() });
	taskInput.value = "";
	refresh();
});

function deleteItem(id) {
	if (!confirm("Are you sure you want to delete this task?")) return;
	tasks = tasks.filter((task) => task.id !== id);
	refresh();
}

function toggleItem(id) {
	const task = tasks.find((task) => task.id === id);
	if (task) {
		task.done = !task.done;
		refresh();
	}
}
