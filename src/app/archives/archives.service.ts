import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ArchiveService {

    constructor(private http: HttpClient) { }
    getArchives() {
        return this.http.get<any[]>('http://localhost:5000/archives');
    }

    getArchiveComments(archiveId) {
        return this.http.get<any[]>('http://localhost:5000/archivecomments/'+archiveId);
    }
}
