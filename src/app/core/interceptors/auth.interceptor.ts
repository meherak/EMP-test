import {
  HttpRequest,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { LocalStorageService } from '@core/services';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private readonly localStorageService: LocalStorageService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // C'est un exemple d'utilisation pas ça ne fonctionne pas dans notre cas
    // car on a pas implementé Backend/API/REST
    const token =
      this.localStorageService.getItem('token');

    const httpHeaders: HttpHeaders = new HttpHeaders();

    if (!!token) {
      httpHeaders.append('Authorization', `Bearer ${token}`)
    }
    const authReq = req.clone({
      headers: httpHeaders,
    });

    // Send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}
