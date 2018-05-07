import { Injectable } from '@angular/core';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';


/*
  Generated class for the HelperProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HelperProvider {

  constructor(public transfer: FileTransfer, public file: File) { }

  download(source, file_name, sector) {

    const no_image = 'http://calinense.com.br/api/public/no_img.jpg';
    const fileTransfer: FileTransferObject = this.transfer.create();

    return new Promise((resolve, reject) => {
      if(file_name.length > 0){
        fileTransfer.download(source, this.file.dataDirectory + sector + '/' + file_name)
        .then((entry) => {
          //Retorna o path do local da imagem
          resolve(entry.nativeURL);
        }, () => {
          //Se houver erro, retorna "resolvida", mas retorna "no_image" para o download
          fileTransfer.download(no_image, this.file.dataDirectory + sector + '/' + 'no_img.jpg')
          .then((entry) => {
            //Retorna o path do local da imagem
            resolve(entry.nativeURL);
          }, () => {
            resolve(false);
          })
        });
      }
      else
      {
        //Se o "file_name" vier vazio, retorna "no image" para o download
        fileTransfer.download(no_image, this.file.dataDirectory + sector + '/' + 'no_img.jpg')
          .then((entry) => {
            //Retorna o path do local da imagem
            resolve(entry.nativeURL);
          }, () => {
            resolve(false);
          })
      }
    })
  }

}