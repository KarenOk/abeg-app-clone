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

const updatePage = (type, pageNo) => {
	console.log(type, pageNo);
	currentPage =
		type === "direct"
			? pageNo
			: type === "inc"
			? Math.min(6, currentPage + 1)
			: Math.max(1, currentPage - 1);

	pages.forEach((page, index) => {
		if (index + 1 === currentPage) page.classList.add("project--active");
		else page.classList.remove("project--active");
	});

	progressPoints.forEach((point, index) => {
		if (index + 1 === currentPage)
			point.classList.add("footer__circle--active");
		else point.classList.remove("footer__circle--active");
	});

	progressBar.style.width = `calc(${(currentPage - 1) * 20}% + 10px)`;
};

const handleWheelScroll = debounce((event) => {
	const updateType = event.deltaY < 0 ? "inc" : "dec";
	updatePage(updateType);
}, 200);

const handleKeyDown = debounce((event) => {
	const { keyCode } = event;
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

progressPoints.forEach((point, index) => {
	point.addEventListener("click", () => {
		updatePage("direct", index + 1);
	});
});

window.addEventListener("wheel", handleWheelScroll);
window.addEventListener("keydown", handleKeyDown);
