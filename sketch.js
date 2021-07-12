let run;
let runButton;
let resetButton;
let grid;
let newArr;
let cols;
let rows;
let size = 20;
let animationCount = 10;
let animateCount = 0;

//number of cols = x, number of rows = y
function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

//draw initial state to screen
function setup() {
  console.log("setup");
  createCanvas(800, 600);
  cols = width / size;
  rows = height / size;
  frameRate(30);
  
  grid = make2DArray(cols, rows);
  newArr = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      c = new Cell(i * size + size / 2, j * size + size / 2, size, 0);
      grid[i][j] = c;
      newArr[i][j] = c;
    }
  }

  // add a bunch of buttons
  runButton = createButton("Start");
  runButton.mousePressed(startStop);
  resetButton = createButton("Reset");
  resetButton.mousePressed(reset);
  run = false;
  
  // add instructions
    let p = createP("Click a square to plant a flower. Click again to unplant it.");
    let p1 = createP("You are a gardener in a field of creation. A winnower watches over your shoulder, ready to reap each day’s harvest according to these rules:");
  let p2 = createP("One. A living flower with less than two living neighbors is cut off. It dies.");
  let p3 = createP("Two. A living flower with two or three living neighbors is connected. It lives.");
  let p4 = createP("Three. A living flower with more than three living neighbors is starved and overcrowded. It dies.");
  let p5 = createP("Four. A dead flower with exactly three living neighbors is reborn. It springs back to life.");
  let p6 = createP("Make your starting play.");
}

//run GoL iterations
function draw() {
  if (run == true && frameCount % animationCount == 0) {
      gameOfLife(); 
    }
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].show((frameCount % animationCount) / animationCount);
      }
    }
  }

function gameOfLife() {
  newArr = make2DArray(cols, rows);    
  // for each cell in grid, check the GoL logic
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        newArr[i][j] = grid[i][j].copy();
        let state = grid[i][j].status;
        let sum = 0;
        let neighbors = countNeighbors(grid, i, j);

        //check to see if each cell lives or dies
        if (state == 0 && neighbors == 3) {
          newArr[i][j].status = 1;
          newArr[i][j].animate = true;
        } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
          newArr[i][j].status = 0;
          newArr[i][j].animate = true;
        } else {
        newArr[i][j].animate = false;
        }
      }
    }
    
    //Update all cell statuses for next iteration
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        grid[i][j] = newArr[i][j].copy();
      }
    }
  }


// add up statuses of all neighboring cells
function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;

      sum += grid[col][row].status;
    }
  }
  sum -= grid[x][y].status;
  return sum;
}

//Click to make a cell dead or alive
function mouseClicked() {
  console.log("click");
  let col = floor(mouseX / size);
  let row = floor(mouseY / size);
  cols = width / size;
  rows = height / size;
  if (col < cols && row < rows) {
    grid[col][row].set();
  }
  return false;
}

// //Start or stop iterating
function startStop() {
  if (run == false) {
    run = true;
    runButton.elt.innerHTML = "Pause";
  } else {
    run = false;
    runButton.elt.innerHTML = "Start";
  }
}

// //Reset all cells to be dead
function reset() {
  console.log("Reset");
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].status = 0;
      grid[i][j].animate = false;
    }
  }
  run = false;
  runButton.elt.innerHTML = "Start";
}
