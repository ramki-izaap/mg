import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';

import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute, Params, Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import {MembershipsService} from "../../../../shared/services/memberships.service";
import {UsersService} from "../../../../shared/services/users.service";
import {SchedulesService} from "../../../../shared/services/schedules.service";
import {PaymentsService} from "../../../../shared/services/payments.service";


@Component({
  selector: 'add-payments',
  templateUrl: './add.html',
})
export class Add {

	public pay_amount:any;
	public memberships:any = [];
	public membership_details:any = {};
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
			protected pservice: PaymentsService,
			private activatedRoute: ActivatedRoute, 
			private router: Router,
			public fb : FormBuilder) 
	{
		this.udata = {name:'', id:0, email:''};		
	}

	ngOnInit() {
		
		this.mservice.list().map(res => res.json()).subscribe(res =>{
	        
	        //this.memberships = res;
	        for( let i in res )
	        {
	        	if( typeof this.memberships[res[i].id] == 'undefined' ) 
	        	{
	        		this.memberships[res[i].id] = {};
	        	}

	        	this.memberships[res[i].id] = res[i];

	        }

	        console.log(this.memberships);    
	        
	    });

		this.uservice.list().map(res => res.json()).subscribe(res =>{
	         console.log(res);
	         for(let i in res )
	         {
	         	this.usersList.push({name:res[i].name, 
	         							id:res[i].id, 
	         							email:res[i].email, 
	         							mh_id:res[i].mh_id, 
	         							amount:res[i].amount}); 
	         }
	         
	         console.log(this.usersList);
	    });


	    this.activatedRoute.params.subscribe((params: Params) => {
        	console.log(params);
        	if( typeof params['id'] != 'undefined' && params['id'] != '' )
        	{
        		this.pservice.get(params['id']).map(res => res.json()).subscribe(res =>{
			        console.log(res);

			        this.id = params['id'];
			        this.udata = {name:res.user_name, 
			        				id:res.user_id, 
			        				email:res.email,
			        				mh_id:res.mh_id,
			        				amount:res.mh_amount
			        			};

			        this.pay_amount = res.amount;	

			        this.getMembershipDetails( this.udata );

					
			    });
        	}
      	});

		
	}

	getMembershipDetails(obj:any)
	{
		console.log(obj);
		
		let mh_id = obj.mh_id || 0,
			user_id = obj.id || 0;

		if( typeof this.memberships[mh_id] != 'undefined' )
		{
			this.membership_details = this.memberships[mh_id];

			this.mservice.getPaidAmount(user_id, mh_id).map(res => res.json()).subscribe(res =>{
		         console.log('getPaidAmount', res);
		         if( this.id )
		         {
		         	res.amount = parseFloat(res.amount) - parseFloat(this.pay_amount);
		         }
		         this.membership_details.paid_amount = parseFloat(res.amount).toFixed(2);

		         let ba = parseFloat( this.membership_details.amount ) - parseFloat(res.amount);
		         this.membership_details.balance_amount = ba;
		    });
		}
	}

	
	payAmount()
	{
		if( typeof this.membership_details['id'] == 'undefined' || !this.membership_details['id'] )
		{
			alert('Please select user.');
			return;
		}

		if( parseFloat(this.pay_amount) <= 0 )
		{
			alert('Please enter amount to pay.');
			return;
		}

		let data:any = {amount:this.pay_amount};
			data.user_id = this.udata.id;
			data.mh_id = this.udata.mh_id
		
		if( this.id ) data.id = this.id;
		console.log(data);

		this.mservice.addPayment(data).map(res => res.json()).subscribe(res =>{
	        
	        this.router.navigate(['/pages/payments/list'], { queryParams: {}});
	    });

	}

	
}
