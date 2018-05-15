import React, { Component } from 'react'
import {Route} from 'react-router-dom'
import NavBar from './NavBar'
import {Scoped} from 'kremling';

const Home = () => {
  return (
    <div>Home</div>
  )
}

const Kremling = () => {
  return (
    <div>About</div>
  )
}
const Blog = () => {
  return (
    <div>Blog</div>
  )
}

const css = `
  & body {
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif;
  }

  & .container {
    max-width: 1200px;
    margin: 0 auto;
  }
`

class App extends Component {
  render() {
    return (
      <Scoped css={css}>
        <NavBar />
        <div className="container">
          <Route exact path="/" component={Home} />
          <Route path="/kremling" component={Kremling} />
          <Route path="/blog" component={Blog} />
        </div>
      </Scoped>
    );
  }
}

export default App;
