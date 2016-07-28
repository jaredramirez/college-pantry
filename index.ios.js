import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  Text,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import SearchRecipe from './js/components/searchRecipe/index';
import AddIngrdient from './js/components/addIngrdient/index';
import SearchResults from './js/components/searchResults/index';
import Recipie from './js/components/recipie/index';

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
    if(route.name !== undefined && route.name === 'SearchRecipe') {
      return (
          <Icon.Button
            name="ios-add"
            size={25}
            backgroundColor="transparent"
            onPress={
              () => navigator.push({
              name: 'AddIngrdient',
              type: 'modal'
            })}>
          </Icon.Button>
            )
    } else {
      return null;
    }
  },
  Title(route, navigator, index, navState) {
    return <Text style={styles.title}>{route.name}</Text>
  }
};

class collegePantryReact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: [{name: 'Tomato', quantity: 1}, {name: 'Bell Pepper', quantity: 3}],
      recipes: []
    }
  }
  onIngedientChange = (ingredients) => {
    this.setState({ ingredients: ingredients });
  }
  render() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{
          name: 'SearchRecipe',
          type: 'page'
        }}
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
    if(route.name == 'SearchRecipe') {
      return <SearchRecipe navigator={navigator} {...route.props} {...route.passProps}
              ingredients={this.state.ingredients}
              onChange={this.onIngedientChange}
            />
    }
    if(route.name == 'AddIngrdient') {
      return <AddIngrdient navigator={navigator} {...route.props} {...route.passProps}
              ingredients={this.state.ingredients}
              onChange={this.onIngedientChange}
            />
    }
    if(route.name == 'SearchResults') {
      return <SearchResults navigator={navigator} {...route.props} {...route.passProps}/>
    }
    if(route.name == 'Recipie') {
      return <Recipie navigator={navigator} {...route.props} {...route.passProps}/>
    }
  }
  configureScene(route, routeStack){
    if(route.type === 'modal') {
      return Navigator.SceneConfigs.FloatFromBottom
    } else {
      return Navigator.SceneConfigs.FloatFromRight
    }
  }
}

AppRegistry.registerComponent('collegePantryReact', () => collegePantryReact);
