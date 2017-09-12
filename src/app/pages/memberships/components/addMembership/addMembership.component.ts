import {Component} from '@angular/core';
import { ActivatedRoute, Params, Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import {MembershipsService} from "../../../../shared/services/memberships.service";

@Component({
  selector: 'add-memberships',
  templateUrl: './addMembership.html',
})
export class AddMembership {

	data:any;
	public name:string;
	public description:string;
	public duration:string;
	public amount:string;
	public id:any;

	constructor(protected mservice: MembershipsService, private activatedRoute: ActivatedRoute, private router: Router) {
		
	}

	ngOnInit() {
		this.activatedRoute.params.subscribe((params: Params) => {
        	console.log(params);
        	if( typeof params['id'] != 'undefined' && params['id'] != '' )
        	{
        		this.mservice.get(params['id']).map(res => res.json()).subscribe(res =>{
			        console.log(res);

			        this.id = res.id;
			        this.name = res.name;
			        this.description = res.description;
			        this.duration = res.duration;
			        this.amount = res.amount;
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

	submitData()
	{
		console.log(this);

		let fd = new FormData();

		fd.append( 'name', this.name );
		fd.append( 'description', this.description );
		fd.append( 'duration', this.duration );
		fd.append( 'amount', this.amount );

		if( this.id )
		{
			fd.append( 'id', this.id );
		}

		this.mservice.add(fd).map(res => res.json()).subscribe(res =>{
	        console.log(res);
	        this.router.navigate(['/pages/memberships/smarttables'], { queryParams: {}});
	    });

		//this.router.navigate(['/pages/memberships/smarttables'], { queryParams: {}});
	}
}
