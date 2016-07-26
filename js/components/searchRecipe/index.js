import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  ListView,
  Text,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Key from './../../../api';
import IngredientList from './../ingredientList/index';

const styles = StyleSheet.create({
  container: {
    marginTop: 70,
    flex: 1,
  },
  noIngrdientsText: {
    marginTop: 20,
    fontSize: 14,
    textAlign: 'center',
    color: '#656565'
  },
  searchWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
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
      isLoading: false,
      recipies: []
    }
  }
  render() {
    let listView = (this.props.ingredients.length > 0)?
      (<IngredientList
        navigator={this.props.navigator}
        ingredients={this.props.ingredients}
        onChange={this.props.onChange}
      />) :
      (<Text style={styles.noIngrdientsText}> Click the '+' to add an ingrdient! </Text>);

    return (
      <View style={styles.container}>

        <ScrollView>
          {listView}
          <View style={styles.searchWrapper}>
            <Icon.Button
              name="ios-search"
              borderRadius={15}
              backgroundColor="#7A8491"
              onPress={this.goToResults.bind(this)}>
            Search
            </Icon.Button>
          </View>
        </ScrollView>

        <Text style={styles.appTitle}>
          College Pantry
        </Text>
        <Text style={styles.dbTitle}>
          Powered by Food2Fork
        </Text>
      </View>
    )
  }
  goToResults() {
    this.props.navigator.push({
      name: 'SearchResults',
      passProps: {
        ingredients: this.props.ingredients
      }
    })
  }
}
