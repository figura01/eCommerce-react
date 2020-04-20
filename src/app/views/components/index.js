import React, { Fragment, useState, useEffect } from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import UserProfileContextProvider from '../../lib/userProfileContext';
import { Navbar } from '../../components';
import { CartPage } from './Cart';
import { Home } from './Home';
import { Checkout } from './Checkout';
import { Confirm}  from './Confirm'

import { list } from '../../data';
import '../../styles/App.css';


const App = props => {
  const { items, saveLocalStorage }  = props;
  const [category, setCategory] = useState(0);
  const [isFiltering, setFiltering] = useState(false);
  const [filtered, setFiltered] = useState(false);
  const [count, setCount] = useState(1);
  const loadCategory = i => {setCategory(i)};

  const filterResults = input => {
    let fullList = list.flat()
    let results = fullList.filter(item => {
      const name = item.name.toLowerCase();
      const term = input.toLowerCase()
      return name.indexOf(term) > -1
    })
    setFiltered(results)
  }

  useEffect(() => {
    console.log(isFiltering)
    saveLocalStorage(items)
    //setFiltering(!isFiltering)
  }, [items])

  return (
    <Fragment>
      <Router>
        <UserProfileContextProvider>
          <Navbar filter={filterResults} setFiltering={setFiltering} count={count}/>
          
          {/* Rout*/}
          <Route exact path='/' component={() => <Home 
                                                      category={category}
                                                      loadCategory={loadCategory}
                                                      list={list}  
                                                      isFiltering={isFiltering}  
                                                      filtered={filtered}  /> 
                                                    } />
          <Route path='/cart' component={CartPage} />
          <Route path='/checkout' component={Checkout} />
          <Route path='/delivery' component={Confirm} />
        </UserProfileContextProvider> 
      </Router>
    </Fragment>
  );
};

export default App;
