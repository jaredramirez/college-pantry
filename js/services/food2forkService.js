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

class Food2ForkService {
  async getRecipesFromDBAsync(ingredients, page){
    let query = getFood2ForkQuery(ingredients, page);
    const response = await fetch(query);
    const jsonData = await response.json();
    return jsonData.recipes;
  }
}

const instance = new Food2ForkService();
Object.freeze(instance);

export default instance;
