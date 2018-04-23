import { NewsProvider } from './../../providers/news/news';
import { Component } from '@angular/core';
import { Observable } from "rxjs/Rx"

/**
 * Generated class for the NewsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'news',
  templateUrl: 'news.html'
})
export class NewsComponent {

  public news_slider: any[] = []
  public news_body: any[] = []

  constructor(private newsProvider: NewsProvider) {}

  ngOnInit(){ //ionDidLoadView e CIA não funciona nos components, só em pages. Então se recorre ao lifecicle do Angular.
    this.proccess();
  }
  
  public proccess(){

    console.log('processo')
    
      var newsData = this.newsProvider.get()
      .then((data: any[]) => {
        setTimeout(() => {
          this.news_slider = data[0]; //Slider
          this.news_body = data[1]; //Body
        }, 20000)
      })
      .catch(() => {
        console.log('fail');
      })    
  }

}
