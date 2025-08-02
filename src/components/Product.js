import React, {useState, useEffect} from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { getProduct } from '../store/productSlice';
import {useDispatch, useSelector} from 'react-redux'
import {add} from '../store/cartSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Dropdown } from 'react-bootstrap';

export default function Product() {
    // const [products, getProducts]= useState([]);
    // data:products here products is used as alias
    const {data: products, status} = useSelector(state => state.products);
    const dispatch =useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;
    const [filterName, setFilterName] = useState("");

  useEffect(()=>{
    // api
    // fetch('https://fakestoreapi.com/products')
    // .then(data => data.json())
    // .then(result => getProducts(result))

    // dispatch an action for fetchProduct
    dispatch(getProduct());

  },[])
 
  if(status === 'loading'){
    return <p>Loading...</p>
   }
  
   if(status === 'error'){
    return <p>Something went wrong.</p>
   }
  

   const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(filterName.toLowerCase())||
    product.category.toLowerCase().includes(filterName.toLowerCase())
  );

   const indexOfLastProduct = currentPage * productsPerPage;
   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
   const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
   const totalPages = Math.ceil(filteredProducts.length / productsPerPage);


   const handleNextPage = () => {
    if (currentPage < totalPages) {
        setCurrentPage(prev => prev + 1);
    }
};

const handlePrevPage = () => {
    if (currentPage > 1) {
        setCurrentPage(prev => prev - 1);
    }
};

  const addToCart = (product)=>{
    //dispatch an add action
    console.log('Adding to cart:', product); 
    dispatch(add(product))
  }

  

  const cards=currentProducts.map(product=>(
    <div className="col-12 col-md-6 col-lg-4" style={{marginBottom:'15px'}}>
         <Card key={product.id} className="h-100">
            <div className="text-center">
            <Card.Img variant="top" src={product.image} style={{width:'100px', height:'130px'}}/>
            </div>
     
      <Card.Body>
        <Card.Title className="product-title">{product.title}</Card.Title>
        <Card.Text className="mb-2 mt-2 product-text">
         {`$ ${product.price}`}
        </Card.Text>
        <Card.Text className="mb-2 mt-2 product-category">
         {product.category}
        </Card.Text>
      </Card.Body>
      <Card.Footer style={{background: 'white'}}>
        <div className="addToCart-button">
      <Button variant="primary" onClick={()=>addToCart(product)}>Add To Cart</Button>
      </div>
      </Card.Footer>
    </Card>
    </div>
))
  
    return (
    <>
      <div className="container product-top">
        <div className="filter">
        <div className="row mb-3">
                    <div className="col-md-3">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Search by name..." 
                            value={filterName}
                            onChange={(e) => setFilterName(e.target.value)}
                        />
                    </div>
                    {/* <div className="col-md-1">
                   
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {selectedPriceRange === "all" ? "Filter by Price" : selectedPriceRange}
                                Range
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item eventKey="all">All Prices</Dropdown.Item>
                                <Dropdown.Item eventKey="0-50">$0 - $50</Dropdown.Item>
                                <Dropdown.Item eventKey="51-100">$51 - $100</Dropdown.Item>
                                <Dropdown.Item eventKey="101-200">$101 - $200</Dropdown.Item>
                                <Dropdown.Item eventKey="200+">$200+</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div> */}
                    {/* <div className="col-md-1">
                        
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                           {selectedPriceRange === "all" ? "Filter by Price" : selectedPriceRange}
                                Category
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item eventKey="all">men's clothing</Dropdown.Item>
                                <Dropdown.Item eventKey="0-50">jewelery</Dropdown.Item>
                                <Dropdown.Item eventKey="51-100">electronics</Dropdown.Item>
                                <Dropdown.Item eventKey="101-200">women's clothing</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div> */}
                </div>
        </div>
        <div className="row">
            {cards}
        </div>
        <div className="pagination-controls text-center">
                    <Button  onClick={handlePrevPage}>
                    <FontAwesomeIcon icon={faChevronLeft} /> 
                    </Button>
                    <span className="pageCount">{currentPage}</span>
                    <Button onClick={handleNextPage}>
                    <FontAwesomeIcon icon={faChevronRight} /> 
                    </Button>
                </div>
      </div>
    </>
  );
}

