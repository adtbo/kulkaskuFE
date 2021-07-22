import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Hero from "../../component/hero/hero";
import Navbar from "../../component/navbar/navbar";
import Content from "../../component/Content/Content";
import HomepageContent from "../../component/Homepage/Homepage";
import ProductList from "../../component/ProductList/ProductList";

const Home = () => (
  <div className="bg-yellow-50">
    <Navbar />
    <BrowserRouter>
      <Switch>
        <Route path="/categories/:id">          
          <ProductList />
        </Route>
        <Route path="/">
          <Hero content={<HomepageContent />} />
          <Hero content={<Content />} />
        </Route>        
      </Switch>
    </BrowserRouter>
    
  </div>
);

export default Home;
