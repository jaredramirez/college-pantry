import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  ListView,
  TouchableOpacity,
  Text
} from 'react-native';

import Key from './../../../api';

getFood2ForkQuery = (ingredients) => {
  let query = 'http://food2fork.com/api/search?';
  query += 'key=' + Key + '&q=';
  for(ingredient of ingredients) {
    let tmp = ingredient.name.replace(/ /g,'%20');
    query += tmp + ',';
  }
  query = query.slice(0, -1);
  return query;
}

const styles = StyleSheet.create({
  container: {
    marginTop: 70,
    flex: 1,
  },
  errorMessage: {
    alignSelf: 'center',
    color: 'red'
  },
  loading: {
    marginTop: 20,
  },
  listView: {
    alignItems: 'center',
    marginRight: 5,
    marginLeft: 5,
  },
  row: {
    paddingTop: 20,
    paddingBottom: 20
  },
  rowText: {
    textAlign: 'center'
  }
});

export default class SearchResults extends Component {
  constructor(props){
    super(props);
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      isLoading: false,
      hasError: false,
      errorMessage: null,
      dataSource: ds
    }
  }
  componentDidMount() {
    this.getRecipesFromDBAsync();
  }
  render() {
    let spinner = (this.state.isLoading)?
      (<ActivityIndicator style={styles.loading} size="small" />) :
      (<View/>);

    let errorMessage = (this.state.hasError)?
      (<Text style={styles.errorMessage}>{this.state.errorMessage}</Text>) :
      (<View/>);

    return (
      <View style={styles.container}>
        {errorMessage}
        {spinner}
        <ListView
          dataSource = {this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          enableEmptySections={true}
          contentContainerStyle={styles.listView}
        />
      </View>
    )
  }
  renderRow(rowData, sectionId, rowId) {
    return (
      <TouchableOpacity style={styles.row}>
        <Text style={styles.rowText}> {rowData.title} </Text>
      </TouchableOpacity>
    )
  }
  async getRecipesFromDBAsync(){
    this.setState({isLoading: true});
    try{
      let query = getFood2ForkQuery(this.props.ingredients);
      const response = await fetch(query);
      const jsonData = await response.json();

      this.setState({
        isLoading: false,
        hasError: false,
        errorMessage: null,
        dataSource: this.state.dataSource.cloneWithRows(jsonData.recipes)
      })
    }
    catch(e){
      this.setState({
        isLoading: false,
        hasError: true,
        errorMessage: e.message,
        dataSource: this.state.dataSource.cloneWithRows([])
      })
    }
  }
}
