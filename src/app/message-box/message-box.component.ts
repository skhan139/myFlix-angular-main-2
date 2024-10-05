import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-message-box',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './message-box.component.html',
  styleUrl: './message-box.component.scss',
})
export class MessageBoxComponent {
  data: any = {};
  closeMessageBox(): void {
    console.log('testing');
  }
}
