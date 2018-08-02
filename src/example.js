
const convert = require('convert-units')
console.log(convert(1).from('C').to('F'));


class Calculator extends React.Component{
  constructor (props){
    super (props);
     this.state = {number: '', tempScale: 'C'};
     this.changeC = this.changeC.bind(this);
     this.changeF = this.changeF.bind(this);
     this.changeK = this.changeK.bind(this);
     this.changeR = this.changeR.bind(this);
  }
    changeC(number) {
      this.setState({number, tempScale: 'C'});
    }
    changeF(number) {
      this.setState({number, tempScale: 'F'});
    }
    changeK(number) {
      this.setState({number, tempScale: 'K'});
    }
    changeR(number) {
      this.setState({number, tempScale: 'R'});
    }

    render(){

      return(
        <div>
          <Input tempScale = "C"
                 onChange = {this.changeC}
                 number = {this.state.number}
                 />
          <Input tempScale = "F"
                 onChange = {this.changeF}
                 number = {this.state.number}
                 />
          <Input tempScale = "K"
                 onChange = {this.changeK}
                 number = {this.state.number}
                 />
          <Input tempScale = "R"
                 onChange = {this.changeR}
                 number = {this.state.number}
                 />
        </div>

    );
  }
}

class Input extends React.Component{
  constructor (props){
    super (props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    const number = e.target.value;
    this.props.onChange(number);
  }
  render(){
    return(
      <div className="offset-md-3 col-md-6">
        <div className="form-group">
          <input type="text" className="form-control" id="tempInput"
                 value={this.props.number} onChange={this.handleChange}/>
          <label htmlFor="c">{this.props.tempScale}</label>
        </div>
      </div>

    );
  }
}
Input.propTypes = {
   number : PropTypes.number
};

ReactDOM.render(
  <Calculator />,
  document.getElementById('app')
);
