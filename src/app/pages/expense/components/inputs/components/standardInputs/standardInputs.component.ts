import {Component} from '@angular/core';


@Component({
  selector: 'standard-inputs',
  templateUrl: './standardInputs.html',
})
export class StandardInputs {

	data:any;
	public name:string;
	public age:string;
	public email:string;
	public facebook:string;
	public sex:string = 'M';
	public dob:string;
	public mobile_no:string;
	public resident_no:string;
	public address:string;
	public refrered_by:string;
	public rule:any;
	newItem:any = {};

	constructor() {
		this.newItem.StartTime = '';
		this.newItem.EndTime = '';
	}

	ngOnInit() {

	}

	onSelectionChange( sel:string )
	{
		this.sex = sel;
	}

	doValidation( str:string )
	{
		console.log(str+'::::HHHHHHHHHHHHHHHHHHHHH');
	}
}
