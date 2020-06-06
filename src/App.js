import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import pages from './config/pages';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import { CartContextProvider } from './contexts/Cart';
import { FavoritesContextProvider } from './contexts/Favorites';
import { CompareContextProvider } from './contexts/Compare';


function App() {
  return (
    <CartContextProvider>
      <CompareContextProvider>
      <FavoritesContextProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Layout>
            <Switch>
              {Object.keys(pages).map((key) => {
                return <Route path={pages[key].url} exact component={pages[key].component} key={key}></Route>
              })}
            </Switch>
          </Layout>
        </BrowserRouter>
      </FavoritesContextProvider>
      </CompareContextProvider>
    </CartContextProvider>
  );
}

export default App;
