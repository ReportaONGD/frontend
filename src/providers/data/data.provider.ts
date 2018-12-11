import { Injectable } from '@angular/core';

@Injectable()
export class DataProvider {

  public constructor() {
  }
   save(key: string, item: any) {
    localStorage.setItem(key, JSON.stringify(item));
  }
  removeItem(key: string) {
    localStorage.removeItem(key);
  }
  clear() {
    localStorage.clear();
  }
  getItem(key: string): any {
    return JSON.parse(localStorage.getItem(key));
  }
}
