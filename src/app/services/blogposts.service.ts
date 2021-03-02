import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlogPost } from '../types';
@Injectable({
  providedIn: 'root',
})
export class BlogpostsService {
  constructor(private http: HttpClient) {}
  getBlogPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>('http://localhost:4000/allrenderedposts');
  }
}
