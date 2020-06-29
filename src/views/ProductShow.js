import React, { useState, useEffect } from 'react';
import '../assets/styles/ProductShow.scss';
import * as utils from '../utils';

export default function ItemDetail(props) {

  const id = props.match.params.id;
  const [itemInfo, setItemInfo] = useState({});
  const [errorMsg, showErrorMsg] = useState({ error: false, text: '' });

  useEffect(() => {
    fetch(`http://localhost:3001/api/items/${id}`)
      .then(response => response.json())
      .then(response => {
        if (response.error) {
          let text;
          switch (response.status) {
            case 404: text = '404'; break;
            case 500: text = '500'; break;
            default: text = 'Undefined error'; break;
          }
          showErrorMsg({ error: true, text: text });
        } else {
          setItemInfo(response.item);
        }
      })
      .catch(error => {
        console.error(error);
        showErrorMsg({ error: true, text: 'Ups! Algo salió mal. Probá nuevamente más tarde' });
      });;
  }, [id]);

  return (
    errorMsg.error ? <p>{errorMsg.text}</p> :
      itemInfo.id ? <div className='container'>
        <div className='item-detail-container'>
          <div className='item-detail-first-row'>
            <div className='item-detail-img-container'>
              <img src={itemInfo.picture} alt={itemInfo.title} />
            </div>
            <div className={'item-detail-info'}>
              <p className={'item-detail-condition-sold'}>
                {`${itemInfo.condition === 'new' ? 'Nuevo' : 'Usado'} - ${itemInfo.sold_quantity} vendidos`}
              </p>
              <div className={'item-detail-title'}>{itemInfo.title}</div>
              <div className={'item-detail-price'}>
                {utils.formatPrice(itemInfo.price)}
                {itemInfo.price.decimals ?
                  <span className={'item-price-decimals'}>{itemInfo.price.decimals}</span> : null}
              </div>
              <button className={'item-detail-buy'}>Comprar</button>
            </div>
          </div>
          <div className={'item-detail-description'}>
            <p className={'item-detail-description-title'}>Descripción del producto</p>
            <p className={'item-detail-description-text'}>{itemInfo.description}</p>
          </div>
        </div>
      </div> : <p>Loader</p>
  );
};