import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/SearchInput.scss';
import logo from '../assets/images/Logo_ML.png';

export function Search(props) {

  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit(searchValue);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-logo">
          <Link to={'/'}>
            <img src={logo} alt="Logo Mercado Libre" />
          </Link>
        </div>
        <div className="search">
          <form className="flex" onSubmit={(event) => handleSubmit(event)}>
            <input className="search-box-input" type="text" placeholder="Nunca dejes de buscar"
              onKeyUp={(e) => setSearchValue(e.target.value)} />
            <button type="submit" className="flex search-box-btn" />
          </form>
        </div>
      </div>
    </header>
  );

}