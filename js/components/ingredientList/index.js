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
  }
})

export default class IngredientList extends Component {
  constructor(props){
    super(props);
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([])
    }
  }
  componentDidMount() {
  	this.setState({
    	dataSource: this.state.dataSource.cloneWithRows(this.props.ingredients)
    })
  }
  render() {
    console.log('render', this.props.ingredients, this.state.dataSource.getRowCount());
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
    console.log('renderRow', rowData);
    return (
      <Text>{rowData.name}</Text>
    );
    /*
    <IngredientListItem
      value={this.state.ingredients[rowId]}
    />
    */
  }
}
