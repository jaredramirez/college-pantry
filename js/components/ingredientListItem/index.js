import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent:'center',
    backgroundColor: '#ADB6BB',
    borderColor: '#ADB6BB',
    borderRadius: 6,
    borderWidth: 2
  },
  texts: {
    flex: 3,
    justifyContent:'center',
  },
  text: {
    padding: 4,
    textAlign: 'center',
    alignSelf: 'center',
    color: 'white',
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  button: {
    backgroundColor: 'transparent',
    marginLeft: 0,
    marginRight: 0,
  }
});

export default class IngredientListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredient: this.props.ingredients[this.props.index]
    }
  }
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.texts}>
          <Text style={styles.text}>{this.state.ingredient.name}</Text>
        </View>
        <View style={styles.buttons}>
          <Icon.Button
            name="ios-create-outline"
            iconStyle={styles.button}
            backgroundColor="transparent"
            onPress={this._modifyIngredient.bind(this)}
          />
          <Icon.Button
            name="ios-trash-outline"
            iconStyle={styles.button}
            backgroundColor="transparent"
            onPress={this._deleteIngredient.bind(this)}
          />
        </View>
      </View>
    );
  }
  _deleteIngredient() {
    let newIngredients = [];
    newIngredients = this.props.ingredients.slice();
    newIngredients.splice(this.props.index, 1);
    this.props.onChange(newIngredients);
    this.props.navigator.replace({ name: 'SearchRecipe', type: 'page' })
  }
  _modifyIngredient() {
    this.props.navigator.push({
      name: 'AddIngrdient',
      type: 'modal',
      passProps: {
        ingredientIndex: this.props.index,
        ingredientName: this.state.ingredient.name,
        update: true
      }
    })
  }
}
