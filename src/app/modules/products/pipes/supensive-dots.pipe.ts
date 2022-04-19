import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'supensiveDots'
})
export class SupensiveDotsPipe implements PipeTransform {

  transform(value: string, charactersLength: number): string {
    let subString: string = value
    if(value.length > charactersLength) {
      subString = value.substring(0, charactersLength) + '...'
    }

    return subString;
  }
}
