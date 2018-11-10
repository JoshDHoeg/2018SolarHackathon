import React from 'react'
import Area from './area'
import Grid from '@material-ui/core/Grid';
import ROI from './roi';
import PROD from './prod';

export default class UtilityUsage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expenditure: {}}

  }

  componentDidMount(){

    this.setState({expenditure: this.props.expenditure});
  }


  render() {

    console.log(this.props);
    let areas = [];
    let avg = 0;
    let cost = 0;
    let costPer = 0;
    let prod = [];
    let annprod = 0;
    let peakprod = 0;
    let lowprod = 0;
    let savings = [];
    let savingann = 0;
    let savingpeak = 0;
    let savinglow = 0;


    if(this.props.expenditure){
      Object.keys(this.props.expenditure).forEach(key => {
        console.log(key);
        let value = this.props.expenditure[key].residential;
        let housing_units = this.props.expenditure[key].residential.housing_units;
        let elec_mwh  = this.props.expenditure[key].residential.elec_mwh;
        let elec_1kdollars  = this.props.expenditure[key].residential.elec_1kdollars;

        avg = Math.floor(elec_mwh/housing_units);
        cost = Math.floor(elec_1kdollars/housing_units * 1000);
        costPer = Math.floor(elec_1kdollars/elec_mwh * 1000);
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



    if(this.props.pvwatt) {
      annprod = Math.floor(parseFloat(this.props.pvwatt.ac_annual) * 0.1);
      prod.push(
        <div className="prod">
          <PROD value={annprod} text="Amount Produced Annually (kWH):"/>
        </div>
      )
      peakprod = Math.floor(parseFloat(this.props.pvwatt.ac_monthly.sort()[0]) * 0.1);
      prod.push(
        <div className="prod">
          <PROD value={peakprod} text="Amount Produced In Peak Month (kWH):"/>
        </div>
      )
      lowprod = Math.floor(parseFloat(this.props.pvwatt.ac_monthly.sort()[this.props.pvwatt.ac_monthly.length - 1]) * 0.1);
      prod.push(
        <div className="prod">
          <PROD value={lowprod} text="Amount Produced In Lowest Month (kWH):"/>
        </div>
      )

      let savingann = Math.floor((annprod*costPer)*0.001);
      let savingpeak = Math.floor((peakprod*costPer)*0.001);
      let savinglow = Math.floor((lowprod*costPer)*0.001);

      savings.push(
        <div className="save">
          <ROI value={savingann} />
          <h2>Yearly Savings (MWH):</h2>
        </div>
      )
      savings.push(
        <div className="save">
          <ROI value={savingpeak} />
          <h2>Peak Monthly Savings (MWH):</h2>
        </div>
      )
      savings.push(
        <div className="save">
          <ROI value={savinglow} />
          <h2>Low Months Savigns (MWH):</h2>
        </div>
      )
    }



      return (
        <div>
            <Grid container spacing={12} direction="column">
              {savings}
            </Grid>
            <Grid container spacing={12} direction="row">
              <Grid item sm={6}>
                {prod}
              </Grid>
              <Grid item sm={6}>
                {areas}
              </Grid>
            </Grid>
          </div>
      );
  }
}
