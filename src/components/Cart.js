import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useSelector, useDispatch } from 'react-redux'
import {remove, increaseQuantity, decreaseQuantity,  clearCart } from '../store/cartSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function Cart() {
    const products = useSelector(state => state.cart);
    const dispatch = useDispatch();
    
    const removeToCart =(id)=>{
      dispatch(remove(id));
    }

    const increaseQty = (id) => {
      dispatch(increaseQuantity(id));
    };
  
    const decreaseQty = (id) => {
      dispatch(decreaseQuantity(id));
    };
    const handleCheckout=()=>{
      localStorage.removeItem('cart');
      alert('Thank you for your purchase! Your cart has been cleared.');
      dispatch(clearCart());
      
    }
const cards=products.map(product=>(
        <div className="col-md-12" style={{marginBottom:'15px'}}>
             <Card key={product.id} className="h-100 cart-page">
                <div className="cart-image">
                <Card.Img variant="top" src={product.image} style={{width:'100px', height:'130px'}}/>
                </div>
         <div className="cart-content">
         <Card.Body>
            <Card.Title className="cart-title">{product.title}</Card.Title>
            <Card.Text  className="cart-text" style={{marginBottom:'0'}}>
             {`Price: $${product.price}`}
            </Card.Text>
         <div className="cart-incdec">
         <Button 
                  variant="secondary"
                  onClick={() => decreaseQty(product.id)}
                  
                  disabled={product.quantity <= 1}
                >
                  -
                </Button>
                <Card.Text  className="cart-quantity" style={{paddingLeft:'10px', paddingRight:'10px' }}>
           {product.quantity}
            </Card.Text>
                <Button
                  variant="secondary"
                  onClick={() => increaseQty(product.id)}
                
                >
                  +
                </Button>

          
         </div>
         <Card.Text  className="cart-total d-block d-sm-none mt-3" style={{marginBottom:'0'}} >
                {`Total: $${(product.price * product.quantity).toFixed(2)}`}
            </Card.Text> 
        
          </Card.Body>
          <Card.Footer style={{ background: 'white', display: 'flex', justifyContent:'center', alignItems:'center'}} className="cart-footer">
          <Button className="crossMark"
                 
                  onClick={() => removeToCart(product.id)}
                >
                <FontAwesomeIcon icon={faXmark} />
                </Button>
                <Card.Text  className="cart-total d-sm-block d-none" style={{marginBottom:'0'}} >
                {`Total: $${(product.price * product.quantity).toFixed(2)}`}
            </Card.Text>
              </Card.Footer>
         </div>
        
        </Card>
        </div>
    ))
      
  return (
    <div className="cart-section">
       <div className="row">
        {cards}
       </div>
        <div className="check-out">
          <button onClick={handleCheckout}>Check Out</button>
        </div>
    </div>
  )
}
