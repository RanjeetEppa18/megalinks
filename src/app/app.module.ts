import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { MarkdownModule } from 'ngx-markdown'
import { FormsModule } from '@angular/forms'
import {
  ModalModule,
  PaginationModule,
  BsDropdownModule,
  PopoverModule,
} from 'ngx-bootstrap'
import { Routes, RouterModule } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'

import { AppComponent } from './app.component'
import { HomeComponent } from './home/home.component'
import { ArchivesComponent } from './archives/archives.component'
import { ArchiveService } from './archives/archives.service'
import { UserService } from './home/home.service'
import { authReducer } from './auth/auth.reducer'
import { CommentsComponent } from './comments/comments.component'

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'archives', component: ArchivesComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ArchivesComponent,
    CommentsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MarkdownModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    BsDropdownModule.forRoot(),
    PopoverModule.forRoot(),
    StoreModule.forRoot({ auth: authReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    RouterModule.forRoot(routes, { useHash: false }),
  ],
  providers: [ArchiveService, UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
