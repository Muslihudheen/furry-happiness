import React, { Component } from 'react';
import { View, Text, SafeAreaView, StyleSheet, StatusBar, TouchableOpacity, Alert , Button} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameState: 
      [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      currentPlayer: 1
    };

  }

  componentDidMount() {
    this.initializeGame();
  }

  initializeGame =() => {
    this.setState({ gameState: 
      [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      currentPlayer: 1
    });
  }

  getWinner = () => {
    const NUM_TILES = 3;
    var arr = this.state.gameState;
    var sum;

    for (var i=0; i< NUM_TILES; i++) {
      sum = arr[0][i] + arr[1][i] + arr[2][i];
      if (sum == 3) { return 1; }
      else if (sum == -3) { return -1; }
    }

    for (var i=0; i< NUM_TILES; i++) {
      sum = arr[i][0] + arr[i][1] + arr[i][2];
      if (sum == 3) { return 1; }
      else if (sum == -3) { return -1; }
    }

    sum = arr[0][0] + arr[1][1] +arr[2][2];
    if (sum == 3) { return 1; }
    else if (sum == -3) { return -1; }

    sum = arr[2][0] + arr[1][1] +arr[0][2];
    if (sum == 3) { return 1; }
    else if (sum == -3) { return -1; }

    return 0;
  }

  onTilePress =(row, col) => {
    var value = this.state.gameState[row][col];
    if(value != 0) { return; }

    var currentPlayer = this.state.currentPlayer;

    var arr = this.state.gameState.slice();
    arr[row][col] = currentPlayer;
    this.setState({gameState: arr});

    var nextPlayer = (currentPlayer == 1) ? -1 : 1 ;
    this.setState({ currentPlayer: nextPlayer });

    var winner = this.getWinner();
    if (winner == 1) {
      Alert.alert("Player 1 won");
      this.initializeGame();
    } else if ( winner == -1 ) {
      Alert.alert("Player 2 won");
      this.initializeGame();
    }
  }

  renderIcon = (row, col) => {
    var value = this.state.gameState[row][col];
    switch(value)
    {
      case 1: return <Icon name={'cross'} size={55} color={'#3e9bf7'} /> ;
      case -1: return <Icon name={'circle'} size={42} color={'#fab246'} />
      default: return <View />
    }
  }

  render() {
    const width = 100;
    const height = 100;
    return (
      <>
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content"  />
        <SafeAreaView style={{flex: 1, backgroundColor:'#f1f1f1', justifyContent: 'center'}}>
          <View style={styles.gameContainer}>
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <TouchableOpacity onPress={()=> this.onTilePress(0,0)} style={{ alignItems: 'center', justifyContent: 'center', borderColor: 'grey', borderRightWidth: 2, borderBottomWidth:2,width,height}} >
                {this.renderIcon(0,0)}
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> this.onTilePress(0,1)} style={{ alignItems: 'center', justifyContent: 'center', borderColor: 'grey', borderRightWidth: 2, borderBottomWidth:2,width,height}}>
                {this.renderIcon(0,1)}
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> this.onTilePress(0,2)} style={{ alignItems: 'center', justifyContent: 'center', borderColor: 'grey', borderBottomWidth:2, width,height}}>
                {this.renderIcon(0,2)}
              </TouchableOpacity>
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <TouchableOpacity onPress={()=> this.onTilePress(1,0)} style={{ alignItems: 'center', justifyContent: 'center', borderColor: 'grey', borderRightWidth: 2, borderBottomWidth:2,width,height}}>
                {this.renderIcon(1,0)}
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> this.onTilePress(1,1)} style={{ alignItems: 'center', justifyContent: 'center', borderColor: 'grey', borderRightWidth: 2, borderBottomWidth:2,width,height}}>
                {this.renderIcon(1,1)}
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> this.onTilePress(1,2)} style={{ alignItems: 'center', justifyContent: 'center', borderColor: 'grey', borderBottomWidth:2, width,height}}>
                {this.renderIcon(1,2)}
              </TouchableOpacity>
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <TouchableOpacity onPress={()=> this.onTilePress(2,0)} style={{ alignItems: 'center', justifyContent: 'center', borderColor: 'grey', borderRightWidth: 2, width,height}}>
                {this.renderIcon(2,0)}
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> this.onTilePress(2,1)} style={{ alignItems: 'center', justifyContent: 'center', borderColor: 'grey', borderRightWidth: 2, width,height}}>
                {this.renderIcon(2,1)}
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> this.onTilePress(2,2)} style={{ alignItems: 'center', justifyContent: 'center', borderColor: 'grey',  width,height}}>
                {this.renderIcon(2,2)}
              </TouchableOpacity>
            </View>
          </View>

          <View style={{paddingVertical: 60, marginHorizontal: 60}}>
            <Button title="New Game" onPress={this.initializeGame} />
          </View>
            
        </SafeAreaView>
      </>
    );
  }
}

const styles= StyleSheet.create({
  gameContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 16,
    borderColor: '#999999',
    elevation: 4,
    backgroundColor: 'white',
    overflow: 'hidden',
    marginHorizontal: 30
  }
});