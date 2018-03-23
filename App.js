/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import InputButton from './InputButton'

const inputButtons = [
    ['C','CE'],
    [1,2,3,'/'],
    [4,5,6,'*'],
    [7,8,9,'-'],
    [0,'.','=','+']
  ];

type Props = {};
export default class App extends Component<Props> {
  
  constructor(props){
    super(props);
    this.state = {
      inputValue: 0,
      previousInputValue: 0,
      selectedSymbol: null,
      point:false
    }
  }

  _renderButton(){
    let view = [];

    for (var j = 0; j <= inputButtons.length - 1; j++) {
      let row = inputButtons[j]

      let inputRow = []
      for (var i = 0; i <= row.length - 1; i++) {
        let input = row[i]
        inputRow.push(<InputButton highlight = {this.state.selectedSymbol === input} onPress = {this.onPressHandler.bind(this, input)} value= {input} key={j+'-'+i}/>)
      }
      view.push(<View style={styles.inputRow} key={'row-'+j}>{inputRow}</View>);
    }
    return view;
  }

  onPressHandler(input){
    switch (typeof input) {
      case'number':
        this._handleNumberInput(input);
        break;

      case 'string' :
        this._handleStringInput(input);
        break;
    }    
  }

  _handleNumberInput(num){
    if(this.state.point){
      let inputValuepo = (this.state.inputValue) + ''+ num;
      this.setState({
        inputValue:inputValuepo,
      })  
    }else{
      let inputValue = (this.state.inputValue * 10) + num;
      this.setState({
        inputValue:inputValue      
      })
    }
  }

  _handleStringInput(str){
    switch(str){
      case '+':
      case '-':
      case '/':
      case '*':
        let symbol1 = this.state.selectedSymbol;

        if (!symbol1) {           
          this.setState({
            previousInputValue:this.state.inputValue,
            inputValue: 0,
            selectedSymbol: str,
            point:false
          })
        }else{
          this.setState({
            selectedSymbol: str
          })
        }
        break;

      case'=':
       let symbol = this.state.selectedSymbol,
            inputValue = this.state.inputValue,
            previousInputValue = this.state.previousInputValue;

        if (!symbol) {
            return;
        }

        let ans = eval(previousInputValue + symbol + inputValue);
        this.setState({
            previousInputValue: 0,
            inputValue: ans,
            selectedSymbol: null,
        });

        if (Math.floor(ans) === ans) {
          this.setState({point: false})
        }else{
          this.setState({point:true})
        }

        break;

      case '.':
        if (!this.state.point) {
          let inputValuep = (this.state.inputValue)+'.';
          this.setState({
            inputValue:inputValuep,
            point:true
          })       
        }
        break;

      case 'C':
        let inputValuec = (this.state.inputValue);
        if(inputValuec != 0){
          newValue = inputValuec.toString().substr(0, (inputValuec.toString().length) -1 )
          clearedValue = inputValuec.toString().substr((inputValuec.toString().length) -1, (inputValuec.toString().length))
          if (clearedValue == '.') {
            this.setState({
              inputValue:newValue,
              point:false
            })
          }else{
            this.setState({
              inputValue:newValue,
            })
          }
          
        }
        break;

      case 'CE':
         if(inputValuec != 0){          
          this.setState({
            inputValue:0,
            point:false
          })          
        }
        break;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topView}><Text style={styles.inputButtonText}>{this.state.inputValue}</Text></View>
        <View style={styles.bottomView}>{this._renderButton()}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,  
    backgroundColor: '#F5FCFF',
  },
  topView: {
    flex: 2,
    backgroundColor: '#193441',    
  },
  bottomView: {
    flex: 8,
    flexDirection: 'column',
    backgroundColor:'#3E606F',
  },
  inputRow:{
    flex:1,
    flexDirection:'row',
  },
  inputButtonText: {
        fontSize: 38,
        fontWeight: 'bold',
        textAlign: 'right',
        padding: 20,
        color: 'white'
    }
});