import React, { Component } from 'react';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      repos: null
    }
  }
  componentDidMount() {
    fetch("https://api.github.com/search/repositories?q=user:CanopyTax+stars:%3E5+language:javascript&sort=stars&order=desc").then((response) => {
      return response.json()
    }).then((result) => {
      this.setState({repos: result.items})
    }) 
  }
  render() {
    return (
      <div>
        <h2>Canopy JS Repos by stars</h2>
        <ul>
          {this.state.repos ? 
            this.state.repos.map((repo) => (
              <li key={repo.id}>
                {repo.name}
              </li>
          ))
          : null}
        </ul>
      </div>
    );
  }
}

export default Home;