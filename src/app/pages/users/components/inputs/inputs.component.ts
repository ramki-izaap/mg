import {Component,ViewChild } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute, Params, Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';




import {MembershipsService} from "../../../../shared/services/memberships.service";
import {UsersService} from "../../../../shared/services/users.service";

import {AppSettings} from '../../../../shared/appSettings';
import { NgUploaderOptions } from 'ngx-uploader';

@Component({
  selector: 'inputs',
  templateUrl: './inputs.html',
  styleUrls: ['./inputs.scss']
})
export class Inputs {

	public defaultPicture = 'assets/img/theme/no-photo.png';
	public profile:any = {
	    picture: 'assets/img/theme/no-photo.png'
	  };

	public uploaderOptions:NgUploaderOptions = {
	    url: AppSettings.API_ENDPOINT+'user/upload',
	  };

	public form:FormGroup;
	public rules:any= {};

	public id:number;

	//Personal details
	public name:AbstractControl;
	public age:AbstractControl;
	public email:AbstractControl;
	public facebook:AbstractControl;
	public sex:AbstractControl;
	public martial_status:AbstractControl;

	//public dob:AbstractControl;
	public mobile_no:AbstractControl;
	public resident_no:AbstractControl;
	public address:AbstractControl;
	public referred_by:AbstractControl;
	
	//Emergency contact details
	public contact_name:AbstractControl;
	public contact_relationship:AbstractControl;
	public contact_mobile_no:AbstractControl;
	public contact_resident_no:AbstractControl;

	//Office Info
	//public membership_type:AbstractControl;
	public membership_no:AbstractControl;
	//public start_date:AbstractControl;
	//public end_date:AbstractControl;
	public amount:AbstractControl;
	public reason:AbstractControl;

	public memberships:any = [];	
	public dob_config:any = {}; //to set max and min date for DOB field
	public anniversary_config:any = {}; //to set max and min date for anniversary field

	public dob:any;
	public anniversary_date:any;
	public membership_type:any;
	public start_date:any;
	public end_date:any;
	public profile_image:string;
  	constructor(	
  			protected mservice: MembershipsService, 
  			protected uservice: UsersService, 
  			private activatedRoute: ActivatedRoute, 
  			private router: Router,
  			public fb : FormBuilder) 
  	{
  		this.rules = {
				      'name': ['', Validators.compose([Validators.required])],
				      'age': ['', Validators.compose([Validators.required])],
				      'sex': ['M', Validators.compose([])],
				      'martial_status': ['S', Validators.compose([])],
				      'email': ['', Validators.compose([Validators.required, Validators.email])],
				      'facebook': ['', Validators.compose([])],
				      //'dob': [this.strToDateObj( new Date() ), Validators.compose([])],
				      'mobile_no': ['', Validators.compose([Validators.required])],
				      'resident_no': ['', Validators.compose([])],
				      'address': ['', Validators.compose([])],
				      'referred_by': ['', Validators.compose([])],
				      

				      'contact_name': ['', Validators.compose([Validators.required])],
				      'contact_relationship': ['', Validators.compose([])],
				      'contact_mobile_no': ['', Validators.compose([Validators.required])],
				      'contact_resident_no': ['', Validators.compose([])],

				      //'membership_type': [{id:0}, Validators.compose([])],
				      'membership_no': [this.getUniqueID(), Validators.compose([])],
				      //'start_date': [this.strToDateObj( new Date() ), Validators.compose([])],
				      //'end_date': [this.strToDateObj( new Date() ), Validators.compose([])],
				      'amount': ['', Validators.compose([])],
				      'reason': ['', Validators.compose([])]
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

	ngOnInit() 
	{		
		this.dob_config.minDate = {year:1917, month:1, day: 1};
		this.dob_config.maxDate = this.strToDateObj( new Date() );

		this.anniversary_config.minDate = {year:1950, month:1, day: 1};
		this.anniversary_config.maxDate = this.strToDateObj( new Date() );

		this.mservice.list().map(res => res.json()).subscribe(res =>{
	        
	        this.memberships = res;
	        
	        if( this.memberships.length )	   
	        {
	        	//this.form.controls['membership_type'].setValue(this.memberships[0]);
	        	this.membership_type = this.memberships[0];

	        	let dts = this.getDatesByInterval( parseInt(this.memberships[0].duration) );
	        	//this.form.controls['start_date'].setValue( this.strToDateObj(dts.start_date) );
				//this.form.controls['end_date'].setValue( this.strToDateObj(dts.end_date) );
				this.start_date = this.strToDateObj(dts.start_date);
				this.end_date = this.strToDateObj(dts.end_date);
				this.form.controls['amount'].setValue( this.memberships[0].amount );
	        }     
	        
	    });

	    this.activatedRoute.params.subscribe((params: Params) => {
        	console.log(params);
        	if( typeof params['id'] != 'undefined' && params['id'] != '' )
        	{
        		this.uservice.get(params['id']).map(res => res.json()).subscribe(res =>{
			        console.log(res);

			        this.id = params['id'];
			        this.dob = this.strToDateObj(res['dob']);
			        this.start_date = this.strToDateObj(res['start_date']);
			        this.end_date = this.strToDateObj(res['end_date']);
			        this.anniversary_date = this.strToDateObj(res['anniversary_date']);
			        this.profile.picture = AppSettings.API_ENDPOINT+'uploads/'+res['profile_image'];
			        this.profile_image = res['profile_image'];

			        let elms = Object.keys(this.rules);

					for( let i in elms )
					{
						//this[elms[i]] = this.form.controls[elms[i]];
						switch (elms[i]) 
						{
							case "dob":
							case "start_date":
							case "end_date":
								let dt = res[ elms[i] ];
								//this.form.controls[ elms[i] ].setValue( this.strToDateObj(dt) );
								break;

							case "membership_type":

								console.log(res['membership_id'], this.memberships)
								let sel_ms = {};
								for( let j=0; j<this.memberships.length; j++ )
								{
									if( this.memberships[j].id == res['membership_id'] )
									{
										sel_ms = this.memberships[j];
										break;
									}
								}
								this.form.controls[ elms[i] ].setValue(sel_ms);
								break;

							default:
								this.form.controls[ elms[i] ].setValue(res[ elms[i] ]);
								break;
						}
						
					}

					this.updateValues();
			    });
        	}
      	});

	}

	updateAge( e )
	{
		let dt = this.dateObjToStr( e );
		let age = this.calculateAge( new Date(dt) );

		this.form.controls['age'].setValue(age);
	}

	onUploadCompleted( e )
	{
		let resp = JSON.parse( e.response );
		if( typeof resp.error !== 'undefined' )
		{
			alert('Please upload image.');
			return true;
		}

		this.profile_image = resp.upload_data.file_name;
	}


	submitData()
	{
		if( this.form.invalid ) return;

		let data 			= Object.assign({}, this.form.value);

		data.dob 			= this.dateObjToStr(this.dob);
		data.start_date 	= this.dateObjToStr(this.start_date);
		data.end_date 		= this.dateObjToStr(this.end_date);
		data.membership_id 	= this.membership_type.id;
		data.profile_image 	= this.profile_image;
		data.anniversary_date 	= this.dateObjToStr(this.anniversary_date);
		//data.amount 		= '1000';

		if( this.id )
		{
			data.id = this.id;
		}
		
		console.log('data', data);		

		this.uservice.add( data ).map(res => res.json()).subscribe(res =>{
	        console.log(res);
	        let msg = 'User added successfully!.';
	        if( this.id )
	        {
	        	msg = 'Record updated successfully!.';
	        }

	        alert(msg);

	        this.router.navigate(['/pages/users/users-list'], { queryParams: {}});
	    });

	}

	getUniqueID()
	{
		let str = Math.random().toString(36).substring(2);
		if( typeof str == 'string' ) str = str.toUpperCase();
		return str;
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

	getDatesByInterval( interval:number )
	{
		let start_date = new Date(),
			end_date = new Date();

		end_date.setDate(end_date.getDate() + interval);

		return {start_date:start_date, end_date:end_date};

		/*this.form.controls['start_date'].setValue( this.strToDateObj(start_date) );
		this.form.controls['end_date'].setValue( this.strToDateObj(end_date) );*/
	}

	calculateAge( birthday ) 
	{ 
	    var ageDifMs = Date.now() - birthday.getTime();
	    var ageDate = new Date(ageDifMs); // miliseconds from epoch
	    return Math.abs(ageDate.getUTCFullYear() - 1970);
	}
}
