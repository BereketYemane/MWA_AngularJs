import { Component, OnInit } from '@angular/core';


import { GamesDataService } from '../games-data.service';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
export class GamesListComponent implements OnInit {

  games:Game[] =[];


  constructor(private gamesDataService:GamesDataService) { }

  ngOnInit(): void {
    this.gamesDataService.getGames().then(response=>this.games=response) 
  }

}
export class Game{
  _id!:string;
  title!:string;
  price!:number;
  year!:number;
}
