// Importaciones de Angular y módulos necesarios
import {
  Component,            // Decorador para definir componentes
  AfterViewChecked,     // Ciclo de vida para acciones tras la detección de cambios en la vista
  ElementRef,           // Referencia a elementos del DOM
  ViewChild,             // Decorador para obtener referencias a elementos dentro de la plantilla
  OnInit
} from '@angular/core';
import { CommonModule, NgForOf, NgClass } from '@angular/common'; // Módulos estructurales y de directivas
import { FormsModule } from '@angular/forms';                   // Soporte para formularios y ngModel
import { CardModule } from 'primeng/card';                       // Componente de tarjeta de PrimeNG
import { ScrollPanelModule } from 'primeng/scrollpanel';         // Panel con scroll de PrimeNG
import { InputTextModule } from 'primeng/inputtext';             // Campo de texto de PrimeNG
import { ButtonModule } from 'primeng/button';                   // Botón de PrimeNG
import { ProgressSpinnerModule } from 'primeng/progressspinner'; // Spinner de carga de PrimeNG
import { SimpleMarkdownPipe } from '../../shared/pipes/markdown.pipe'; // Pipe para renderizar Markdown simple
import { GeminiService } from '../../services/gemini.service';    // Servicio para comunicarse con la API Gemini


// Definición de la estructura de un mensaje
interface Message {
  from: 'user' | 'ai';   // Origen del mensaje: usuario o IA
  text: string;          // Contenido del mensaje
  timestamp?: Date;      // Marca de tiempo opcional
}

@Component({
  selector: 'app-chat',                // Selector del componente en templates
  standalone: true,                    // Componente independiente (sin módulo NgModule)
  imports: [                           // Módulos y pipes que importa este componente
    CommonModule,
    NgForOf,
    NgClass,
    FormsModule,
    CardModule,
    ScrollPanelModule,
    InputTextModule,
    ButtonModule,
    ProgressSpinnerModule,
    SimpleMarkdownPipe
  ],
  templateUrl: './chat.component.html', // Archivo de plantilla HTML
  styleUrls: ['./chat.component.css']    // Archivo de estilos CSS
})

export class ChatComponent implements AfterViewChecked {
  @ViewChild('scroll') scrollPanel!: ElementRef;

  messages:Message[] = [];
  userInput:string = '';
  loading:boolean = false;
  private shouldScroll:boolean = false;

  constructor(private gemini: GeminiService) { };

  send(): void {
    const text = this.userInput.trim();
    if (!text) return;

    this.messages.push({ from: 'user', text, timestamp: new Date() });
    this.userInput = '';
    this.loading = true;
    this.shouldScroll = true;

    this.gemini.generateWithHistory(this.messages).subscribe({
  next: resp => {
    const reply = resp.candidates?.[0]?.content.parts[0].text || 'No hubo respuesta válida';
    this.messages.push({ from: 'ai', text: reply, timestamp: new Date() });
    this.loading = false;
    this.shouldScroll = true;
  },
  error: e => {
    this.messages.push({ from: 'ai', text: `Error ${e.message}`, timestamp: new Date() });
    this.loading = false;
    this.shouldScroll = true;
  }
});
  }

  ngAfterViewChecked(): void {
    if(this.shouldScroll && this.scrollPanel) {
      const el: HTMLElement = this.scrollPanel.nativeElement.querySelector('.p-scrollpanel-content');

      el.scrollTop = el.scrollHeight;
      this.shouldScroll = false;
    }
  }

}