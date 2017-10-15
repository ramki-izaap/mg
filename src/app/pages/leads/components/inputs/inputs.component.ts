import {Component,ViewChild } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute, Params, Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';




import {MembershipsService} from "../../../../shared/services/memberships.service";
import {UsersService} from "../../../../shared/services/users.service";

@Component({
  selector: 'inputs',
  templateUrl: './inputs.html'
})
export class Inputs {

	public form:FormGroup; 
	public rules:any= {};

	public id:number;

	//Personal details
	public name:AbstractControl;
	public sex:AbstractControl;
	public age:AbstractControl;
	public mobile_no:AbstractControl;
	public occupation:AbstractControl;
	public email:AbstractControl;
	public facebook:AbstractControl;
	public refference:AbstractControl;
	public referred_by:AbstractControl;
	
	public amount:AbstractControl;
	public expect_at:AbstractControl;

	public co_ordinator:AbstractControl;
	public co_ordinator_no:AbstractControl;

	public comments:AbstractControl;

	public memberships:any = [];	
	public fitness_goals = [];
	public heard_froms:any = [];

	public membership_type:any;	
	public fitness_goal:any;
	public heard_from:any;
	public show_referred_by:number = 1;
  	constructor(	
  			protected mservice: MembershipsService, 
  			protected uservice: UsersService, 
  			private activatedRoute: ActivatedRoute, 
  			private router: Router,
  			public fb : FormBuilder) 
  	{

  		this.fitness_goals = [
  								{key:'WEIGHT_LOSS', name:'WEIGHT LOSS'},
  								{key:'GENERAL_FITNESS', name:'GENERAL FITNESS'},
  								{key:'TONE_UP', name:'TONE UP'},
  								{key:'BULKING_UP', name:'BULKING UP'},
  							];
  		this.heard_froms = [
  								{key:'PAPER_ADS', name:'PAPER ADS'},
  								{key:'FLYERS', name:'FLYERS'},
  								{key:'SOCIAL_MEDIA', name:'SOCIAL MEDIA'},
  								{key:'WEBSITE', name:'WEBSITE'},
  								{key:'FRIENDS', name:'FRIENDS'},
  								{key:'PASSING_BY', name:'PASSING BY'}
  							];

  		this.fitness_goal 	= this.fitness_goals[0];
  		this.heard_from 	= this.heard_froms[0];

  		this.rules = {
				      'name': ['', Validators.compose([Validators.required])],
				      'age': ['', Validators.compose([Validators.required])],
				      'sex': ['M', Validators.compose([])],
				      'email': ['', Validators.compose([Validators.required, Validators.email])],
				      'facebook': ['', Validators.compose([])],
				      'mobile_no': ['', Validators.compose([Validators.required])],
				      'occupation': ['', Validators.compose([])],
				      'refference': ['1', Validators.compose([])],
				      'referred_by': ['', Validators.compose([])],
				      

				      'amount': ['', Validators.compose([])],
				      'expect_at': ['', Validators.compose([])],

				      'co_ordinator': ['', Validators.compose([])],
				      'co_ordinator_no': ['', Validators.compose([])],

				      'comments': ['', Validators.compose([])]
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
		

		this.mservice.list().map(res => res.json()).subscribe(res =>{
	        
	        this.memberships = res;
	        
	        if( this.memberships.length )	   
	        {
	        	//this.form.controls['membership_type'].setValue(this.memberships[0]);
	        	this.membership_type = this.memberships[0];

	        	let dts = this.getDatesByInterval( parseInt(this.memberships[0].duration) );
	        	//this.form.controls['start_date'].setValue( this.strToDateObj(dts.start_date) );
				//this.form.controls['end_date'].setValue( this.strToDateObj(dts.end_date) );
				
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
			        

			        let elms = Object.keys(this.rules);

					for( let i in elms )
					{
						//this[elms[i]] = this.form.controls[elms[i]];
						switch (elms[i]) 
						{
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


	submitData()
	{
		if( this.form.invalid ) return;

		let data 			= Object.assign({}, this.form.value);

		data.membership_id 	= this.membership_type.id;
		data.fitness_goal 	= this.fitness_goal.key;
		data.heard_from 	= this.heard_from.key;
		//data.amount 		= '1000';

		if( this.id )
		{
			data.id = this.id;
		}
		
		console.log('data', data);		

		this.uservice.addLead( data ).map(res => res.json()).subscribe(res =>{
	        console.log(res); 
	        let msg = 'Lead added successfully!.';
	        if( this.id )
	        {
	        	msg = 'Record updated successfully!.';
	        }

	        alert(msg);

	        this.router.navigate(['/pages/leads/users-list'], { queryParams: {}});
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

	handleChange(e)
	{
		console.log(e.target.value, e);
		this.show_referred_by = e.target.value;
	}
}
