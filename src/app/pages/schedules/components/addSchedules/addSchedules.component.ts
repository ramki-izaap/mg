import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';

import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute, Params, Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import {MembershipsService} from "../../../../shared/services/memberships.service";
import {UsersService} from "../../../../shared/services/users.service";
import {SchedulesService} from "../../../../shared/services/schedules.service";



@Component({
  selector: 'add-schedules',
  templateUrl: './addSchedules.html',
})
export class addSchedules {

	data:any;
	public form:FormGroup;
	public rules:any= {};

	public height:AbstractControl;
	public weight:AbstractControl;
	public bmi:AbstractControl;
	public start_date:AbstractControl;
	public end_date:AbstractControl;
	public goal:AbstractControl;
	public specification:AbstractControl;
	public precaution:AbstractControl;
	public advice:AbstractControl;


	public id:any;

	public udata: any;
	
	public usersList:any = [];

	search = (text$: Observable<string>) =>
	text$
	  .debounceTime(200)
	  .map(term => term === '' ? []
	    : this.usersList.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

	formatter = (x: {name: string}) => x.name;

	constructor(	
			protected mservice: MembershipsService, 
			protected uservice: UsersService, 
			protected shservice: SchedulesService,
			private activatedRoute: ActivatedRoute, 
			private router: Router,
			public fb : FormBuilder) 
	{
		this.rules = {
				      'height': ['', Validators.compose([Validators.required])],
				      'weight': ['', Validators.compose([Validators.required])],
				      'bmi': ['', Validators.compose([Validators.required])],
				      'start_date': ['', Validators.compose([Validators.required])],
				      'end_date': ['', Validators.compose([Validators.required])],
				      'goal': ['', Validators.compose([Validators.required])],
				      'specification': ['', Validators.compose([Validators.required])],
				      'precaution': ['', Validators.compose([Validators.required])],
				      'advice': ['', Validators.compose([Validators.required])]
				    };

		this.form = this.fb.group( this.rules );

  		this.updateValues();

		this.udata = {name:'', id:0, email:''};
		
	}

	updateValues( )
	{
		let elms = Object.keys(this.rules);

		for( let i in elms )
		{
			this[elms[i]] = this.form.controls[elms[i]];
		}
	}

	ngOnInit() {
		
		this.uservice.list().map(res => res.json()).subscribe(res =>{
	         console.log(res);
	         for(let i in res )
	         {
	         	this.usersList.push({name:res[i].name, id:res[i].id, email:res[i].email}); 
	         }
	         
	         console.log(this.usersList);
	     });

		this.activatedRoute.params.subscribe((params: Params) => {
        	console.log(params);
        	if( typeof params['id'] != 'undefined' && params['id'] != '' )
        	{
        		this.shservice.get(params['id']).map(res => res.json()).subscribe(res =>{
			        console.log(res);

			        this.id = res.id;
			        this.udata = {name:res.user_name, id:res.user_id, email:res.email};

			        let elms = Object.keys(this.rules);

			        for( let i in elms )
					{
						//this[elms[i]] = this.form.controls[elms[i]];
						switch (elms[i]) 
						{
							case "start_date":
							case "end_date":
								let dt = res[ elms[i] ];
								this.form.controls[ elms[i] ].setValue( this.strToDateObj(dt) );
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

	onSelectionChange( sel:string )
	{
		
	}

	onSubmit( values:any )
	{
		console.log(values);

		if( this.form.invalid ) return;

		if( typeof this.udata['id'] == 'undefined' || !this.udata['id'] )
		{
			alert('Please select user.');
			return;
		}

		let data 			= Object.assign({}, this.form.value);

		data.start_date 	= this.dateObjToStr(data.start_date);
		data.end_date 		= this.dateObjToStr(data.end_date);
		data.user_id 		= this.udata.id;

		if( this.id )
		{
			data.id = this.id;
		}

		console.log(data);

		this.shservice.add(data).map(res => res.json()).subscribe(res =>{
	        console.log(res);
	        this.router.navigate(['/pages/schedules/list'], { queryParams: {}});
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
