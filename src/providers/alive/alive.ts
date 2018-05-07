import { DatabaseProvider } from './../database/database';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AliveProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AliveProvider {

  private API: string = 'http://calinense.com.br/api/v1'

  constructor(public http: HttpClient, private dbProvider: DatabaseProvider) {}

  check(){
    const hasgame = new Promise((resolve, reject) => {
      this.http.get(this.API + '/games/checkalive')
        .toPromise()
        .then((result: any) => {
          resolve(result);
        })
        .catch((error) => {
          reject();
        })
    });

    return hasgame;
  }

}
