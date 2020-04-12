import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  saveUser(email, password) {
    return this.http.post(`${environment.domain}/api/saveUser`, {
      email,
      password,
    })
  }

  login(email, password) {
    return this.http.post(`${environment.domain}/api/login`, {
      email,
      password,
    })
  }
}
