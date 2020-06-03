import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import pages from './config/pages';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';


function App() {
  return (
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
  );
}

export default App;
