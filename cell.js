class Cell {
  constructor(x, y, s, status, color, a = false) {
    this.x = x;
    this.y = y;
    this.size = s;
    this.status = status;
    this.animate = a;
  }
  
  // If a cell is clicked on, change its status from 1 to 0 or other way around
  set() {
    this.status = (this.status + 1) % 2;
  }
  
  // pass data from one array to the next 
  copy(){
    return new Cell(this.x, this.y, this.size, this.status, this.color, this.animate)
  }
  
  // Have an animation for a change of cell status
  show(percentage) {
    //by default always do this for each cell
    push();
    translate(this.x, this.y);
    
    // if cell is dead and unchanged draw green square
    if (this.status == 0 && !this.animate) {
    stroke(0, 75, 0);
    fill(92, 145, 100);
    rectMode(CENTER);
    rect(0, 0, this.size, this.size);
    
    // if cell is alive and unchanged draw static flower
  } else if (this.status == 1 && !this.animate) {
    
    noStroke();
    fill(245, 191, 234);  
    let angle = 0;
      for (let i = 0; i < 8; i++) {
        rotate(angle);
        ellipseMode(CORNER);
        ellipse(0, 0 - size / 10, (size / 2), size / 5);
        angle += PI / 4.0;
      }
  } else if (this.animate = true) {
    // if cell becomes alive draw flower bloom
    if (this.status == 1) {
      
      noStroke();
      fill(245, 191, 234);
      let angle = 0;
      for (let i = 0; i < 8; i++) {
        rotate(angle);
        ellipseMode(CORNER)
        ellipse(0, 0 - size/10, (size/2) * percentage, size/5);
        angle += PI / 4.0;
    }
    // if cell becomes dead draw fading
  } else {
      noStroke;
      fill(92, 145, 100, 2 * animationCount);
      rectMode(CENTER);
      rect(0, 0, this.size, this.size);
      }
    

    

  
    }
    pop();
  }
}