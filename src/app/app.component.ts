import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-power-n-pride';

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any): void {
    // Clear session storage on page unload
    sessionStorage.removeItem('isLoggedIn');
  }
}
