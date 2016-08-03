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

import IngredientList from './../ingredientList/index';

const styles = StyleSheet.create({
  container: {
    marginTop: 65,
    flex: 1,
  },
  defaultText: {
    marginTop: 20,
    fontSize: 14,
    textAlign: 'center',
    color: '#656565'
  },
  searchWrapper: {
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    alignSelf: 'center',
    color: 'red',
    marginTop: 10
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
      hasError: false,
      errorMessage: null
    }
  }
  render() {
    let listView = (this.props.ingredients.length > 0)?
      (<IngredientList
        navigator={this.props.navigator}
        ingredients={this.props.ingredients}
        onChange={this.props.onChange}
      />) :
      (<Text style={styles.defaultText}> Click the '+' to add an ingrdient! </Text>);

    let submit = (this.props.ingredients.length > 0)?
      (<View style={styles.searchWrapper}>
        <Icon.Button
          name="ios-search"
          borderRadius={15}
          backgroundColor="#7A8491"
          onPress={this._goToResults.bind(this)}>
        Search
        </Icon.Button>
      </View>) :
      (<View />);

    let error = this.state.hasError?
      (<Text style={styles.errorText}>{this.state.errorMessage}</Text>) :
      (<View />);

    return (
      <View style={styles.container}>

        <ScrollView>
          {listView}
          {submit}
          {error}
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
  _goToResults() {
    if(this.props.ingredients.length > 0) {
      this.props.navigator.push({
        name: 'SearchResults',
        passProps: {
          ingredients: this.props.ingredients
        }
      })
    } else {
      this.setState({
        hasError: true,
        errorMessage: 'Cannot search without ingredients!'
      })
    }
  }
}
