import React, {useRef, useEffect} from 'react';

import {GRID_WIDTH} from '../../utils/constants';
import {theTetrominoes} from '../../utils/tetrominoes';

const fillGridSquares = (Square) => {
  let squares = [];
  for (let i = 0; i < 200; i++) {
    squares.push({Square, tetromino: false, taken: false});
  }
  for (let i = 0; i < GRID_WIDTH; i++) {
    squares.push({Square, tetromino: false, taken: true});
  }

  return [...squares];
};

const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

//draw the tetromino
const draw = ({current, squares, setSquares, currentPosition}) => {
  let newSquares = [...squares];

  current.forEach((index) => {
    newSquares[currentPosition + index].tetromino = true;
  });

  setSquares(newSquares);
};

//undraw all the tetrominoes
const undraw = ({squares, setSquares}) => {
  let newSquares = [...squares];

  newSquares.forEach((square) => {
    if (!square.taken) square.tetromino = false;
  });

  setSquares(newSquares);
};

//move down the Tetromino
const moveDown = ({
  current,
  squares,
  setSquares,
  currentPosition,
  setCurrentPosition,
  nextRandom,
}) => {
  undraw({squares, setSquares});

  setCurrentPosition(currentPosition + GRID_WIDTH);

  draw({current, squares, setSquares, currentPosition});
  freeze({
    current,
    squares,
    currentPosition,
    setCurrentPosition,
    nextRandom,
    setSquares,
  });
};

//freeze the tetromino
const freeze = ({
  current,
  squares,
  currentPosition,
  setCurrentPosition,
  nextRandom,
  setSquares,
}) => {
  if (
    current.some((index) => {
      return squares[currentPosition + index + GRID_WIDTH].taken;
    })
  ) {
    current.forEach((index) => (squares[currentPosition + index].taken = true));

    // start a new tetromino
    nextRandom = Math.floor(Math.random() * theTetrominoes.length);
    current = theTetrominoes[nextRandom][0];
    setCurrentPosition(3);

    // displayShape();
    draw({current, squares, setSquares, currentPosition});
    // addScore();
    // gameOver();
  }
};

//move left, unless is at edge
const moveLeft = ({
  squares,
  setSquares,
  current,
  currentPosition,
  setCurrentPosition,
}) => {
  undraw({squares, setSquares});

  const isAtLeftEdge = current.some(
    (index) => (currentPosition + index) % GRID_WIDTH === 0,
  );

  if (!isAtLeftEdge) setCurrentPosition(currentPosition - 1);

  if (current.some((index) => squares[currentPosition + index].taken)) {
    //back to original space
    setCurrentPosition(currentPosition + 1);
  }

  draw({current, squares, setSquares, currentPosition});
};

//move right, unless is at edge
const moveRight = ({
  squares,
  setSquares,
  current,
  currentPosition,
  setCurrentPosition,
}) => {
  undraw({squares, setSquares});

  const isAtLeftEdge = current.some(
    (index) => (currentPosition + index) % GRID_WIDTH === GRID_WIDTH - 1,
  );

  if (!isAtLeftEdge) setCurrentPosition(currentPosition + 1);

  if (current.some((index) => squares[currentPosition + index].taken)) {
    //back to original space
    setCurrentPosition(currentPosition - 1);
  }

  draw({current, squares, setSquares, currentPosition});
};

//choose another position to the tetromino
const rotate = ({
  currentRotation,
  positions,
  current,
  nextRandom,
  squares,
  setSquares,
  currentPosition,
}) => {
  undraw({squares, setSquares});

  currentRotation++;
  if (currentRotation === positions) currentRotation = 0;

  current = theTetrominoes[nextRandom][currentRotation];
  draw({current, squares, setSquares, currentPosition});
};

export {
  fillGridSquares,
  draw,
  undraw,
  moveDown,
  moveLeft,
  rotate,
  moveRight,
  useInterval,
};
