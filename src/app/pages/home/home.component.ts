import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TimelineModule } from 'primeng/timeline';

interface work {
  name: string;
  date: string;
}

@Component({
  selector: 'app-home',
  imports: [
    ButtonModule,
    CommonModule,
    TagModule,
    TimelineModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit{
  works!: work[];

  ngOnInit(): void {
    this.works = [
      { name: "Universidad Privada Dr Rafael Belloso Chacin", date: "2021 - Presente" },
      { name: "Saint", date: "2024" },
      { name: "La Gaita nos vuelve a unir", date: "Presente" }
    ]
  }
}
