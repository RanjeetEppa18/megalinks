import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormArray, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { UserService } from './home.service';
import { Store, select } from '@ngrx/store';
import { increment, setUser } from '../auth/auth.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,
              private userService: UserService,
              private store: Store<{auth: any}>) { }

  title = 'megalinks';
  widthExp = '0%';
  check = true;
  progress = 0
  hide = true;
  me$;

  password;
  email;

  form = new FormControl({});

  ngOnInit() {
    if(localStorage.getItem('email')) {
    this.router.navigate(["/archives"]);
    return;  
    }

    this.store.pipe(select('auth')).subscribe(data => {
      console.log("data",data)
    })
   }

  showProgress() {
    this.hide = false;

    
    this.userService.saveUser(this.email,this.password).subscribe( (res: string) => {
      console.log(res)
      this.store.dispatch(setUser({email:res}));
      localStorage.setItem('email',res);
    });

    /// the following part is done for loading animation purpose only
    const loop = [{ per: 25, time: 500 }, { per: 50, time: 1300 }, { per: 75, time: 2000 }, { per: 100, time: 3000 }]
    loop.forEach(({ per, time }) => {
      setTimeout(() => {
        this.widthExp = `${per}%`
      }, time)
    })
    setTimeout(()=> {
      this.router.navigate(['/archives']);
    },4000)

  }

}
