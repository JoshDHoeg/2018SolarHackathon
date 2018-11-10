import React from 'react'
import Area from './area'

export default class UtilityUsage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {expenditure: {}}

  }

  componentDidMount(){
    this.setState({expenditure: this.props.expenditure})
  }


  render() {

    console.log(this.props.utilityRates);

    let areas = []
    if(this.props.expenditure){
      Object.keys(this.props.expenditure).forEach(key => {
        console.log(key);
        let value = this.props.expenditure[key].residential;
        let housing_units = this.props.expenditure[key].residential.housing_units;
        let elec_mwh  = this.props.expenditure[key].residential.elec_mwh;
        let elec_1kdollars  = this.props.expenditure[key].residential.elec_1kdollars;

        let avg = elec_mwh/housing_units;
        let cost = elec_1kdollars/housing_units * 1000;
        let costPer = elec_1kdollars/elec_mwh * 1000;
        areas.push(
          <div className="area">
            <h2>{key}</h2>
            <p>Average Electricity Usage: {avg}</p>
            <p>Average Cost Per Year: {cost}</p>
            <p>Cost Per MegaWatt: {costPer}</p>
          </div>)
        console.log(value);
      })
    }


    return (
      <div>
        <p>Your estimated Usage right now</p>
        {areas}
      </div>
    );
  }
}
