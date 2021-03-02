import { Component, OnInit } from '@angular/core';
import { BlogpostsService } from 'src/app/services/blogposts.service';
import { BlogPost } from 'src/app/types';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  blogPosts: BlogPost[] = [];
  constructor(private blogPostService: BlogpostsService) {}

  ngOnInit(): void {
    this.blogPostService.getBlogPosts().subscribe((blogPosts) => {
      this.blogPosts = blogPosts;
    });
  }
}
