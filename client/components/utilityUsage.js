import React from 'react'
import Area from './area'
import Grid from '@material-ui/core/Grid';
import ROI from './roi';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
});

class UtilityUsage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expenditure: {}}

  }

  componentDidMount(){

    this.setState({expenditure: this.props.expenditure});
  }


  render() {
    const {classes} = this.props;

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
          <Area name={key} {...{avg, cost, costPer}} />
          // <div className="area">
          //   <h2>{key}</h2>
          //   <p>Average Electricity Usage: {avg}</p>
          //   <p>Average Cost Per Year: {cost}</p>
          //   <p>Cost Per MegaWatt: {costPer}</p>
          // </div>
          )
        console.log(value);
      })
    }



    if(this.props.pvwatt) {
      annprod = Math.floor(parseFloat(this.props.pvwatt.ac_annual) * 0.001);
      prod.push(
        <div className="prod">
          <h2>Amount Produced Annually (MWH):</h2>
          <p>{annprod}</p>
        </div>
      )
      peakprod = Math.floor(parseFloat(this.props.pvwatt.ac_monthly.sort()[0]) * 0.001);
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

      let savingann = Math.floor(annprod*costPer);
      let savingpeak = Math.floor(peakprod*costPer);
      let savinglow = Math.floor(lowprod*costPer);

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
        <div className={classes.root}>
          {/* <Grid container spacing={12} direction="column">
            {savings}
          </Grid>
          <Grid container spacing={12} direction="row">
            <Grid item sm={6}>
              {prod}
            </Grid>
          </Grid>
          <Grid container spacing={12} direction="row">
            <Grid item xs={12}>
              {areas}
            </Grid>
          </Grid> */}
          <Grid container spacing={16} direction="column">
            <Grid item xs={12}>
              <Grid container spacing={16} direction="row">
                  {areas}
              </Grid>
            </Grid>
            
          </Grid>
        </div>
      );
  }
}

UtilityUsage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UtilityUsage);