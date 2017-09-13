import {Component} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute, Params, Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import {MembershipsService} from "../../../../shared/services/memberships.service";

@Component({
  selector: 'add-memberships',
  templateUrl: './addMembership.html',
})
export class AddMembership {

	data:any;
	public form:FormGroup;

	public name:AbstractControl;
	public description:AbstractControl;
	public duration:AbstractControl;
	public amount:AbstractControl;
	public id:any;

	constructor(	
			protected mservice: MembershipsService, 
			private activatedRoute: ActivatedRoute, 
			private router: Router,
			public fb : FormBuilder) 
	{
		this.form = fb.group({
				      'name': ['', Validators.compose([Validators.required])],
				      'description': ['', Validators.compose([Validators.required])],
				      'duration': ['', Validators.compose([Validators.required])],
				      'amount': ['', Validators.compose([Validators.required])]
				    });

		this.name = this.form.controls['name'];
		this.description = this.form.controls['description'];
		this.duration = this.form.controls['duration'];
		this.amount = this.form.controls['amount'];
	}

	ngOnInit() {
		this.activatedRoute.params.subscribe((params: Params) => {
        	console.log(params);
        	if( typeof params['id'] != 'undefined' && params['id'] != '' )
        	{
        		this.mservice.get(params['id']).map(res => res.json()).subscribe(res =>{
			        console.log(res);

			        this.id = res.id;
			        // this.name = res.name;
			        // this.description = res.description;
			        // this.duration = res.duration;
			        // this.amount = res.amount;

			        this.form = this.fb.group({
				      'name': [res.name, Validators.compose([Validators.required])],
				      'description': [res.description, Validators.compose([Validators.required])],
				      'duration': [res.duration, Validators.compose([Validators.required])],
				      'amount': [res.amount, Validators.compose([Validators.required])]
				    });

				    this.name = this.form.controls['name'];
					this.description = this.form.controls['description'];
					this.duration = this.form.controls['duration'];
					this.amount = this.form.controls['amount'];
					
			        //this.router.navigate(['/pages/memberships/smarttables'], { queryParams: {}});
			    });
        	}
      	});
	}

	onSelectionChange( sel:string )
	{
		
	}

	doValidation( str:string )
	{
		console.log(str+'::::HHHHHHHHHHHHHHHHHHHHH');
	}

	onSubmit( values:any )
	{
		console.log(values);

		if( this.id )
		{
			values.id = this.id;
		}

		this.mservice.add(values).map(res => res.json()).subscribe(res =>{
	        console.log(res);
	        this.router.navigate(['/pages/memberships/list'], { queryParams: {}});
	    });
	}

	
}
