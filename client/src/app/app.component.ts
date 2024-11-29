import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ArticlesComponent } from './articles/articles.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule,CommonModule, ArticlesComponent],  
  template: `
    <h1>BBC News Articles</h1>
    <app-articles></app-articles>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
