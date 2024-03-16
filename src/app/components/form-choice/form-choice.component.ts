import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-choice',
  templateUrl: './form-choice.component.html',
  styleUrl: './form-choice.component.scss'
})
export class FormChoiceComponent {
  @Input() choice1!:string;
  @Input() choice2!:string;
  @Input() widthValue!:string;
  selectedValue!:boolean;

  setInputValue(value:boolean){
    this.selectedValue = value;
    console.log(this.selectedValue)
  }
}
