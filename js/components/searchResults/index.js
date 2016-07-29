import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  ListView,
  Image,
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
    marginTop: 60,
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
    paddingRight: 50,
    paddingLeft: 50,
  },
  separator: {
    height: 1,
    alignSelf: 'stretch',
    backgroundColor: '#7A8491',
  },
  row: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  rowThumb: {
    width: 48,
    height: 48,
    borderRadius: 4,
    marginRight: 10,
  },
  textWrap: {
    flexDirection: 'column',
    flex: 0.8
  },
  rowText: {
    textAlign: 'center',
    flexWrap: 'wrap',
  }
});

cleanString = (text) => {
   let n = text.search('&#8217;');
   if(n === -1) {
     return text;
   } else {
     return text.replace(text.substring(n, n+7), '\'');
   }
}

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
  _goToRecipie(recipie) {
    this.props.navigator.push({
      name: 'Recipie',
      passProps: {
        recipie: recipie
      }
    })
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
          renderRow={this._renderRow.bind(this)}
          renderSeparator={this._renderSeperator.bind(this)}
          enableEmptySections={true}
          contentContainerStyle={styles.listView}
        />
      </View>
    )
  }
  _renderRow(rowData, sectionId, rowId, highlightRow) {
    let cleanTitle = cleanString(rowData.title);
    return (
      <TouchableOpacity style={styles.row} onPress={this._goToRecipie.bind(this, rowData)}>
        <Image style={styles.rowThumb} source={{uri: rowData.image_url}} />
        <View style={styles.textWrap}>
          <Text style={styles.rowText} numberOfLines={5}> {cleanTitle} </Text>
        </View>
      </TouchableOpacity>
    )
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
