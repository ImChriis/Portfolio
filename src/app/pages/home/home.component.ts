import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TimelineModule } from 'primeng/timeline';
import { TabsModule } from 'primeng/tabs';
import { ProgressBarModule } from 'primeng/progressbar';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { TextareaModule } from 'primeng/textarea';

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
    ProgressBarModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    TextareaModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit{
  private mescsageService = inject(MessageService);
  private fb = inject(FormBuilder);
  private targetYears: number = 2;
  private animationDuration: number = 1000;
  works!: work[];
  animatedYears: number = 0;
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

@ViewChild('contactForm', { read: ElementRef }) contactForm!: ElementRef;

sendEmail() {
  emailjs.sendForm(
    'service_h7r3nfp',
    'template_96dil8q',
    this.contactForm.nativeElement,
    'a4cG1cVQdnua50_cQ'
  ).then(
    (result: EmailJSResponseStatus) => {
      this.mescsageService.add({severity:'success', summary: 'Éxito', detail: 'Mensaje enviado correctamente'});
      this.contactForm.nativeElement.reset();
    },
    (error) => {
      this.mescsageService.add({severity:'error', summary: 'Error', detail: 'Error al enviar el mensaje'});
    }
  );
}
}
