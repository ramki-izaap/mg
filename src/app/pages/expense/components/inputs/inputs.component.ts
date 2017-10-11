import {Component,ViewChild } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute, Params, Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';


import {ExpenseService} from "../../../../shared/services/expense.service";

@Component({
  selector: 'inputs',
  templateUrl: './inputs.html'
})
export class Inputs {

	public form:FormGroup;
	public rules:any= {};

	public id:number;

	//Expense details
	public name:AbstractControl;
	public description:AbstractControl;
	public amount:AbstractControl;
	public date:AbstractControl;
	

	public memberships:any = [];	

  	constructor(	
  			protected exservice: ExpenseService, 
  			private activatedRoute: ActivatedRoute, 
  			private router: Router,
  			public fb : FormBuilder) 
  	{
  		this.rules = {
				      'name': ['', Validators.compose([Validators.required])],
				      'description': ['', Validators.compose([Validators.required])],
				      'amount': ['', Validators.compose([Validators.required])],
				      'date': ['', Validators.compose([Validators.required])]				      
				    };

		this.form = this.fb.group( this.rules );

  		this.updateValues();
  		
	}

	updateValues( )
	{
		let elms = Object.keys(this.rules);

		for( let i in elms )
		{
			this[elms[i]] = this.form.controls[elms[i]];
		}
	}

	submitData()
	{
		console.log(this.form.value);

		if( this.form.invalid ) return;

		let data 			= Object.assign({}, this.form.value);

		data.date 			= this.dateObjToStr(data.date);		

		if( this.id )
		{
			data.id = this.id;
		}
		
		console.log('data', data);		

		this.exservice.add( data ).map(res => res.json()).subscribe(res =>{
	        console.log(res);
	        let msg = 'Record added successfully!.';
	        if( this.id )
	        {
	        	msg = 'Record updated successfully!.';
	        }

	        alert(msg);

	        this.router.navigate(['/pages/expense/expense-list'], { queryParams: {}});
	    });

	}


	dateObjToStr( obj )
	{
		let str = '';

		obj.month = (obj.month<10) ? ('0'+ obj.month) : obj.month;
		obj.day = (obj.day<10) ? ('0'+ obj.day) : obj.day;
		str = obj.year +'-'+ obj.month +'-'+ obj.day;

		return str;
	}

	strToDateObj( dt_str:any )
	{
		let dt = new Date(dt_str);
		return {year: dt.getFullYear(), month: dt.getMonth() + 1, day: dt.getDate()};
	}


	
}
