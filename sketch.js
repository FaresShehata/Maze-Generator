let cells = [];
let cols, rows, grid, current;
let stack = [];

function setup() {
	createCanvas(600, 600);
	grid = width / 30;
	cols = width / grid;
	rows = height / grid;
	for (let y = 0; y < rows; y++) {
		for (let x = 0; x < cols; x++) {
			cells.push(new Cell(x, y));
		}
	}
	current = cells[index(0, 0)];
}

function draw() {
	background(100);

	for (let cell of cells) cell.show();

	current.visited = true;
	current.highlight();
	cells[cells.length - 1].highlight();

	const next = current.checkNeighbours();
	if (next) {
		stack.push(current);
		removeWalls(current, next);
		current = next;
	} else if (stack.length > 0) {
		current = stack.pop();
	}
}

function index(i, j) {
	if (i < 0 || j < 0 || i >= cols || j >= rows) return -1;
	else return i + j * rows;
}

function removeWalls(a, b) {
	switch (a.x - b.x) {
		case 1: //right
			b.walls.right = false;
			a.walls.left = false;
			break;
		case -1: //left
			b.walls.left = false;
			a.walls.right = false;
			break;
	}
	switch (a.y - b.y) {
		case 1: //bottom
			b.walls.bottom = false;
			a.walls.top = false;
			break;
		case -1: //top
			b.walls.top = false;
			a.walls.bottom = false;
			break;
	}
}