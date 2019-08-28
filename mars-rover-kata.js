// Rover
// ======================
const rover = { 
  direction:"N",
  x:0,
  y:0,
  travelLog:[{x:0,y:0}]
};
// ======================

// Grid
// ======================
let grid = [ 
  ['-','-','-','-','-','-','-','-','-','-','-','-'],
  ['|',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','|'],
  ['|',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','|'],
  ['|',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','|'],
  ['|',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','|'],
  ['|',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','|'],
  ['|',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','|'],
  ['|',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','|'],
  ['|',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','|'],
  ['|',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','|'],
  ['|',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','|'],
  ['-','-','-','-','-','-','-','-','-','-','-','-'] ];

function erazeLastGridPosition(theRover){
  if(theRover.travelLog.length > 1){
    grid[theRover.travelLog.slice(-2)[0].y+1][theRover.travelLog.slice(-2)[0].x+1] = " ";
  }
}

function addNewGridPosition(theRover,directionSymbol){
  grid[theRover.y+1][theRover.x+1] = directionSymbol;
}

function updateGrid(theRover){
  erazeLastGridPosition(theRover);
  switch(theRover.direction){
    case "N":
        addNewGridPosition(theRover,"↑");
      break;
    case "S":
        addNewGridPosition(theRover,"↓");
      break;
    case "E":
        addNewGridPosition(theRover,"→");
      break;
    case "W":
        addNewGridPosition(theRover,"←");
      break;      
  }
  communicate(grid.join('\n') + '\n\n');
}

// ======================

// Moving order functions
// ======================
function turnLeft(theRover,chronologicalOrder){
  communicateCommand("turnLeft",chronologicalOrder);
  let initialDirection = theRover.direction;
  switch(initialDirection){
    case "N": // facing north
      theRover.direction = "W";
      break;
    case "S": // facing south
      theRover.direction = "E";
      break;
    case "E": // facing east
      theRover.direction = "N";
      break;
    case "W": // facing west
      theRover.direction = "S";
      break;
  } 
  communicatePositionAndDirection(theRover);     
};

function turnRight(theRover,chronologicalOrder){
  let initialDirection = theRover.direction;
  communicateCommand("turnRight",chronologicalOrder);
  switch(initialDirection){
    case "N": // facing north
      theRover.direction = "E";
      break;
    case "S": // facing south
      theRover.direction = "W";
      break;
    case "E": // facing east
      theRover.direction = "S";
      break;
    case "W": // facing west
      theRover.direction = "N";
      break;
  }
  communicatePositionAndDirection(theRover);     
};

function moveForward(theRover,chronologicalOrder){
  let roverDirection = theRover.direction;
  communicateCommand("moveForward",chronologicalOrder);
  if(theRover.x,theRover.y >= 0 && theRover.x,theRover.y < 9) {
    switch(roverDirection){
      case "N": // moving forward to the north
        if (theRover.y > 0) {
          rover.y--;
          communicatePositionAndDirection(theRover);
        } else {
          communicateError(theRover,"forward");
        }
        break;
      case "S": // moving forward to the outh
        if (theRover.y < 9) {
          theRover.y++;
          communicatePositionAndDirection(theRover);
        } else {
          communicateError(theRover,"forward");
        }
        break;
      case "E": // moving forward to the east
        if (theRover.x < 9) {
          theRover.x++;
          communicatePositionAndDirection(theRover);
        } else {
          communicateError(theRover,"forward");
        }
        break;
      case "W": // moving forward to the west
        if (theRover.x > 0) {
          theRover.x--;
          communicatePositionAndDirection(theRover);
        } else {
          communicateError(theRover,"forward");
        }
        break;
    }
  } else {
    communicateError(theRover,"forward");
  }
};

function moveBackward(theRover,chronologicalOrder){
  let roverDirection = theRover.direction;
  communicateCommand("moveBackward",chronologicalOrder);
  if(theRover.x,theRover.y >= 0 && theRover.x,theRover.y < 9) {
    switch(roverDirection){
      case "N": // moving backward to the south
        if (theRover.y < 9) {
          rover.y++;
          communicatePositionAndDirection(theRover);
        } else {
          communicateError(theRover,"backward");
        }
        break;
      case "S": // moving backward to the north
        if (theRover.y > 0) {
          theRover.y--;
          communicatePositionAndDirection(theRover);
        } else {
          communicateError(theRover,"backward");
        }
        break;
      case "E": // moving backward to the west
        if (theRover.x > 0) {
          theRover.x--;
          communicatePositionAndDirection(theRover);
        } else {
          communicateError(theRover,"backward");
        }
        break;
      case "W": // moving backward to the east
        if (theRover.x < 9) {
          theRover.x++;
          communicatePositionAndDirection(theRover);
        } else {
          communicateError(theRover,"backward");
        }
        break;
    }
  } else {
    communicateError(theRover,"backward");
  }
};
// ======================


// Communication & status functions
// ======================
function communicate(message){
  console.log(message)
};

function communicateCommand(command,commandChronologicalOrder){
  communicate(`----------- Command ${commandChronologicalOrder}: ${command} -----------`)
};

function communicatePositionAndDirection(theRover){
  communicate(`Updated position: [${theRover.x};${theRover.y}] // Updated direction: ${theRover.direction}`)
};

function communicateError(theRover,direction){
  if(direction === "forward" || direction === "backward"){
    communicate(`ALERT: the rover can not exit the grid, moving ${direction} is not authorized in that position`);
    communicatePositionAndDirection(theRover);
  }
};
// ======================

// Misc
// ======================
function addToTravelLog(theRover){
  let newPosition = {x: theRover.x, y: theRover.y};
  theRover.travelLog.push(newPosition);
};

function areOnlyValidatedInputs(userInputs){
  let validatedInputs = ["f","b","r","f"];
  let regexToGetUnvalitedInputs = /[^fbrl]+/g;
  let regexToGetValitedInputs = /[fbrl]+/g;
  
  if(regexToGetUnvalitedInputs.test(userInputs)) {
    communicate(`ALERT:
Commands transmitted: "${userInputs}"
Commands unknown: "${userInputs.replace(regexToGetValitedInputs, '')}"
Please only use validated commands: "${validatedInputs}"
Rover waiting for new commands`);
    return false;
  } else {
    communicate(`Commands OK: "${userInputs}" will be proceed`);
    return true;
  }
};
// ======================


// Multiple commands interpretation
// ======================
function command(theRover,theCommands){
  if(areOnlyValidatedInputs(theCommands)){
    for(let i = 0; i < theCommands.length; i++) {
      let theCommand = theCommands[i];
      let chronologicalOrder = i+1;
      switch(theCommand){
        case "l": // order left
          turnLeft(theRover,chronologicalOrder);
          break;
        case "r": // order right
          turnRight(theRover,chronologicalOrder);
          break;
        case "f": // order forward
          moveForward(theRover,chronologicalOrder);
          addToTravelLog(theRover);
          break;
        case "b": // order forward
          moveBackward(theRover,chronologicalOrder);
          addToTravelLog(theRover);
          break;
      }
      updateGrid(theRover);
    }
    communicate(`----------- Travel log -----------`);
    communicate(theRover.travelLog);
  }
};
// ======================

// Initializing the game
// ======================
console.clear();
communicatePositionAndDirection(rover);
updateGrid(rover);
communicate(`-------- Rover waiting for commands --------`);
// ======================

// Let's play! Commands!
// Commands : f,b,r,f
// ======================
command(rover, "rfffrfflfff");