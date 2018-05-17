import React, { Component } from 'react'
import {Route} from 'react-router-dom'
import NavBar from './NavBar'
import {Scoped} from 'kremling';
import Home from './Home';
import Kremling from './Kremling';

const css = `
  & body {
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif;
  }

  & .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 50px;
  }
`

class App extends Component {
  render() {
    return (
      <Scoped css={css}>
        <div className="container">
          <NavBar />
          <Route exact path="/" component={Home} />
          <Route path="/kremling" component={Kremling} />
        </div>
      </Scoped>
    );
  }
}

export default App;
