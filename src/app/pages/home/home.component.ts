import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TimelineModule } from 'primeng/timeline';
import { TabsModule } from 'primeng/tabs';
import { ProgressBarModule } from 'primeng/progressbar';

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
    TimelineModule,
    TabsModule,
    ProgressBarModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit{
  works!: work[];
  animatedYears: number = 0;
  private targetYears: number = 2;
  private animationDuration: number = 1000;
  hasAnimated: boolean = false;

  @ViewChild('experienceDiv') experienceDiv!: ElementRef;

  ngOnInit(): void {
    this.animateYears();

    this.works = [
      { name: "", date: "" },
      { name: "Universidad Privada Dr Rafael Belloso Chacin", date: "2021 - Presente" },
      { name: "Saint", date: "2024" },
      { name: "Cátedra Gaitera", date: "Presente" },
      { name: "Universidad José Gregorio Hernández", date: "Presente"},
      { name: "", date: "" }
    ]
  }

    ngAfterViewInit() {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !this.hasAnimated) {
        this.hasAnimated = true;
        this.animateYears();
      }
    }, { threshold: 0.5 });

    if (this.experienceDiv) {
      observer.observe(this.experienceDiv.nativeElement);
    }
  }

  animateYears(){
    const start = 0;
    const end = this.targetYears;
    const duration = this.animationDuration;
    const startTime = performance.now();

     const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      if (elapsed < duration) {
        this.animatedYears = +(start + (end - start) * (elapsed / duration)).toFixed(1);
        requestAnimationFrame(animate);
      } else {
        this.animatedYears = end;
      }
    };

    requestAnimationFrame(animate);
  }
}
