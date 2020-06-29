import React from 'react';
import {Link} from 'react-router-dom';
import '../assets/styles/ProductRow.scss';
import * as utils from '../utils';
export default function Item({ info, categories }) {

  return (
    <div className='item-container'>
      <Link to={{ pathname: `/items/${info.id}`, itemInfo: info, categories: categories }}>
        <div className='item-info' id={info.id}>
          <img src={info.picture} alt={info.title} />
          <div className='item-general-info'>
            <div className='item-price'>{utils.formatPrice(info.price)}{info.price.decimals ? <span className='item-price-decimals'>{info.price.decimals}</span> : null}</div>
            {info.free_shipping ? <i className='item-price-free-shipping' /> : null}
            <div className='item-title'>{info.title}</div>
          </div>
          <div className='item-location'>
            <p>{info.state}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}