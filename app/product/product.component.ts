import { Component, OnInit } from '@angular/core';
import {Http, Response, Headers } from '@angular/http';
import {Router} from '@angular/router'; 

@Component({
	selector: 'app-product',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {

	constructor(private http:Http,private router: Router) { }
	confirmationString:string = "New product has been added";
	isAdded:boolean=false;

	productObj:object = {};

	addNewProduct(product){
		this.productObj = {
			"name": product.name,
			"color": product.color
		}

		this.http.post('http://localhost:5555/products/', this.productObj)
			.subscribe(res => {
			console.log(res.json())
			this.isAdded = true;
			this.router.navigate(['/']); 
			})
	}

	ngOnInit() {
	}

}
