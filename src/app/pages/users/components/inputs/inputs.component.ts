import {Component,ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';


import { StandardInputs } from './components/standardInputs';
import { CheckboxInputs } from './components/CheckboxInputs';
import { ValidationInputs } from './components/ValidationInputs';

import {MembershipsService} from "../../../../shared/services/memberships.service";
import {UsersService} from "../../../../shared/services/users.service";

@Component({
  selector: 'inputs',
  templateUrl: './inputs.html'
})
export class Inputs {

	public name:string;
	public age:string;
	public email:string;
	public facebook:string;
	public sex:string = 'M';
	public dob:any;
	public mobile_no:string;
	public resident_no:string;
	public address:string;
	public referred_by:string;
	public rule:any;

	public contact_name:string;
	public contact_relationship:string;
	public contact_mobile_no:string;
	public contact_resident_no:string;

	public membership_no:string;
	public start_date:any;
	public end_date:any;
	public reason:string;

	public memberships:any;
	public selectedMembership:any;

	
	public dob_config:any = {};

  	constructor(	
  			protected mservice: MembershipsService, 
  			protected uservice: UsersService, 
  			private activatedRoute: ActivatedRoute, 
  			private router: Router) 
  	{
  		this.memberships = [];
  		this.membership_no = this.getUniqueID();
  		
	}

	ngOnInit() {

		
		this.dob_config.minDate = {year:1917, month:1, day: 1};
		this.dob_config.maxDate = this.getDateObj( new Date() );

		this.mservice.list().map(res => res.json()).subscribe(res =>{
	        this.memberships = res;
	        this.selectedMembership = res[0];
	        console.log(this.selectedMembership);
	        this.setStartAndEndDate( parseInt(this.selectedMembership.duration) );
	    });

	    this.activatedRoute.params.subscribe((params: Params) => {
        	console.log(params);
        	if( typeof params['id'] != 'undefined' && params['id'] != '' )
        	{
        		this.uservice.get(params['id']).map(res => res.json()).subscribe(res =>{
			        console.log(res);

			        this.name = res.name;
			        this.email = res.email;
			        this.facebook = res.facebook;
			        this.age = res.age;
			        this.sex = res.sex;
			        this.dob = this.getDateObj(res.dob),//{year:2017, month:9, day: 25},//new Date(res.dob);
			        this.address = res.address;
			        this.mobile_no = res.mobile_no;
			        this.resident_no = res.resident_no;
			        this.referred_by = res.referred_by;

			        
			        //this.router.navigate(['/pages/memberships/smarttables'], { queryParams: {}});
			    });
        	}
      	});

	}


	ngAfterViewInit() {
	    // child is set
	   //this.si.doValidation('MMMMMMMMMMM');
	}

	submitData()
	{
		console.log(this);
		// console.log(this.ci);
		// console.log(this.vi);

		//prepare formdata
		let body = new FormData();

		body.append('name', this.name);
		body.append('age', this.age);
		body.append('sex', this.sex);
		body.append('dob', this.convertDates(this.dob));
		body.append('mobile_no', this.mobile_no);
		body.append('resident_no', this.resident_no);
		body.append('address', this.address);
		body.append('email', this.email);
		body.append('facebook', this.facebook);
		body.append('referred_by', this.referred_by);

		body.append('contact_name', this.contact_name);
		body.append('contact_relationship', this.contact_relationship);
		body.append('contact_mobile_no', this.contact_mobile_no);
		body.append('contact_resident_no', this.contact_resident_no);

		body.append('membership_id', this.selectedMembership.id);
		body.append('membership_no', this.membership_no);
		body.append('start_date', this.convertDates(this.start_date));
		body.append('end_date', this.convertDates(this.end_date));

		this.uservice.add( body ).map(res => res.json()).subscribe(res =>{
	        console.log(res);
	    });

	}

	onSelectionChange( sel:string )
	{
		this.sex = sel;
	}

	getUniqueID()
	{
		let str = Math.random().toString(36).substring(2);

		if( typeof str == 'string' ) str = str.toUpperCase();

		return str;
	}

	convertDates( obj )
	{
		let str = '';

		obj.month = (obj.month<10) ? ('0'+ obj.month) : obj.month;

		obj.day = (obj.day<10) ? ('0'+ obj.day) : obj.day;

		str = obj.year +'-'+ obj.month +'-'+ obj.day;

		return str;
	}

	getDateObj( dt_str:any )
	{
		let dt = new Date(dt_str);

		return {year: dt.getFullYear(), month: dt.getMonth() + 1, day: dt.getDate()};
	}

	setStartAndEndDate( interval:number )
	{
		let start_date = new Date(),
			end_date = new Date();

		end_date.setDate(end_date.getDate() + interval);

		this.start_date = this.getDateObj(start_date);
		this.end_date = this.getDateObj(end_date);
	}
}
