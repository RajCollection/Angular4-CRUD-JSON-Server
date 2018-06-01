import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
	selector: 'app-update',
	templateUrl: './update.component.html',
	styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
	id:number;
	products :[];
	data:object ={};
	productObj:object={};
	exists:boolean = false;
	private headers = new Headers({ 'Content-Type': 'application/json'});

	constructor(private router: Router, private route: ActivatedRoute, private http: Http) { }

	updateProduct(product){
		this.productObj = {
			"name": product.name,
			"color": product.color
		}

		const url = `${"http://localhost:5555/products"}/${this.id}`;
			this.http.put(url,JSON.stringify(this.productObj),{headers: this.headers})
			.toPromise()
			.then(() => {
				this.router.navigate(['/']);
			})
	}

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.id = +params['id'];
		})

		this.http.get('http://localhost:5555/products')
		.subscribe( res => {
		this.products = res.json()
		for(var i=0;i<this.products.length;i++){
			if(parseInt(this.products[i].id) === this.id){
				this.exists = true;
				this.data = this.products[i];
				break;
			}else{
				this.exists = false;
			}
		}
		})

	}
}
