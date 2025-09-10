export function createEmptyGrid(rows, cols) {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => 0)
  );
}

// green X pattern
function drawFixedGreenX(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const size = Math.min(rows, cols);

  // Repeat X pattern
  for (let offset = 0; offset < rows; offset += size) {
    for (let i = 0; i < size && offset + i < rows; i++) {
      // ↘ pattern
      if (grid[offset + i][i] === 0) {
        grid[offset + i][i] = 2;
      }
      // ↙ pattern
      if (grid[offset + i][cols - 1 - i] === 0) {
        grid[offset + i][cols - 1 - i] = 2;
      }
    }
  }
}

function drawFullGreaterThan(grid, startRow) {
  const rows = grid.length;
  const cols = grid[0].length;

  if (rows < 3 || cols < 3) return;

  const mid = Math.floor(rows / 2);

  for (let r = 0; r < rows; r++) {
    const row = startRow + r;
    if (row < 0 || row >= rows) continue;

    let c;

    if (r <= mid) {
      // Upper diagonal
      c = Math.floor((r * (cols - 1)) / mid);
    } else {
      // Lower diagonal
      c = Math.floor(((rows - 1 - r) * (cols - 1)) / (rows - 1 - mid));
    }

    if (c >= 0 && c < cols) {
      grid[row][c] = 1;
    }
  }
}

// ">"
function drawMovingInfiniteGreaterThan(grid, step) {
  const rows = grid.length;

  for (let offset = -rows; offset < rows * 2; offset += rows) {
    drawFullGreaterThan(grid, (offset + step) % rows);
  }
}

export function getNextPatternGrid(rows, cols, step) {
  const grid = createEmptyGrid(rows, cols);

  // Red ">" symbol scrolling
  drawMovingInfiniteGreaterThan(grid, step);

  // Green fixed X
  drawFixedGreenX(grid);

  return grid;
}