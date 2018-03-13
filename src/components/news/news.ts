import { Component, Input } from '@angular/core';

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

  @Input() qtySlider: number = 3
  @Input() qtyBody: number = 2

  constructor() {
  }

  ngOnInit(){ //ionDidLoadView e CIA não funciona nos components, só em pages. Então se recorre ao lifecicle do Angular.
    
	}

}
