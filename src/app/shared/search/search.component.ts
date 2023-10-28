import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/shared/auth.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchTopicForm: FormGroup;
  faSearch = faSearch;
  searchTopicName = '';
  isLoggedIn: boolean;

  constructor(private router: Router, private authService: AuthService) {
    this.searchTopicForm = new FormGroup({
      topicName: new FormControl('', Validators.required)
    });
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  ngOnInit(): void {
  }

  goToSearchTopic() {
    this.searchTopicName = this.searchTopicForm.get('topicName')?.value;
    this.router.navigateByUrl('/list-topics/' + this.searchTopicName);
  }

}
