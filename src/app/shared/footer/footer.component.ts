import { Component } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';


@Component({
  selector: 'app-footer',
  imports: [ToolbarModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
