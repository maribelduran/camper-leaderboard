import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Table from './components/table'

const PATH_BASE = 'https://fcctop100.herokuapp.com/api/fccusers/top';

class App extends Component {
  constructor(props){
    super(props);

    this.state= {
      results: null,
      isLoading: false,
      reverseSortOn: null,
      error: null,
    }
    this.fetchTopRecentCampers = this.fetchTopRecentCampers.bind(this);
    this.fetchAllTimeCampers = this.fetchAllTimeCampers.bind(this);
    this.setCamperResults = this.setCamperResults.bind(this);
    this.getCampersData = this.getCampersData.bind(this);
    this.onChangeSortOn = this.onChangeSortOn.bind(this);
  }

  fetchTopRecentCampers() {
    const reverseSortOn = 'recent';
    this.setState({
      isLoading: true,
      reverseSortOn: reverseSortOn,
    });
    
    return fetch(`${PATH_BASE}/${reverseSortOn}`)
    .then(response => response.json())
    .catch(e => this.setState({ error: e}));
  }  

  fetchAllTimeCampers(){
    const reverseSortOn = 'alltime';
    this.setState({
        isLoading: true,
        reverseSortOn: reverseSortOn,
    });

   return  fetch(`${PATH_BASE}/${reverseSortOn}`)
    .then(response => response.json())
    .catch(e => this.setState({ error: e}));
  }
  
  setCamperResults(result) {
    const {reverseSortOn, results } = this.state
    this.setState({ 
      results: {
        ...results, 
        [reverseSortOn]: result
      },
      isLoading: false
    });
  }

  onChangeSortOn(sortOn){
      this.setState({
        reverseSortOn: sortOn,
      });
  }

  async getCampersData(){
    try{
      const topRecentCampers = await this.fetchTopRecentCampers();
      this.setCamperResults(topRecentCampers);
      const allTimeCampers = await this.fetchAllTimeCampers();
      this.setCamperResults(allTimeCampers);
    }
      catch(e){
      this.setState({error: e});
      console.log('Error!', e);
    } 
  }

  componentDidMount() {
    this.getCampersData();
  }

  render() {
    const {isLoading, results, reverseSortOn, error} = this.state;
    console.log(this.state);

    const list = (
      results &&
      results[reverseSortOn] 
    ) || [];
      
      return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">FCC Camper Leaderboard</h1>
        </header>
        <div className="page">
          <div className="interactions">
            { isLoading  
            ?  <p>Loading...</p> 
              :
              null
            }
          </div>
          <div className="interactions">
          { error ? <p>Something went wrong :(</p>
            :
            <Table 
            list={list} 
            onChangeSortOn={this.onChangeSortOn}
            activeSortKey={reverseSortOn}/>
          }
           </div>
      </div>
      </div>
    );
  }
}

export default App;