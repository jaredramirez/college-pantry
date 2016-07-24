import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ListView,
  TextInput
} from 'react-native';

const styles = StyleSheet.create({
  searchInput: {
    height: 36,
    fontSize: 18,
    color: '#7A8491',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#7A8491',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 5,
  },
});

export default class IngredientListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  onSearchTextChanged(text){
    this.setState({value: text});
  }
  render() {
    return (
      <Text>this.props.value</Text>
    );
  }
}
