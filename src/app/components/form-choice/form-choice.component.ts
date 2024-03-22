import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-form-choice',
  templateUrl: './form-choice.component.html',
  styleUrl: './form-choice.component.scss'
})
export class FormChoiceComponent {
  @Input() name!:string;
  @Input() choice1!:string;
  @Input() choice2!:string;
  @Input() widthValue!:string;
  @Input() stack!:string;
  @Output() emitSelectedValue = new EventEmitter<boolean>();
  selectedValue!:boolean;

  ngOnInit(){
    if (!this.choice1) this.choice1 = "SI"
    if (!this.choice2) this.choice2 = "NO"
  }

  setInputValue(value:boolean){
    this.selectedValue = value;
    console.log(this.selectedValue)
  }

  isStack():boolean{
    if (this.stack == "true") return true;
    return false;
  }

  emitValue():void{
    this.emitSelectedValue.emit(this.selectedValue);
  }
}
