import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}
  
  getItem<T>(key: string): T {
    try {
      const obj = JSON.parse(localStorage.getItem('emp.' + key) as string);
      return obj as unknown as T;
    } catch (error) {
      return localStorage.getItem('emp.' + key) as unknown as T;
    }
  }

  setItem(key: string, value: string): void {
    return localStorage.setItem('emp.' + key, value);
  }

  clear(): void {
    localStorage.clear();
  }

  removeItem(key: string): void {
    return localStorage.removeItem('emp.' + key);
  }
}
