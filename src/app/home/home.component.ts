import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { UserService } from './home.service'
import { Store, select } from '@ngrx/store'
import { increment, setUser } from '../auth/auth.actions'
import { BsModalService, BsModalRef } from 'ngx-bootstrap'
import { markdown } from 'markdown'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private userService: UserService,
    private store: Store<{ auth: any }>,
    private modalService: BsModalService
  ) {}

  @ViewChild('errorModal') errorModal: ElementRef<any>
  @ViewChild('loginError') loginErrorModal: ElementRef<any>
  @ViewChild('signUpError') signUpErrorModal: ElementRef<any>
  @ViewChild('loginModal') loginModal: ElementRef<any>

  title = 'megalinks'
  widthExp = '0%'
  userExistError = false
  check = true
  progress = 0
  errorMessage: { header: string; body: string; template: ElementRef<any> } //body can be markdown content
  modalRef: BsModalRef
  me$

  password
  email

  form = new FormControl({})

  ngOnInit() {
    if (localStorage.getItem('email')) {
      this.router.navigate(['/archives'])
      return
    }

    this.store.pipe(select('auth')).subscribe(data => {
      console.log('data', data)
    })

    this.modalService.onHide.subscribe(data => {
      console.log('CLOSED THE MODAL SERVICE', data)
      this.userExistError = false
    })
  }

  openModal(template, modalClass) {
    this.modalRef = this.modalService.show(template, {
      class: modalClass
    })
  }

  handler(test, $event) {
    console.log('test', $event)
  }

  signUp() {
    this.userService.saveUser(this.email, this.password).subscribe(
      (res: string) => {
        console.log(res)
        this.store.dispatch(setUser({ email: res }))
        localStorage.setItem('email', res)
        this.router.navigate(['/archives'])
      },
      error => {
        console.log(error)
        this.userExistError = true
        this.errorMessage = {
          header: 'User exists already!',
          body: 'Please **`Login`** / **`Sign-up`** with different e-mail',
          template: this.signUpErrorModal
        }
        this.modalRef = this.modalService.show(this.errorModal, {
          class: 'modal-dialog-centered'
        })
      }
    )
  }

  test() {
    console.log('tested')
  }

  logIn() {
    this.userService.login(this.email, this.password).subscribe(
      (res: string) => {
        console.log(res)
        this.store.dispatch(setUser({ email: res }))
        localStorage.setItem('email', res)
        this.modalRef.hide()
        this.router.navigate(['/archives'])
      },
      error => {
        this.userExistError = true
        this.errorMessage = {
          header: 'Something went wrong!',
          body: "**`User`** might not exists / **`Password`**  doesn't match.",
          template: this.loginErrorModal
        }
        this.modalRef = this.modalService.show(this.errorModal, {
          class: 'modal-dialog-centered'
        })
      }
    )
  }

  handleAuthEvents(event) {
    switch (event) {
      case 'login':
        this.userExistError = false
        this.modalRef.hide()
        this.openModal(this.loginModal, 'modal-dialog-centered')
        break
      case 'signup':
        this.modalRef.hide()
        break
      default:
        break
    }
  }
}
