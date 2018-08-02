class Calculator extends React.Component{
  constructor(props) {
    super(props);
    this.state = {color:"red"};
}
    render() {
      return(
      <div>
      <section>
      <h1>Color</h1>
      <h3>Name</h3>
      <p>{this.state.color}</p>
      <h3>Hex</h3>
      <p>
        {(() => {
          switch (this.state.color) {
            case "red":   return "#FF0000";
            case "green": return "#00FF00";
            case "blue":  return "#0000FF";
            default:      return "#FFFFFF";
          }
        })()}
      </p>
    </section>
    </div>
    );
  }
}



ReactDOM.render(
  <Calculator />,
  document.getElementById('app')
);
