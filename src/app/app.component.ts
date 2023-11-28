import { Component, HostListener } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


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

  constructor(private modalService: NgbModal) {
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }

}
