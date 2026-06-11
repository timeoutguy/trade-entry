import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // TODO: implement real authentication
  isAuthenticated(): boolean {
    return true;
  }

  login(_username: string, _password: string): Observable<boolean> {
    return of(true);
  }

  logout(): void {
    // no-op until login system built
  }
}
