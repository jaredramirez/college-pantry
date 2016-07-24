import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  Text,
  TouchableHighlight
} from 'react-native';

import IngredientSearchPage from './js/components/searchPage/index';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbar: {
    backgroundColor: '#EFF0F0',
    borderBottomColor: '#EAEBEB',
    borderBottomWidth: 2
  },
  navbarTitle: {
    fontWeight: '500',
    fontSize: 16,
    marginVertical: 9,
  },
  navbarLeftButton: {
    fontWeight: '400',
    fontSize: 14,
    marginVertical: 10,
    marginLeft: 10,
  }
});

const NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    if(index > 0) {
      return (
        <TouchableHighlight
          underlayColor="transparent"
          onPress={
            () => {
              if (index > 0) { navigator.pop() }
            }
          }>
          <Text style={styles.navbarLeftButton}>Back</Text>
        </TouchableHighlight>
      )
    }
    else {
      return null
    }
  },
  RightButton(route, navigator, index, navState) {
    return null;
  },
  Title(route, navigator, index, navState) {
    return <Text style={styles.navbarTitle}>{route.title}</Text>
  }
};

class collegePantryReact extends Component {
  render() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{
          title: 'Ingredient Search',
          component: IngredientSearchPage
        }}
        renderScene={ this.renderScene }
        configureScene={this.configureScene}
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
    let RouteComponent = route.component
    return <RouteComponent navigator={navigator} {...route.passProps}/>
  }
  configureScene(route, routeStack) {
    return Navigator.SceneConfigs.PushFromRight;
  }
}

AppRegistry.registerComponent('collegePantryReact', () => collegePantryReact);
