# the-flower-game
An animated version of Conway's Game of Life with aesthetics inspired by the lore of Destiny.
https://arraenae.github.io/the-flower-game/

How to play:
Click on a square to set it to alive (pink flower) or dead (green square). This will let you set the initial conditions of the game.
To run the game, click the start button under the grid. While the game is running, it will turn into a pause button, which can be clicked to pause the game.
To clear the grid, click the reset button under the grid. 
Iterations follow the ruleset of Conway's Game of Life, where the status of a cell in the next iteration is determined by how many living neighbors it has in the current iteration. For each living cell, if there are exactly 2-3 neighbors, it continues to live. If not, it dies. For each dead cell, if there are exactly 3 living neighbors, it comes to life. If not, it stays dead. The grid wraps around from top to bottom and left to right, so if something goes off of the edge it immediately appears on the opposite side, allowing simulation of a larger grid than what is actually there as long as the forms do not collide into itself from the other side. 
