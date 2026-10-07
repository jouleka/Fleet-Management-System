import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filter' })
export class FilterPipe implements PipeTransform {
  transform<T extends { name?: string }>(items: T[] | null | undefined, term: string | null | undefined): T[] {
    if (!items) return [];
    if (!term) return items;
    return items.filter(item => String(item.name ?? '').startsWith(term));
  }
}
