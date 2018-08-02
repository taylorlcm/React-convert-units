import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const convert = require('convert-units')
console.log(convert(1).from('C').to('F'));

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

function toCelsius(fahrenheit) {
  return convert(fahrenheit).from('F').to('C');
}

function toFahrenheit(celsius) {
  return convert(celsius).from('C').to('F');
}

function tryConvert(value, convert) {
  const input = parseFloat(value);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}



class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onChange(e.target.value);
  }

  render() {
    const value = this.props.value;
    const scale = this.props.scale;
    return (
      <div className="container">
          <form>
            <div className= "form-group">
              <lable><h3>Enter Temperature in {scaleNames[scale]}: </h3></lable>
              <input className="form-control container text-center" id="focusedInputed" type="text" value={value}
                     onChange={this.handleChange} />
            </div>
          </form>
        </div>

    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {value: '', scale: 'c'};
  }

  handleCelsiusChange(value) {
    this.setState({scale: 'c', value});
  }

  handleFahrenheitChange(value) {
    this.setState({scale: 'f', value});
  }

  render() {
    const scale = this.state.scale;
    const value = this.state.value;

    const celsius = scale === 'f' ? tryConvert(value, toCelsius) : value;
    const fahrenheit = scale === 'c' ? tryConvert(value, toFahrenheit) : value;

    return (
      <div className="text-center container-fluid">
        <TemperatureInput
          scale="c"
          value={celsius}
          onChange={this.handleCelsiusChange} />
        <TemperatureInput
          scale="f"
          value={fahrenheit}
          onChange={this.handleFahrenheitChange} />

      </div>
    );
  }
}

ReactDOM.render(
  <Calculator />,
  document.getElementById('app')
);
