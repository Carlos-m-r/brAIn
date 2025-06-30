import { Component, ViewEncapsulation } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-header',
  imports: [
    ToolbarModule,
    ButtonModule,
    RippleModule

  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class HeaderComponent {
  darkMode = false;

  toggleTheme() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark', this.darkMode);
  }
}
