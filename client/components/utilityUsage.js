import React from 'react'
import Area from './area'
import Grid from '@material-ui/core/Grid';

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

        avg = elec_mwh/housing_units;
        cost = elec_1kdollars/housing_units * 1000;
        costPer = elec_1kdollars/elec_mwh * 1000;
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
      annprod = parseFloat(this.props.pvwatt.ac_annual) * 0.001;
      prod.push(
        <div className="prod">
          <h2>Amount Produced Annually (MWH):</h2>
          <p>{annprod}</p>
        </div>
      )
      peakprod = parseFloat(this.props.pvwatt.ac_monthly.sort()[0]) * 0.001;
      prod.push(
        <div className="prod">
          <h2>Amount Produced In Peak Month (MWH):</h2>
          <p>{peakprod}</p>
        </div>
      )
      lowprod = parseFloat(this.props.pvwatt.ac_monthly.sort()[this.props.pvwatt.ac_monthly.length - 1]) * 0.001;
      prod.push(
        <div className="prod">
          <h2>mount Produced In Lowest Month (MWH):</h2>
          <p>{lowprod}</p>
        </div>
      )

      let savingann = annprod*costPer;
      let savingpeak = peakprod*costPer;
      let savinglow = lowprod*costPer;

      savings.push(
        <div className="save">
          <h2>Saved In Production Year (MWH):</h2>
          <p>{savingann}</p>
        </div>
      )
      savings.push(
        <div className="save">
          <h2>Saved In Peak Production Month (MWH):</h2>
          <p>{savingpeak}</p>
        </div>
      )
      savings.push(
        <div className="save">
          <h2>Saved In Lowest Production Month (MWH):</h2>
          <p>{savinglow}</p>
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
