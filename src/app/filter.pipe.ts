import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, fleetTable: string): any {
    if(fleetTable==="") {
      return value;
    }
    const fleetArray:any[]=[];
    for(let i = 0; i<= value.length;i++) {
      let fleetName: string = value[i].name;
      if(fleetName.startsWith(fleetTable)) {
        fleetArray.push(value[i])
      }
    }
    return fleetArray;
  }

}
