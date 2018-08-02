import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const convert = require('convert-units')
console.log(convert(1).from('R').to('C'));

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit',
  k: 'Kelvin',
  r: 'Rankine'
};

function toCelsius(value, tempScale) {
    return convert(value).from(tempScale.toUpperCase()).to('C');
}

function toFahrenheit(value, tempScale) {
  return convert(value).from(tempScale.toUpperCase()).to('F');
}

function toKelvin(value, tempScale) {
  return convert(value).from(tempScale.toUpperCase()).to('K');
}

function toRankine(value, tempScale) {
  return convert(value).from(tempScale.toUpperCase()).to('R');
}

function tryConvert(value, tempScale, convert) {
  const input = parseFloat(value);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input, tempScale);
  console.log(input);
  console.log(output);

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
    this.handleKelvinChange = this.handleKelvinChange.bind(this);
    this.handleRankineChange = this.handleRankineChange.bind(this);
    this.state = {value: '', scale: 'c'};
  }

  handleCelsiusChange(value) {
    this.setState({scale: 'c', value});
  }
  handleFahrenheitChange(value) {
    this.setState({scale: 'f', value});
  }
  handleKelvinChange(value) {
    this.setState({scale: 'k', value});
  }
  handleRankineChange(value) {
    this.setState({scale: 'r', value});
  }

  render() {
    const scale = this.state.scale;
    const value = this.state.value;

    const celsius = scale === 'c' ? value : tryConvert(value, scale, toCelsius);
    const fahrenheit = scale === 'f' ? value : tryConvert(value, scale, toFahrenheit);
    const kelvin = scale === 'k' ? value : tryConvert(value, scale, toKelvin);
    const rankine = scale === 'r' ? value : tryConvert(value, scale, toRankine);


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
        <TemperatureInput
          scale="k"
          value={kelvin}
          onChange={this.handleKelvinChange} />
        <TemperatureInput
          scale="r"
          value={rankine}
          onChange={this.handleRankineChange} />


      </div>
    );
  }
}

ReactDOM.render(
  <Calculator />,
  document.getElementById('app')
);
