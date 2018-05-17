import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Moment from 'react-moment';
import {Scoped} from 'kremling';
import ReactLoading from 'react-loading';

const css = `
  & a {
    text-decoration: none;
    color: #0235d0;
  }
`
const ReposTable = (props) => {
  return (
    <Table
        selectable={false}
        showCheckboxes={false}>
        <TableHeader 
          displaySelectAll={false}
          adjustForCheckbox={false}
        >
          <TableRow>
            <TableHeaderColumn>Stars</TableHeaderColumn>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Open Issues</TableHeaderColumn>
            <TableHeaderColumn>Last Updated</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {props.repos.map((repo) => (
            <TableRow key={repo.id}>
              <Scoped css={css}>
                <TableRowColumn>{repo.stargazers_count}</TableRowColumn>
                <TableRowColumn><a href={`${repo.html_url}`}>{repo.name}</a></TableRowColumn>
                <TableRowColumn><a href={`${repo.html_url}/issues`}>{repo.open_issues_count}</a></TableRowColumn>
                <TableRowColumn><Moment format="DD MMM YYYY">{repo.pushed_at}</Moment></TableRowColumn>
              </Scoped>
            </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
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
      console.log(result.items[0])
      this.setState({repos: result.items})
    }) 
  }
  render() {
    const loaderStyle = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center', /* center items vertically, in this case */
      alignItems: 'center',    /* center items horizontally, in this case */
      height: '300px'
    }
    return (
      <div>
        <h2>Canopy JS Repos by stars</h2>
        {this.state.repos 
          ? <ReposTable repos={this.state.repos} />
          : <div style={loaderStyle}><ReactLoading type="spin" color="0235d0" /></div>
        }
      </div>
    );
  }
}

export default Home;