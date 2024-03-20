import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MessageService } from '../../../components/message/message.service';
import { LoaderService } from '../../../components/loader/loader.service';
import { CampionatiService } from '../campionati.service';

@Component({
  selector: 'app-nuovo-campionato',
  templateUrl: './nuovo-campionato.component.html',
  styleUrl: './nuovo-campionato.component.scss'
})
export class NuovoCampionatoComponent {
  form!:FormGroup;
  calendarioGenerato:boolean = false;
  gare!:string[];
  gareUfficiali:string[] = ["Bahrain", "Arabia Saudita", "Australia", "Azerbaijan", "Miami", "Imola", "Monaco", "Spagna", "Canada", "Austria", "Gran Bretagna", "Ungheria", "Belgio", "Olanda", "Italia", "Singapore", "Giappone", "Qatar", "USA", "Messico", "Brasile", "Las Vegas", "Abu Dhabi"];
  sprints:boolean[] = [];
  sprintPoints:number[] = [8, 7, 6, 5, 4, 3, 2, 1, 0, 0];
  racePoints:number[] = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];

  constructor(
    private fb:FormBuilder,
    private campionatiService:CampionatiService,
    private messageService:MessageService,
    private loaderService:LoaderService
  ){}

  ngOnInit(){
    this.form = this.fb.group({
      nome: this.fb.control(null),
      calendarioUfficiale: this.fb.control(null),
      numeroGare: this.fb.control(23),
      gare: this.fb.array([]),
      independentSprint: this.fb.control(null),
      polePoint: this.fb.control(null),
      fastestLapPoint: this.fb.control(null),
      minFastestLapPosition: this.fb.control(10),
      saveQuali: this.fb.control(null),
      customSprintPoints: this.fb.control(null),
      sprintPoints: this.fb.array([8, 7, 6, 5, 4, 3, 2, 1, 0, 0]),
      customRacePoints: this.fb.control(null),
      racePoints: this.fb.array([25, 18, 15, 12, 10, 8, 6, 4, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
      realDrivers: this.fb.control(null),
    });
  }

  onEmitValue(value:any, name:string){
    if (value == "true") {
      value = true;
    } else {
      value = false;
    }
    this.form.get(name)?.setValue(value);
    if (name == "calendarioUfficiale" && value) this.form.get("numeroGare")?.setValue(23);
  }

  isCampionatoUfficiale():boolean{
    return this.form.get("calendarioUfficiale")?.value;
  }

  addRaceNumber():void{
    let oldValue:number = this.form.get("numeroGare")?.value;
    if (oldValue < 24) this.form.get("numeroGare")?.setValue(++oldValue);
  }

  subtractRaceNumber():void{
    let oldValue:number = this.form.get("numeroGare")?.value;
    if (oldValue > 2) this.form.get("numeroGare")?.setValue(--oldValue);

  }

  addMinFastestLapPosition():void{
    let oldValue:number = this.form.get("minFastestLapPosition")?.value;
    if (oldValue < 20) this.form.get("minFastestLapPosition")?.setValue(++oldValue);
  }

  subtractMinFastestLapPosition():void{
    let oldValue:number = this.form.get("minFastestLapPosition")?.value;
    if (oldValue > 1) this.form.get("minFastestLapPosition")?.setValue(--oldValue);
  }

  isFastestLapPoint():boolean{
    return this.form.get("fastestLapPoint")?.value;
  }

  generaCalendario(){
    const calendarioUfficiale = this.form.get("calendarioUfficiale")?.value;
    if (calendarioUfficiale != true && calendarioUfficiale != false) {
      this.messageService.showErrorMessage("Devi selezionare la tipologia di calendario");
      return;
    }

    this.calendarioGenerato = true;
    this.sprints = [];
    if (this.form.get("calendarioUfficiale")?.value) {
      this.gare = [...this.gareUfficiali];
      for (let i = 0; i < this.gare.length; i++) {
        switch (i) {
          case 3:
          case 9:
          case 12:
          case 17:
          case 18:
          case 20:
            this.sprints.push(true);
            break;
          default:
            this.sprints.push(false);
        }
      }
    } else {
      const numeroGare = this.form.get("numeroGare")?.value;
      this.gare = [];
      for (let i = 0; i < numeroGare; i++) {
        this.gare.push("");
        this.sprints.push(false);
      }
    }

    (this.form.get("gare") as FormArray).clear();
    for (let gara of this.gare) {
      const string:string|null = gara == "" ? null : gara;
      this.addRace(string);
    }
  }

  addRace(string:string|null):void{
    const control = new FormControl(string);
    (this.form.get("gare") as FormArray).push(control);
    this.sprints.push(false);
  }

  addRaceAtIndex(index:number):void{
    index++
    const control = new FormControl(null);
    (this.form.get("gare") as FormArray).insert(index, control);
    this.gare.splice(index, 0, "");
    this.sprints.splice(index, 0, false);
    console.log((this.form.get("gare") as FormArray).controls)
  }

  deleteRace(index:number):void{
    (this.form.get("gare") as FormArray).removeAt(index);
    this.gare.splice(index, 1);
    this.sprints.splice(index, 1);
  }

  getGare(){
    return (this.form.get("gare") as FormArray).controls;
  }

  moreThan2Races():boolean{
    return this.gare.length > 2;
  }

  toggleSprint(index:number):void{
    this.sprints[index] = !this.sprints[index];
  }

  isCustomSprintPoints():boolean{
    return this.form.get("customSprintPoints")?.value;
  }

  isCustomRacePoints():boolean{
    return this.form.get("customRacePoints")?.value;
  }

  getSprintPoints(){
    return (this.form.get("sprintPoints") as FormArray).controls;
  }

  getRacePoints(){
    return (this.form.get("racePoints") as FormArray).controls;
  }

  checkNumberInput(arrayName:string, maxValue:number, i:number):void{
    const control = (this.form.get(arrayName) as FormArray).controls[i];
    if (control.value < 0) control.setValue(0);
    if (control.value > maxValue) control.setValue(maxValue);
  }

  creaCampionato():void{
    console.log(this.form);
  }
}
