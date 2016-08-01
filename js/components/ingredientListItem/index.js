import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  ingredient: {
    flexDirection: 'row',
    justifyContent:'center',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,

    backgroundColor: '#ADB6BB',
    borderColor: '#ADB6BB',
    borderRadius: 6,
    borderWidth: 2
  },
  ingredientText: {
    flex:1,
    padding: 4,
    textAlign: 'center',
    alignSelf: 'center',
    color: 'white',
  },
  ingredientButton: {
    flex: 1,
    alignSelf: 'stretch',
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
  deleteIngredient() {
    let newIngredients = [];
    newIngredients = this.props.ingredients.slice();
    newIngredients.splice(this.props.index, 1);
    this.props.onChange(newIngredients);
    this.props.navigator.replace({ name: 'SearchRecipe', type: 'page' })
  }
  modifyIngredient() {
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
  render() {
    return (
      <View style={styles.ingredient}>
        <Text style={styles.ingredientText}>{this.state.ingredient.name}</Text>
        <Icon.Button
          name="ios-create-outline"
          iconStyle={styles.ingredientButton}
          backgroundColor="green"
          onPress={this.modifyIngredient.bind(this)}
        />
        <Icon.Button
          name="ios-trash-outline"
          iconStyle={styles.ingredientButton}
          backgroundColor="red"
          onPress={this.deleteIngredient.bind(this)}
        />
      </View>
    );
  }
}
