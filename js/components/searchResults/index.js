import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

const styles = StyleSheet.create({

});

export default class SearchResults extends Component {
  constructor(props){
    super(props);
    this.state = {
      ingredients: props.ingredients
    }
    console.log(this.state.ingredients);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text> Results </Text>
      </View>
    )
  }
}
