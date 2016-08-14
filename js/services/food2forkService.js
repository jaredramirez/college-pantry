import Key from './../apiKey';

getFood2ForkQuery = (ingredients, page) => {
  let query = 'http://food2fork.com/api/search?';
  query += 'key=' + Key + '&q=';
  for(ingredient of ingredients) {
    let tmp = ingredient.name.replace(/ /g,'%20');
    query += tmp + ',';
  }
  query = query.slice(0, -1);
  query += '&page=' + page;
  return query;
}

export default class Food2ForkService {
  async getRecipesFromDBAsync(ingredients, page){
    let query = getFood2ForkQuery(ingredients, page);
    const response = await fetch(query);
    const jsonData = await response.json();
    return jsonData.recipes;
  }
  async _getAdditionalRecipesFromDBAsync(){
    this.setState({
      isLoadingAdditional: true,
      page: this.state.page += 1
    });
    try{
      let query = getFood2ForkQuery(this.props.ingredients, this.state.page);
      const response = await fetch(query);
      const jsonData = await response.json();

      if(jsonData.recipes.length <=0) {
        this.setState({
          isLoading: false,
          isLoadingAdditional: false,
          page: this.state.page -= 1
        });
      } else {
        let recipes = [], newRecipes = [];
        recipies = this.state.recipes.slice();
        newRecipes = recipies.concat(jsonData.recipes);
        this.setState({
          isLoadingAdditional: false,
          hasError: false,
          errorMessage: null,
          recipes: newRecipes,
          dataSource: this.state.dataSource.cloneWithRows(newRecipes)
        });
      }
    }
    catch(e){
      this.timer = setTimeout(() => {
        this.setState({
          isLoading: false,
          isLoadingAdditional: false,
          page: this.state.page -= 1
        })
      }, 2000);
    }
  }
}
