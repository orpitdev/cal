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

  private fileTransfer: FileTransferObject = this.transfer.create();

  constructor(public transfer: FileTransfer, public file: File) { }

  download(source, file_name, sector) {
    return new Promise((resolve, reject) => {
      if(file_name.length > 0){
        this.fileTransfer.download(source, this.file.dataDirectory + sector + '/' + file_name)
        .then((entry) => {
          //Retorna o path do local da imagem
          resolve(entry.nativeURL);
        }, () => {
          //Se houver erro, retorna "resolvida", mas retorna "false" para o download
          resolve(false);
        });
      }
      else
      {
        //Se o "file_name" vier vazio, retorna "false" para o download
        resolve(false);
      }
    })
  }

}