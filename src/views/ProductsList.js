import React from 'react';
import '../assets/styles/ProductsList.scss';
import ProductRow from "../components/ProductRow";
import Breadcrumbs from "../components/Breadcrumbs";
export default function ItemsList(props){
    return (
      <div className="container">
        <Breadcrumbs categories={props.categories} />
        <div className="list-products">
          {props.items.slice(0, 4).map((item, idx) => <ProductRow key={idx} info={item} categories={props.categories} />)}
        </div>
      </div>
    )
}