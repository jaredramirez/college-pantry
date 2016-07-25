import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ListView,
  TouchableHighlight,
  Text
} from 'react-native';

import IngredientListItem from './../ingredientListItem/index';

const styles = StyleSheet.create({
  listView: {
    flex: 1,
    alignItems: 'center',
    marginRight: 5,
    marginLeft: 5,
  },
})

export default class IngredientList extends Component {
  constructor(props){
    super(props);
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(this.props.ingredients)
    }
  }
  render() {
    return (
      <ListView
        dataSource = {this.state.dataSource}
        enableEmptySections={true}
        renderRow={this.renderRow.bind(this)}
        contentContainerStyle={styles.listView}
      />
    )
  }
  renderRow(rowData, sectionId, rowId) {
    return (
      <IngredientListItem
        navigator={this.props.navigator}
        index={rowId}
        ingredients={this.props.ingredients}
        onChange={this.props.onChange}
      />
    );
  }
}
