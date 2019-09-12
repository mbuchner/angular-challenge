import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replace'
})
export class ReplacePipe implements PipeTransform {

  transform(value: any[], regexValue: string, replaceValue: string): any {
    let regex = new RegExp(regexValue, 'g');
    return value.toString().replace(regex, replaceValue);
  }
}