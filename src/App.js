import React, { useState } from 'react';
import {Switch, Route, Redirect, useHistory} from 'react-router-dom';
import ProductsList from './views/ProductsList'
import ProductShow from './views/ProductShow'
import './assets/styles/App.scss';

import {Search} from './components/searchInput'

function App() {
  let history = useHistory();
  const [results, setResults] = useState({});
  
  const getProducts = (q) => {
    fetch(`http://localhost:3001/api/items?q=${q}`).then(
      response => response.json().then(res => {
        if (res.error) {

        } else {
          setResults(res);
          history.push(`/items?search=${q}`);
        }
      })
    )
  }

  return (
    <div>
      <Search onSubmit={(q) => getProducts(q)} />
      <div className="app-content">
        <Switch>
          <Route exact path="/items">
            {
              results.items ?
                <ProductsList categories={results.categories} items={results.items} />
                : <Redirect to={"/"} />
            }
          </Route>
          <Route path="/items/:id" component={ProductShow} />
        </Switch>      
      </div>
    </div>
  )
}

export default App;
