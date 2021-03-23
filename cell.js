class Cell {

  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.walls = {
      top: true,
      right: true,
      bottom: true,
      left: true
    };
    this.visited = false;
  }

  checkNeighbours() {
    const neighbours = [];

    const temp = [
      cells[index(this.x, this.y - 1)],
      cells[index(this.x + 1, this.y)],
      cells[index(this.x, this.y + 1)],
      cells[index(this.x - 1, this.y)]
    ];

    for (let neighbour of temp) {
      if (neighbour && !neighbour.visited) {
        neighbours.push(neighbour);
      }
    }

    if (neighbours.length > 0) {
      const r = floor(random(0, neighbours.length));
      return neighbours[r];
    } else {
      return undefined;
    }
  }

  show() {
    stroke(255);
    strokeWeight(2);

    const x = this.x * grid;
    const y = this.y * grid;

    if (this.walls.top) line(x, y, x + grid, y);
    if (this.walls.right) line(x + grid, y, x + grid, y + grid);
    if (this.walls.bottom) line(x + grid, y + grid, x, y + grid);
    if (this.walls.left) line(x, y + grid, x, y);

    if (this.visited) {
      fill(200, 10, 255, 100);
      noStroke();
      rect(x, y, grid, grid);
    }
  }

  highlight() {
    noStroke();
    fill(10, 225, 20, 100);
    rect(this.x * grid, this.y * grid, grid, grid);
  }
}