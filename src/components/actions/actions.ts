import { Component, Input } from '@angular/core';

/**
 * Generated class for the ActionsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'actions',
  templateUrl: 'actions.html'
})
export class ActionsComponent {

  @Input() id: string;
  @Input() color: string;
  likes: number = 0;
  comments: number = 0;

  constructor() {
    //qndo for fazer a programação: guardar uma string/hash qndo ele instalar o AP, para identificar o user... guardar no Lcation Storage.
    //Qndo o camarada clicar no "like" enviar esse hash para guardar junto no BD.
  }

}
