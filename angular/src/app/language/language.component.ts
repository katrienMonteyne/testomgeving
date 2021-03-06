import { Component, OnInit, EventEmitter, Input, NgModule, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})

@NgModule({
  imports: [
    CommonModule
  ]
})

export class LanguageComponent implements OnInit {

  @Input() language: boolean;
  @Input() user: User;
  @Output() onLangEdited = new EventEmitter<boolean>();
  
  langList = [
    "Nederlands", "Engels", "Duits", "Frans", "Duits", "Spaans", "Italiaans", "Chinees", "Japans", "Noors", "Fins"
  ];
  selectedValue: string;
  selectedControl: number;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  add(): void {

    let selectedLanguage = { "language": this.selectedValue, "control": this.selectedControl };
    this.user.languages.push(selectedLanguage);
    this.userService.updateUser(this.user).subscribe(() => {
      console.log("UPDATED")
    })
  }

  save(): void {

    this.language = true;

    this.onLangEdited.emit(true);

  }

  delete(taal: Object): void {
    if (this.user.languages.length > 0) {
      this.user.languages = this.user.languages.filter(obj => obj !== taal);
    }
  }

}
