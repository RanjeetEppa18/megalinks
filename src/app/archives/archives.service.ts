import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { Observable, from } from 'rxjs'

@Injectable()
export class ArchiveService {
  constructor(private http: HttpClient) {}
  getArchives(searchTerm) {
    return this.http.get<any[]>(
      `${environment.domain}/api/archives/${searchTerm}`
    )
  }

  getArchiveComments(archiveId) {
    return this.http.get<any[]>(
      `${environment.domain}/api/archivecomments/` + archiveId
    )
  }
}
