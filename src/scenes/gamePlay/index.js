import React, {useState, useEffect} from 'react';
import {Text, TouchableOpacity} from 'react-native';

import {theTetrominoes} from '../../utils/tetrominoes';

import {Body, Container, Grid, Square} from './styles';
import {
  fillGridSquares,
  draw,
  undraw,
  moveDown,
  moveRight,
  rotate,
  useInterval,
  moveLeft,
} from './controller';

const GamePlay = () => {
  const [stop, setStop] = useState(true);
  const [squares, setSquares] = useState(fillGridSquares(Square));
  const [currentPosition, setCurrentPosition] = useState(3);
  // const [current, setCurrent] = useState([]);
  // const [nextRandom, setNextRandom] = useState(0);

  var currentRotation = 0;
  var nextRandom = 0;
  var current = theTetrominoes[nextRandom][currentRotation];
  //Math.floor(Math.random() * theTetrominoes.length)

  const handleStartStop = () => {
    setStop(!stop);
  };

  const handleMoveLeft = () => {
    moveLeft({
      squares,
      setSquares,
      current,
      currentPosition,
      setCurrentPosition,
    });
  };

  const handleMoveRight = () => {
    moveRight({
      squares,
      setSquares,
      current,
      currentPosition,
      setCurrentPosition,
    });
  };

  const handleRotate = () => {
    const positions = 3;
    rotate({
      currentRotation,
      positions,
      current,
      nextRandom,
      squares,
      setSquares,
      currentPosition,
    });
  };

  useInterval(() => {
    if (!stop) {
      moveDown({
        current,
        squares,
        setSquares,
        currentPosition,
        setCurrentPosition,
      });
    } else {
      undraw({squares, setSquares});
    }
  }, 1000);

  return (
    <Body>
      <TouchableOpacity onPress={() => handleStartStop()} style={{margin: 20}}>
        <Text>Start/Stop</Text>
      </TouchableOpacity>
      <Container>
        <Grid>
          {squares.map(({Square, tetromino, taken}) => (
            <Square tetromino={tetromino} taken={taken} />
          ))}
        </Grid>
      </Container>
      <TouchableOpacity onPress={() => handleMoveLeft()} style={{margin: 20}}>
        <Text>Left</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleMoveRight()} style={{margin: 20}}>
        <Text>Right</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleRotate()} style={{margin: 20}}>
        <Text>Rotate</Text>
      </TouchableOpacity>
    </Body>
  );
};

export default GamePlay;
