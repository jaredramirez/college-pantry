import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

let getIngredientList = (ingredients) => {
  let list = '';
  for(let i=0;i<ingredients.length;i++){
    list += ingredients[i].ingredient;
    if(i+1 < ingredients.length){
      list += ',';
    }
  }
  return list;
}

@Injectable()
export class Food2ForkService {
  key: string;

  constructor(private http: Http) {
    this.key = '4e53da2a4fbb8e4e142fd856fae1adb8';
  }

  findRecipes(_ingredients) {
    let ingredientList = getIngredientList(_ingredients);
    return this.http.get(`http://food2fork.com/api/search?key=${this.key}&q=${ingredientList}`);
  }
}
