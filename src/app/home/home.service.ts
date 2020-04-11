import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  saveUser(email, password) {
    return this.http.post('http://localhost:5000/saveUser', { email, password })
  }

  login(email, password) {
    return this.http.post('http://localhost:5000/login', { email, password })
  }
}
