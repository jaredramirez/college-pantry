import React, { Component } from 'react';
import {
  StyleSheet,
  Navigator,
  Text,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import SearchRecipe from './components/searchRecipe/index';
import AddIngrdient from './components/addIngrdient/index';
import SearchResults from './components/searchResults/index';
import Recipe from './components/recipe/index';

const routeMap = {
  searchRecipe: { component: SearchRecipe, type: 'page'},
  addIngrdient: { component: AddIngrdient, type: 'modal'},
  searchResults: { component: SearchResults, type: 'page'},
  recipe: { component: Recipe, type: 'page'},
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbar: {
    backgroundColor: '#7A8491',
    borderBottomColor: '#EAEBEB',
    borderBottomWidth: 2
  },
  title: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
    marginVertical: 9,
  },
  back: {
    marginLeft: 10,
    marginRight: 0,
    backgroundColor: 'transparent',
  },
});

const NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    if(index > 0) {
      return (
      <Icon.Button
          name="ios-arrow-back"
          size={25}
          iconStyle={styles.back}
          backgroundColor="transparent"
          onPress={
            () => {
              if (index > 0) { navigator.pop() }
            }
          }
        />
      )
    }
    else {
      return null
    }
  },
  RightButton(route, navigator, index, navState) {
    if(routeMap[route.name].component.name === 'RecipeSearch') {
      return (
          <Icon.Button
            name="ios-add"
            size={25}
            backgroundColor="transparent"
            onPress={
              () => navigator.push({name: 'addIngrdient'})
            }>
          </Icon.Button>
            )
    } else {
      return null;
    }
  },
  Title(route, navigator, index, navState) {
    let name;
    if(route.recipeTitle) {
      name = route.recipeTitle;
    } else {
      name = routeMap[route.name].component.name.replace(/([A-Z])/g, ' $1').trim();
    }
    return <Text style={styles.title}>{name}</Text>
  }
};

class CollegePantryReact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: [{name: 'tomato'}]
    }
  }
  onIngedientChange = (ingredients) => {
    this.setState({ ingredients: ingredients });
  }
  render() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{name: 'searchRecipe'}}
        renderScene={this.renderScene.bind(this)}
        configureScene={this.configureScene.bind(this)}
        navigationBar={
          <Navigator.NavigationBar
            style={styles.navbar}
            routeMapper={ NavigationBarRouteMapper }
          />
        }
      />
    );
  }
  renderScene(route, navigator) {
    const RouteComponent = routeMap[route.name].component;

    return <RouteComponent navigator={navigator} {...route.props} {...route.passProps}
            ingredients={this.state.ingredients}
            onChange={this.onIngedientChange}
          />;
  }
  configureScene(route, routeStack){
    if(routeMap[route.name].type === 'modal') {
      return Navigator.SceneConfigs.FloatFromBottom;
    } else {
      return Navigator.SceneConfigs.FloatFromRight;
    }
  }
}

export default CollegePantryReact;
