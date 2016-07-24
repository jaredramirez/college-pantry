import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ListView,
  TextInput,
  TouchableHighlight,
  Text,
  ActivityIndicator
} from 'react-native';

import IngredientList from './../ingredientList/index';

const styles = StyleSheet.create({
  container: {
    marginTop: 70,
    flex: 1,
  },
  searchButton: {
    height: 25,
    backgroundColor: '#7A8491',
    borderColor: '#7A8491',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 10,
    width: 60,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    alignSelf: 'center'
  },
  loading: {
    marginTop: 20,
  },
  appTitle: {
    marginBottom: 10,
    fontSize: 14,
    textAlign: 'center',
    color: '#656565'
  },
  dbTitle: {
    marginBottom: 10,
    fontSize: 10,
    textAlign: 'center',
    color: '#656565'
  },
});

export default class RecipeSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    }
  }
  goToResults() {
    // this.setState({isLoading: true});
    this.props.navigator.push({
      name: 'SearchResults',
      passProps: {
        ingredients: this.state.ingredients
      }
    })
  }
  render() {
    return (
      <View style={styles.container}>

        <IngredientList
          navigator={this.props.navigator}
          ingredients={this.props.ingredients}
          onChange={this.props.onChange}
        />

        <Text style={styles.appTitle}>
          College Pantry
        </Text>
        <Text style={styles.dbTitle}>
          Powered by Recipe DB
        </Text>
      </View>
    )
  }
}
