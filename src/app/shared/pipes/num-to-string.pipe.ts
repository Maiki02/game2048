import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numToString'
})
export class NumToStringPipe implements PipeTransform {

  transform(value: number): string {
    switch(value){
      case 0: return 'cero'; break;
      case 1: return 'uno'; break;
      case 2: return 'dos'; break;
      case 3: return 'tres'; break;
      case 4: return 'cuatro'; break;
      case 8: return 'ocho'; break;
      case 16: return 'dieciseis'; break;
      case 32: return 'treinta-y-dos'; break;
      case 64: return 'sesenta-y-cuatro'; break;
      case 128: return 'ciento-veintiocho'; break;
      case 256: return 'doscientos-cincuenta-y-seis'; break;
      case 512: return 'quinientos-doce'; break;
      case 1024: return 'mil-veinticuatro'; break;
      case 2048: return 'dos-mil-cuarenta-y-ocho'; break;
      case 4096: return 'cuatro-mil-noventa-y-seis'; break;
      default: return 'default'; break;
    }

  }

}
