import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import { ArticlesService } from '../articles.service'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-articles',
  standalone: true,  
  imports: [HttpClientModule,CommonModule], 
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent {
  articles: any[] = [];
  constructor(private articlesService: ArticlesService) {
    this.articlesService.getArticles().subscribe(data => {
      console.log(data);
      this.articles=data;
    });
  }
}
