import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Game } from './games-list/games-list.component';
import { game } from './games-one/games-one.component';

@Injectable({
  providedIn: 'root'
})
export class GamesDataService {

  private apiBaseUrl: string = "http://localhost:3000/api"
  constructor(private httpClient: HttpClient) { }

  public getGames(): Promise<Game[]> { // return type is a list of games
    const url: string = this.apiBaseUrl + "/games";
    return this.httpClient.get(url).toPromise()
      .then(respose => respose as Game[])
      .catch(this.handleError);
  }

  public getGame(id:string):Promise<Game>{
    const url: string = this.apiBaseUrl+"/games/"+id;
    return this.httpClient.get(url).toPromise()
    .then(response=> response as game)
    .catch(this.handleError);
  }
  
  private handleError(error: any): Promise<any> {
    console.log("Something went wrong", error);
    return Promise.reject(error.message || error);
  }
}
