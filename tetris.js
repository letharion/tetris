var y = 0;
var x = 0;
var gameField = new Array();
var pieces = [
	[
		[0,1,0],
		[1,1,1]
	], [
		[0,0,1],
		[1,1,1]
	], [
		[1,0,0],
		[1,1,1]
	], [
		[0,1,1],
		[1,1,0]
	], [
		[1,1,0],
		[0,1,1]
	], [
		[1],
		[1],
		[1],
		[1]
	], [
		[1,1],
		[1,1]
	] ];

//Class to hold the current piece
function activePiece() {
	this.orientation = 0;
	this.x = 45;
	this.y = 150;
	var rand = Math.ceil(Math.random() * 7) - 1;
	this.type = rand;
	this.piece = pieces[rand];

	var debug = "Length: " + this.piece[0].length + "\nHeight: " + this.piece.length + "\n\n";
	//0 orientation read
	debug += "0 orientation:\n"
	for (x = 0; x < this.piece.length; x++) {
		for (y = 0; y < this.piece[0].length; y++) {
			debug += this.piece[x][y] + ".";
		}
		debug += "\n";
	}

	debug += "90 orientation read\n"
	for (y = 0; y < this.piece[0].length; y++) {
		for (x = this.piece.length - 1; x >= 0; x--) {
			debug += this.piece[x][y] + ".";
		}
		debug += "\n";
	}
	alert(debug);
}

//Main class
function tetris() {
	this.activePiece = new activePiece();

	this.right = function() {
		if (activePiece.x < (150 - (activePiece.piece[0].length * 15))) {
			activePiece.x += 15;
			draw(activePiece);
		}
	};
	this.left = function() {
		if (activePiece.x > 0) {
			activePiece.x -= 15;
			draw(activePiece);
		}
	};
	this.up = function() {
		activePiece.orientation += 90;
		if (activePiece.orientation >= 360) {
			activePiece.orientation -= 360;
		}
		draw(activePiece);
	};
	this.down = function() {
		forceDown(activePiece);
	}
	this.init = function() {
		//Create a keyboard handler and assign the onkeydown event to call it
		var keyboard = new Keyboard();
		document.onkeydown = keyboard.event;
		//Map keypresses to function calls
		keyboard.add(keyboard.right, this.right);
		keyboard.add(keyboard.left, this.left);
		keyboard.add(keyboard.up, this.up);
		keyboard.add(keyboard.down, this.down);

		//Interval the forced drop
		var gameLoop = setInterval("forceDown(activePiece)", 1000);
		//Draw our initial screen
		draw(this.activePiece);

		var debug = "Start:\n";
		for (x = 0; x < 10; x++) {
			gameField[x] = new Array();
			for (y = 0; y < 20; y++) {
				gameField[x][y] = 0;
				debug += "0, ";
			}
			debug += "\n";
		}
		//alert(debug);
	}

	this.init();
}

function forceDown(activePiece) {
	activePiece.y += 15;

	draw(activePiece);

	var debug = "force:\n";

	if (activePiece.y + (activePiece.piece.length * 15) + 15 > 300) {
		xi = activePiece.x / 15;
		yi = activePiece.y / 15;
		//TODO To much repetition. Merge into a single function call
		if (activePiece.orientation == 0) {
			for (y = 0; y < activePiece.piece[0].length; y++) {
				for (x = 0; x < activePiece.piece.length; x++) {
					if (activePiece.piece[x][y] > 0) {
						//TODO Clear up or comment this reversal of x/y
						gameField[y + xi][x + yi] = activePiece.piece[x][y];
					}
					//debug += gameField[y + xi][x + yi] + ", ";
				}
				//debug += "\n";
			}
		} else if (activePiece.orientation == 90) {
			for (y = activePiece.piece[0].length - 1; y >= 0; y--) {
				for (x = activePiece.piece.length - 1; x >= 0; x--) {
					if (activePiece.piece[x][y] > 0) {
						//TODO Clear up or comment this reversal of x/y
						gameField[x + xi][y + yi - 1] = activePiece.piece[x][y];
					}
					//debug += gameField[y + xi][x + yi] + ", ";
				}
				//debug += "\n";
			}
		} else if (activePiece.orientation == 180) {
			for (y = activePiece.piece[0].length - 1; y >= 0; y--) {
				for (x = 0; x < activePiece.piece.length; x++) {
					if (activePiece.piece[x][y] > 0) {
						//TODO Clear up or comment this reversal of x/y
						gameField[x + xi][y + yi - 1] = activePiece.piece[x][y];
					}
					//debug += gameField[y + xi][x + yi] + ", ";
				}
				//debug += "\n";
			}
		} else if (activePiece.orientation == 270) {
			for (y = activePiece.piece[0].length - 1; y >= 0; y--) {
				for (x = 0; x < activePiece.piece.length; x++) {
					if (activePiece.piece[x][y] > 0) {
						//TODO Clear up or comment this reversal of x/y
						gameField[x + xi][y + yi - 1] = activePiece.piece[x][y];
					}
					//debug += gameField[y + xi][x + yi] + ", ";
				}
				//debug += "\n";
			}
		}

		//debug += "\n\n";
		for (x = 0; x < gameField.length; x++) {
			for (y = 0; y < gameField[0].length; y++) {
				//debug += gameField[x][y] + ", ";
			}
			//debug += "\n";
		}

		//alert(debug);
		activePiece.y = -15;
		activePiece.x = 45;
		activePiece.orientation = 0;
		var rand = Math.ceil(Math.random() * 7) - 1;
		activePiece.piece = pieces[rand];
	}
}

//TODO Function to long. Make it shorter
function draw(activePiece) {
	var playAreaX = 300;
	var playAreaY = 300;
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");

	ctx.fillStyle = "rgb(255, 255, 255)";
	ctx.fillRect(0, 0, playAreaX, playAreaY);

	//Background stripes, mostly for debugging
	ctx.fillStyle = "rgba(127, 75, 0, 0.3)";
	ctx.fillRect(0, 0, 15, playAreaX);
	ctx.fillRect(30, 0, 15, playAreaX);
	ctx.fillRect(60, 0, 15, playAreaX);
	ctx.fillRect(90, 0, 15, playAreaX);
	ctx.fillRect(120, 0, 15, playAreaX);
	ctx.fillRect(150, 0, 15, playAreaX);

	var debug = "draw\n";

	ctx.fillStyle = "rgb(0, 255, 0)";
	for (x = 0; x < gameField.length; x++) {
		for (y = 0; y < gameField[0].length; y++) {
			debug += gameField[x][y] + ", ";
			if (gameField[x][y] > 0) {
				ctx.fillRect(x * 15 + 1, y * 15 + 1, 13, 13);
			}
		}
		debug += "\n";
	}

	ctx.fillStyle = "rgb(255, 0, 0)";

	//TODO To much repetition. Merge into a single function call
	if (activePiece.orientation == 0) {
		for (x = 0; x < activePiece.piece.length; x++) {
			for (y = 0; y < activePiece.piece[x].length; y++) {
				if (activePiece.piece[x][y] == 1) {
					ctx.fillRect(activePiece.x + 1, activePiece.y + 1, 13, 13);
				}
				activePiece.x += 15;
			}
			activePiece.x -= (activePiece.piece[0].length * 15);
			activePiece.y += 15;
		}
	} else if (activePiece.orientation == 90) {
		activePiece.y -= (activePiece.piece[0].length - activePiece.piece.length) * 15;
		for (y = activePiece.piece[0].length - 1; y >= 0; y--) {
			for (x = 0; x < activePiece.piece.length; x++) {
				//debug += "[" + x + "/" + y + ":" + activePiece.piece[x][y]  + "], ";
				if (activePiece.piece[x][y] == 1) {
					ctx.fillRect(activePiece.x + 1, activePiece.y + 1, 13, 13);
				}
				activePiece.x += 15;
			}
			//debug += ".";
			activePiece.x -= (activePiece.piece.length * 15);
			activePiece.y += 15;
		}
	} else if (activePiece.orientation == 180) {
		for (x = activePiece.piece.length - 1; x >= 0; x--) {
			for (y = 0; y < activePiece.piece[x].length; y++) {
				//debug += "[" + x + "/" + y + ":" + activePiece.piece[x][y]  + "], ";
				if (activePiece.piece[x][y] == 1) {
					ctx.fillRect(activePiece.x + 1, activePiece.y + 1, 13, 13);
				}
				activePiece.x += 15;
			}
			//debug += ".";
			activePiece.x -= (activePiece.piece[0].length * 15);
			activePiece.y += 15;
		}
	} else if (activePiece.orientation == 270) {
		for (y = 0; y < activePiece.piece[0].length; y++) {
			for (x = 0; x < activePiece.piece.length; x++) {
				//debug += "[" + x + "/" + y + ":" + activePiece.piece[x][y]  + "], ";
				if (activePiece.piece[x][y] == 1) {
					ctx.fillRect(activePiece.x + 1, activePiece.y + 1, 13, 13);
				}
				activePiece.x += 15;
			}
			//debug += ".";
			activePiece.x -= (activePiece.piece.length * 15);
			activePiece.y += 15;
		}
	}
	if (debug > "") {
		//alert(debug);
	}

	activePiece.y -= (activePiece.piece.length * 15);

	//TODO Remove ugly hack!
	if (
		(activePiece.type = 1 && activePiece.orientation == 270) ||
		(activePiece.type = 2 && activePiece.orientation == 270)) {
		activePiece.y -= 15;
	}
}

//"Class" to store a list of function callbacks the program uses for different keys. Also maps key-numbers to convenient names.
function Keyboard() {
	//Store a reference to "this" in a var. We need this because when the event function gets called by the browser, "this" will refer to the browser window.
	var self = this;

	//List of keys we hook
	this.up = 38;
	this.right = 39;
	this.left = 37;
	this.down = 40;

	//Arrays holding the hooked keys and their callbacks. TODO: replace with associative array
	this.keys = [];
	this.callbacks = [];

	//Register a new hook
	this.add = function(key, callback) {
		this.keys.push(key);
		this.callbacks.push(callback);
	}

	//We expect this to be called onkeydown
	this.event = function(e) {
		for (var i = 0; i < self.callbacks.length; i++) {
			if (e.keyCode == self.keys[i]) {
				self.callbacks[i]();
			}
		}
	}
}
