let currentPage = 1;
let pages = document.querySelectorAll(".project");
let progressBar = document.querySelector(".footer__progress");
let progressPoints = document.querySelectorAll(".footer__circle");

const UP_ARROW_KEYCODE = 38;
const DOWN_ARROW_KEYCODE = 40;
const LEFT_ARROW_KEYCODE = 37;
const RIGHT_ARROW_KEYCODE = 39;

const debounce = (func, delay) => {
	let timeout;

	return (...args) => {
		const later = () => {
			clearTimeout(timeout);
			func(...args);
		};

		clearTimeout(timeout);
		timeout = setTimeout(later, delay);
	};
};

const updatePage = (type) => {
	currentPage =
		type === "inc"
			? Math.min(6, currentPage + 1)
			: Math.max(1, currentPage - 1);

	pages.forEach((page, index) => {
		if (index + 1 === currentPage) page.classList.add("project--active");
		else page.classList.remove("project--active");
		if (index + 1 === currentPage) console.log(page);
	});

	progressBar.style.width = `calc(${(currentPage - 1) * 20}% + 10px)`;
};

function makeProjectActive() {
	const project = document.querySelector(".project");
	console.log(project);
	project.classList.toggle("project--active");
	console.log(project);
}

const handleWheelScroll = debounce((event) => {
	const updateType = event.deltaY < 0 ? "inc" : "dec";
	updatePage(updateType);
}, 200);

const handleKeyDown = debounce((event) => {
	const { keyCode } = event;
	console.log(keyCode);
	switch (keyCode) {
		case UP_ARROW_KEYCODE:
		case LEFT_ARROW_KEYCODE: {
			updatePage("dec");
			break;
		}
		case DOWN_ARROW_KEYCODE:
		case RIGHT_ARROW_KEYCODE: {
			updatePage("inc");
			break;
		}
	}
}, 200);

window.addEventListener("wheel", handleWheelScroll);
window.addEventListener("keydown", handleKeyDown);
