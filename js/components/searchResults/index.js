import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  ListView,
  Text,
  ActivityIndicator
} from 'react-native';

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
    marginTop: 70
  },
  listView: {
    flex: 1,
    alignItems: 'center',
    marginRight: 5,
    marginLeft: 5,
  },
  errorMessage: {
    color: 'red'
  },
  loading: {
    marginTop: 20,
  },
});

export default class SearchResults extends Component {
  constructor(props){
    super(props);
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      isLoading: false,
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

    let errorMessage = (this.state.errorMessage)?
      (<Text style={styles.errorMessage}>{this.state.errorMessage}</Text>) :
      (<View/>);

    return (
      <View style={styles.container}>
        <ScrollView>
          <ListView
            dataSource = {this.state.dataSource}
            renderRow={this.renderRow.bind(this)}
            enableEmptySections={true}
            contentContainerStyle={styles.listView}
          />
          {spinner}
        </ScrollView>
      </View>
    )
  }
  renderRow(rowData, sectionId, rowId) {
    console.log('rowData', rowData);
    return (
      <Text> {rowData.title} </Text>
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
        errorMessage: null,
        dataSource: this.state.dataSource.cloneWithRows(jsonData.recipes)
      })
    }
    catch(e){
      this.setState({
        isLoading: false,
        errorMessage: e,
        dataSource: this.state.dataSource.cloneWithRows([])
      })
    }
  }
}
