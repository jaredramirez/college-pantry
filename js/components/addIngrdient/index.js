import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 70,
  },
  textInputWrapper: {
    alignItems: 'stretch',
    flex: 1
  },
  textInput: {
    height: 36,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#7A8491',
    borderRadius: 8,
    marginLeft: 30,
    marginRight: 30,
    textAlign: 'center',
  },
  buttonWrapper: {
    alignItems: 'center',
    flex: 9
  },
  create: {
    height: 25,
    width: 60,
    backgroundColor: '#7A8491',
    borderColor: '#EAEBEB',
    borderWidth: 1,
    borderRadius: 8,
  },
  createText: {
    fontSize: 16,
    color: 'white',
    alignSelf: 'center'
  },
  errorText: {
    color: 'red',
    marginTop: 10
  }
});

convertStringToNumber = (string) => {
  if(string === null || string === undefined || typeof string !== 'string') { return; }
  return parseInt(string, 10);
}

isValidIngredientProps = (name, quantity) => {
  if(name === null || name === undefined || quantity === null || quantity === undefined || isNaN(quantity)) { return false; }
  if(typeof name !== 'string' || typeof quantity !== 'number') { return false; }
  if(name.length < 0 || name.length > 20 || quantity <= 0) { return false; }
  return true;
}

export default class AddIngrdient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      quantity: null,
      update: false,
      hasError: false,
      errorMessage: null
    }
  }
  componentDidMount() {
    let name = null, quantity = null, update = false;
    if(typeof this.props.ingredientName !== typeof undefined) {
      name = this.props.ingredientName;
    };
    if(typeof this.props.ingredientQuantity !== typeof undefined) {
      quantity = this.props.ingredientQuantity.toString();
    };
    if(typeof this.props.update !== typeof undefined ) {
      update = this.props.update
    };

    this.setState({
      name: name,
      quantity: quantity,
      update: update
    });
  }
  render() {
    const errorMessage = (this.state.hasError)?
      (<Text style={styles.errorText}>{this.state.errorMessage}</Text>) :
      (<View/>)
    return (
      <View style={styles.container}>
        <View style={styles.textInputWrapper}>
          <TextInput
            style={styles.textInput}
            value={this.state.name}
            onChangeText={(text) => this.setState({name: text})}
            placeholder='Ingredient Name'
          />
        </View>
        <View style={styles.textInputWrapper}>
          <TextInput
            style={styles.textInput}
            value={this.state.quantity}
            onChangeText={(text) => this.setState({quantity: text})}
            placeholder='Ingredient Quantity'
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Icon.Button
            name="ios-add-circle-outline"
            borderRadius={15}
            backgroundColor="#7A8491"
            onPress={this.onPress.bind(this)}>
             {this.state.update ? 'Update' : 'Add'}
          </Icon.Button>
          {errorMessage}
        </View>
      </View>
    );
  }
  onPress() {
    let quantityNum = convertStringToNumber(this.state.quantity);
    if(isValidIngredientProps(this.state.name, quantityNum)) {
      if(this.state.update){
        this._updateIngrdient(quantityNum);
      } else {
        this._addIngrdient(quantityNum);
      }
    } else {
      this.setState({
        hasError: true,
        errorMessage: 'Invalid props'
      })
      return;
    }
  }
  _addIngrdient(quantityNum) {
    let newIngredients = [];
    newIngredients = this.props.ingredients.slice();
    newIngredients.push({name: this.state.name, quantity: quantityNum});
    this.props.onChange(newIngredients);
    this.props.navigator.replacePreviousAndPop({ name: 'SearchRecipe', type: 'page' });
  }
  _updateIngrdient(quantityNum) {
    let newIngredients = [];
    newIngredients = this.props.ingredients.slice();
    newIngredients[this.props.ingredientIndex].name = this.state.name;
    newIngredients[this.props.ingredientIndex].quantity = quantityNum;
    this.props.onChange(newIngredients);
    this.props.navigator.replacePreviousAndPop({ name: 'SearchRecipe', type: 'page' });
  }
}
