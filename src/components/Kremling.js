import React, { Component } from 'react';
import Highlight from 'react-highlight'
import {Scoped} from 'kremling';
import RaisedButton from 'material-ui/RaisedButton';

class Kremling extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      css: `
      & .kremling-content {
        width: 750px;;
        margin:0 auto;
        margin-top: 20px;
      }
      & img {
        position: absolute;
      }

      & .red {
        color: red;
      }
      & .spacer {
        height: 30px;
      }
      `,
      isCSSButtonDisabled: false
    }
  }

  handleToggleClick = () => {
    this.setState({isOpen: !this.state.isOpen})
  }

  handleFalseCSSClick = () => {
    this.setState({css: this.state.css + `& .false {background-color: #9b923e`, isCSSButtonDisabled: true})
  }
  
  render() {
    return (
      <Scoped css={this.state.css}>
        <div className="spacer"></div>
      <a href="https://github.com/CanopyTax/kremling"><img src="https://vignette.wikia.nocookie.net/donkeykong/images/0/04/Kremling.png/revision/latest?cb=20170724034259" alt ='Kremling'/></a>
          <div className='kremling-content'>
            <h1>Kremling CSS</h1>
            <p>There is often a temptation in React to apply conditional styling like so:</p>
            <Highlight language='javascript'>
              {`<div className={\`popup $\{this.state.isOpen && 'open'\}\`}`}
            </Highlight>
            <p>A major problem here is `this.state.isOpen && 'open'` is a Javascript <a href="http://2ality.com/2012/09/expressions-vs-statements.html">expression</a> meaning it produces a value. Pop open the console and I'll explain by example. If you type `kremling = false` into the console, then `kremling && 'open'`, the resulting value should be `false`. What if we set `kremling` to `true`? `undefined`? No matter the value of `kremling`, there will be a returned value and that value will hang out in our styling. This means we might very easily apply the class `false` or `undefined` on accident.</p>
            <p>The following code is an example on this very page.</p>
            <Highlight language='javascript'>
              {`this.state = {
  isOpen: false
}
...
<div className={\`content $\{this.state.isOpen && 'open'\}\`}>I am some cool content</div>`}
            </Highlight>
            <p>this.state.isOpen: <span className='red'>{JSON.stringify(this.state.isOpen)}</span></p>  
            <div className={`content ${this.state.isOpen && 'open'}`}>I am some cool content</div>
            <p>If you inspect element, you will see that the div above has two classes: `content` and `false`. This is because this.state.open is true.</p>
            <RaisedButton label="Toggle isOpen" onClick={this.handleToggleClick}></RaisedButton>
            <p>If we toggle `isOpen`, then you can see the class `open` is applied to the div.</p>
            <p>Let's apply the following CSS to the page:</p>
            <Highlight language='css'>{".false {background-color: #9b923e}"}</Highlight>
            <RaisedButton disabled={this.state.isCSSButtonDisabled} label="Add CSS" onClick={this.handleFalseCSSClick}></RaisedButton>
            <p>Now if we toggle IsOpen, we can see indeed this `false` is showing up. Imagine if this was happening dozens of times per page. The falsey class applications are out of control.</p>
            <p>One way to solve this is to invoke the Conditional (ternary) Operator:</p>
            <Highlight language='javascript'>
              {`className={completed ? "text-strike" : null}`}
            </Highlight>
            <p>But we can be more terse than that. Enter Kremling:</p>
            <Highlight language='javascript'>
              {`import { maybe } from "kremling";
...
className={maybe("text-strike", completed)}`}
            </Highlight>
            <p>What if we want to apply one class absolutely but another conditionally like we did earlier?</p>
            <Highlight language='javascript'>
              {`<div className={\`content $\{this.state.isOpen ?? 'open' : null\}\`}>I am some cool content</div>`}
            </Highlight>
            <Highlight language='javascript'>
              {`import { maybe as m, always as a } from "kremling";
...
<div className={a('content').m("open", this.state.isOpen)}>`}
            </Highlight>
            <h2>Next Up: CSS Scoping problems and the Kremling solution ></h2>
          </div>
      </Scoped>
    );
  }
}

export default Kremling;