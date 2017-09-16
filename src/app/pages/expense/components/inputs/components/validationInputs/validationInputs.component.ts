import {Component} from '@angular/core';

@Component({
  selector: 'validation-inputs',
  templateUrl: './validationInputs.html',
})
export class ValidationInputs {

  public contact_name:string;
  public relationship:string;
  public mobile_no:string;
  public resident_no:string;

  constructor() {
  }
}
