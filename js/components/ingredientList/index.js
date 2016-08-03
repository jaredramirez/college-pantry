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
  row: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10
  },
  separator: {
    height: 1,
    marginRight: 35,
    marginLeft: 35,
    alignSelf: 'stretch',
    backgroundColor: '#7A8491',
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
        renderRow={this._renderRow.bind(this)}
        renderSeparator={this._renderSeperator.bind(this)}
        contentContainerStyle={styles.listView}
      />
    )
  }
  _renderRow(rowData, sectionId, rowId) {
    return (
      <IngredientListItem
        style={styles.row}
        navigator={this.props.navigator}
        index={rowId}
        ingredients={this.props.ingredients}
        onChange={this.props.onChange}
      />
    );
  }
  _renderSeperator(sectionID, rowID, adjacentRowHighlighted) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={styles.separator}
      />
    );
  }
}
