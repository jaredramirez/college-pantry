import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ListView,
  TextInput,
  TouchableHighlight,
  Text,
  ActivityIndicator
} from 'react-native';

import IngredientListItem from './../ingredientListItem/index';

const styles = StyleSheet.create({
  container: {
    marginTop: 70,
    flex: 1,
  },
  listView: {
    alignItems: 'center',
    marginRight: 5,
    marginLeft: 5,
  },
  buttons: {
    flexDirection: 'row'
  },
  addButton: {
    height: 25,
    width: 60,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,

  },
  searchInput: {
    height: 36,
    fontSize: 18,
    color: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#48BBEC',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 5,
  },
  searchButton: {
    height: 25,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 10,
    width: 60,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    alignSelf: 'center'
  },
  loading: {
    marginTop: 20,
  },
  appTitle: {
    marginBottom: 10,
    fontSize: 14,
    textAlign: 'center',
    color: '#656565'
  },
  dbTitle: {
    marginBottom: 10,
    fontSize: 10,
    textAlign: 'center',
    color: '#656565'
  },
});

export default class IngredientSearchPage extends Component {
  constructor(props) {
    super(props);
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      ingredients: [''],
      dataSource: ds,
      isLoading: false
    }
  }
  componentDidMount(){
    this.setState({
      dataSource:this.state.dataSource.cloneWithRows(this.state.ingredients),
    })
  }
  onSearchTextChanged(text, rowId){
    console.log(text, rowId);
    console.log(this.state);
    let newIngredients = [];
    newIngredients = this.state.ingredients.slice();
    newIngredients[0] = text;
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newIngredients),
      ingredients: newIngredients
    })
    console.log(this.state.ingredients);
  }
  _addIngredient() {
    let newIngredients = [];
    newIngredients = this.state.ingredients.slice();
    newIngredients.push('');
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newIngredients),
      ingredients: newIngredients
    })
  }
  _goToResults() {
    // this.setState({isLoading: true});
    this.props.navigator.push({
      name: 'Home',
      passProps: {
        ingredients: this.state.ingredients
      }
    })
    // this.props.navigator.push({
    //   title: 'Search Results',
    //   component: SearchResultsPage,
    //
    // })
  }
  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource = {this.state.dataSource}
          renderRow = {this.renderRow.bind(this)}
          renderFooter = {this.renderFooter.bind(this)}
          contentContainerStyle={styles.listView}
        />

        <Text style={styles.appTitle}>
          College Pantry
        </Text>
        <Text style={styles.dbTitle}>
          Powered by Recipe DB
        </Text>
      </View>
    )
  }
  renderRow(rowData, sectionId, rowId){
    return (
      // <TextInput
      //   style={styles.searchInput}
      //   value={this.state.ingredients[rowId]}
      //   onChangeText={this.onSearchTextChanged.bind(this)}
      //   placeholder='Search Ingredient'
      // />
      <IngredientListItem
        dataSource={this.state.dataSource}
        ingredients={this.state.ingredients}
        value={this.state.ingredients[rowId]}
        updateParentList={this.onSearchTextChanged}
      />
    );
  }
  renderFooter() {
    var spinner = this.state.isLoading ?
      (<ActivityIndicator style={styles.loading}
        size='large'/>) :
      (<View/>);
    return (
      <View>
        <View style={styles.buttons}>
          <TouchableHighlight
            underlayColor='#EAEBEB'
            style={styles.addButton}
            onPress={this._addIngredient.bind(this)}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor='#EAEBEB'
            style={styles.searchButton}
            returnKeyType={'search'}
            onPress={this._goToResults.bind(this)}>
            <Text style={styles.buttonText}>Search</Text>
          </TouchableHighlight>
        </View>
       {spinner}
     </View>
    )
  }
}
