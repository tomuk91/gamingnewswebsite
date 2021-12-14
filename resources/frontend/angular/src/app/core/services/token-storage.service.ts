import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

const TOKEN_KEY = 'access_token';
const REFRESHTOKEN_KEY = 'refresh_token';

@Injectable({
  providedIn: 'root'
})

export class TokenStorageService {
  constructor(private cookieService: CookieService) { }

  signOut(): void {
    localStorage.removeItem(TOKEN_KEY);
    this.cookieService.deleteAll();
  }

  public saveAccessToken(token: string): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }

  public getAccessToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  public saveRefreshToken(token: string): void {
    this.cookieService.delete(REFRESHTOKEN_KEY);
    this.cookieService.set(REFRESHTOKEN_KEY, token, {expires: 1, secure: true, path:'*', sameSite: 'Strict'});
  }

  public getRefreshToken(): string | null {
    return this.cookieService.get(REFRESHTOKEN_KEY);
  }
}

