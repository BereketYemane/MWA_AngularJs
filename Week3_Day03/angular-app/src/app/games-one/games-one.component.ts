import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GamesDataService } from '../games-data.service';

@Component({
  selector: 'app-games-one',
  templateUrl: './games-one.component.html',
  styleUrls: ['./games-one.component.css']
})
export class GamesOneComponent implements OnInit {

  game!:game;
  constructor(private gamesDataService:GamesDataService, private _route:ActivatedRoute) { }

  ngOnInit(): void {
    const id = this._route.snapshot.params['gameId'];
    this.gamesDataService.getGame(id).then(response=>this.game=response); 
  }

}
export class game{
  _id!:string;
  title!:string;
  price!:number;
  year!:number;
}