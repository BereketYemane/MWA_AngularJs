import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'; //external imports
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'


import { AppComponent } from './app.component';//internal imports
import { WelcomeComponent } from './welcome/welcome.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { GamesListComponent } from './games-list/games-list.component';
import { GamesOneComponent } from './games-one/games-one.component';

@NgModule({ // docorator
  declarations: [
    AppComponent,
    WelcomeComponent,
    ErrorPageComponent,
    GamesListComponent,
    GamesOneComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([{
      path:"",
      component:WelcomeComponent
    },{
      path:"games",
      component:GamesListComponent
    },{
      path:"games/:gameId",
      component:GamesOneComponent
    }
    ,{
      path:"**",
      component:ErrorPageComponent
    }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { } 

