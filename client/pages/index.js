import React from 'react'
import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'
import Dashboard from '../components/dashboard'
import axios from 'axios';

const usdaInstance = axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyAXv_Ffe-izY9slVX5D8kpDt_YWIzC-vQU'
});


export default class Home extends React.Component {

  constructor() {
    super();
    this.state = {address: '', lat: '', long: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData () {
    usdaInstance.get()
    .then(res => {
      const zipdata = res.data;
      console.log(zipdata);
      });
  }

  handleChange(event) {
    this.setState({address: event.target.value});
  }

  handleSubmit(event) {
    this.loadData();
    event.preventDefault();
  }


  render() {
    return (
      <div>
        <Head title="Home" />
        <Nav />


        <header className="App-header" >
          <div className="App-header-info">
            <h1 className="App-title">Welcome to Daddy</h1>
            <p>Enter an address to find the cost of a solar plan</p>
            <form onSubmit={this.handleSubmit}>
              <label>
                <input className="input-zip" type="text" value={this.state.address} onChange={this.handleChange} />
              </label>
              <input className="input-submit" type="submit" value="Submit" />
            </form>
          </div>
        </header>

        <Dashboard />

      </div>
    );
  }
}
