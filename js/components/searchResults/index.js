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

import Food2ForkService from './../../services/food2forkService'

const service = new Food2ForkService();

const styles = StyleSheet.create({
  container: {
    marginTop: 65,
    flex: 1,
  },
  loading: {
    marginTop: 20,
  },
  listView: {
    alignItems: 'center',
    paddingRight: 50,
    paddingLeft: 50,
  },
  rowContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  thumb: {
    width: 48,
    height: 48,
    borderRadius: 4,
    marginRight: 10,
  },
  textWrapper: {
    flexDirection: 'column',
    flex: 0.8
  },
  text: {
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  separator: {
    height: 1,
    alignSelf: 'stretch',
    backgroundColor: '#7A8491',
  },
  footer: {
    flex: 1,
    marginBottom: 15
  },
  errorMessage: {
    marginTop: 15,
    alignSelf: 'center',
    color: 'red'
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
      isLoadingAdditional: false,
      hasError: false,
      errorMessage: null,
      recipes: [],
      dataSource: ds,
      page: 1
    }
  }
  componentDidMount() {
    this._getRecipesFromDBAsync();
  }
  componentWillUnmount() {
    clearTimeout(this.timer);
  }
  render() {
    let spinner = (this.state.isLoading)?
      (<ActivityIndicator style={styles.loading} size="small" />) :
      (<View/>);

    return (
        <View style={styles.container}>
        {spinner}
        <ListView
          dataSource = {this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
          renderSeparator={this._renderSeperator.bind(this)}
          renderFooter={this._renderFooter.bind(this)}
          onEndReachedThreshold={1000}
          onEndReached={this._onEndReached.bind(this)}
          enableEmptySections={true}
          contentContainerStyle={styles.listView}
        />
      </View>
    )
  }
  _renderRow(rowData, sectionId, rowId, highlightRow) {
    let cleanTitle = cleanString(rowData.title);
    return (
      <TouchableOpacity style={styles.rowContainer} onPress={this._goToRecipie.bind(this, rowData)}>
        <Image style={styles.thumb} source={{uri: rowData.image_url}} />
        <View style={styles.textWrapper}>
          <Text style={styles.text} numberOfLines={5}> {cleanTitle} </Text>
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
  _renderFooter() {
    let errorMessage = (this.state.hasError)?
      (<Text style={styles.errorMessage}>{this.state.errorMessage}</Text>) :
      (<View/>);

    let spinner = (this.state.isLoadingAdditional)?
      (<ActivityIndicator style={styles.loading} size="small" />) :
      (<View/>);

    let style = (this.state.hasError || this.state.isLoadingAdditional)? styles.footer : null;

    return (
      <View style={style}>
        {errorMessage}
        {spinner}
      </View>
    );
  }
  _onEndReached() {
    console.log('endreached');
    if(!this.state.hasError) {
      this._getAdditionalRecipesFromDBAsync();
    }
  }
  _goToRecipie(recipe) {
    this.props.navigator.push({
      name: 'recipe',
      recipeTitle: recipe.title,
      passProps: {
        recipe: recipe
      }
    })
  }
  async _getRecipesFromDBAsync(){
    try {
      this.setState({ isLoading: true });
      let results = await service.getRecipesFromDBAsync(this.props.ingredients, this.state.page);
      if(results <=0) {
        this.setState({
          isLoading: false,
          isLoadingAdditional: false,
          hasError: true,
          errorMessage: 'No recipes found!',
        });
      } else {
        this.setState({
          isLoading: false,
          hasError: false,
          errorMessage: null,
          recipes: results,
          dataSource: this.state.dataSource.cloneWithRows(results)
        });
      }
    } catch (e) {
      this.setState({
        isLoading: false,
        isLoadingAdditional: false,
        hasError: true,
        errorMessage: e.message,
        dataSource: this.state.dataSource.cloneWithRows([])
      });
    }
  }
  async _getAdditionalRecipesFromDBAsync(){
    try {
      this.setState({
        isLoadingAdditional: true,
        page: this.state.page += 1
      });
      let results = await service.getRecipesFromDBAsync(this.props.ingredients, this.state.page);
      if(results <=0) {
        this.setState({
          isLoadingAdditional: false,
          page: this.state.page -= 1
        });
      } else {
        let recipes = [], newRecipes = [];
        recipies = this.state.recipes.slice();
        newRecipes = recipies.concat(results);
        this.setState({
          isLoadingAdditional: false,
          hasError: false,
          errorMessage: null,
          recipes: newRecipes,
          dataSource: this.state.dataSource.cloneWithRows(newRecipes)
        });
      }
    } catch (e) {
      this.timer = setTimeout(() => {
        this.setState({
          isLoadingAdditional: false,
          page: this.state.page -= 1
        })
      }, 2000);
    }
  }
}
