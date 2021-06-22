import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Order } from '../models/order.model';
import { AuthService } from '../auth/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
declare var paypal:any;

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent implements OnInit {
  @ViewChild('paypal', { static: true }) paypalElement!: ElementRef;
  order:Order = new Order();
  activeTab: string = "benefits";
  products:any[];
  
  constructor(private auth: AuthService,private router: Router) { 
    this.order.cardType = 'plastic';
    this.products = [
      {
        name: 'PVC NFC Card',
        price: 29.99,
        description: 'description test',
        image: 'assets/pvc-card.jpg',
        type: 'plastic',
        product_id: 1
      },
      {
        name: 'Metal NFC Card',
        price: 49.99,
        description: 'description test2',
        image: 'assets/pvc-card.jpg',
        type:  'metal',
        product_id: 2
      },
    ]
  }

  ngOnInit(): void {
    this.renderButton()
  }
  // clear paypal div, loop through products and renderthe one selected
  renderButton() {
    this.paypalElement.nativeElement.innerHTML = '';
    this.products.forEach(element => {
      if(this.order.cardType === element.type) {
        paypal
      .Buttons({
        createOrder: (data:any, actions:any) => {
          return actions.order.create({
            purchase_units: [
              {
                description: element.description,
                amount: {
                  currency_code: 'USD',
                  value: element.price
                }
              }
            ]
          });
        },
        onApprove: async (data:any, actions:any) => {
          const order = await actions.order.capture();
          //this.paidFor = true;
          console.log(order);
          console.log(this.order)
          let tmp = Object.assign({}, order, this.order)
          console.log(tmp)
          this.auth.updateOrderData(tmp).then(data=>{
            this.router.navigate(['/orderConfirmation'])
          })

        },
        onError: function(err:any) {
          console.log(err)
        }
      })
      .render(this.paypalElement.nativeElement);
      }
      
    });
  }
  

}
