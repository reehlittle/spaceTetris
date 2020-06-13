import React from 'react';
import {View, Button, Text} from 'react-native';

// import { Container } from './styles';

const dashboard = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Space Tetris</Text>
      <Button
        title="Start New Game"
        onPress={() => navigation.navigate('Game')}
      />
    </View>
  );
};

export default dashboard;
