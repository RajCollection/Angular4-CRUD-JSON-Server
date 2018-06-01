import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

	products: string[]=[];
	constructor(private http:Http) { }
 
	fetchData(){
		return this.http.get('http://localhost:5555/products')
		.subscribe( res => {
		console.log(res.json())
		this.products = res.json()
		})
		
	}

	deleteProduct = function(id, product){
		if(confirm('Are ypou sure to delete product: '+ product+' ?')){
			const url = `${"http://localhost:5555/products"}/${id}`;
			return this.http.delete(url, {headers: this.headers}).toPromise()
			.then(() => {
				this.fetchData();
			})
		}
	}

	ngOnInit() {
		this.fetchData()
	}

}
