import { Component } from '@angular/core';
import { AppServiceService } from './app-service.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Accommodation';
  constructor(private appService: AppServiceService){}
}
