import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Table from './components/table'

const PATH_BASE = 'https://fcctop100.herokuapp.com/api/fccusers/top';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      results: null,
      isLoading: false,
      searchKey: null,
      error: null,
    }
    this.fetchTopRecentCampers = this.fetchTopRecentCampers.bind(this);
    this.fetchAllTimeCampers = this.fetchAllTimeCampers.bind(this);
    //this.setTopRecentCampers =this.setTopRecentCampers.bind(this);
    this.setCamperResults = this.setCamperResults.bind(this);
  }
  
  setCamperResults(result) {
    const {searchKey, results } = this.state
    this.setState({ 
      results: {
        ...results, 
        [searchKey]: result
      },
      isLoading: false
    });
  }

  //eventually change this to use async await
  fetchTopRecentCampers() {
    const searchKey = 'recent';
    this.setState({
      isLoading: true,
      searchKey: searchKey,
    });

    fetch(`${PATH_BASE}/${searchKey}`)
    .then(response => response.json())
    .then(result => this.setCamperResults(result))
    .catch(e => this.setState({ error: e}));
  }  

  fetchAllTimeCampers(){
    const searchKey = 'alltime';
    this.setState({
        isLoading: true,
        searchKey: 'alltime',
    });
    fetch(`${PATH_BASE}/${searchKey}`)
    .then(response => response.json())
    .then(result => this.setCamperResults(result))
    .catch(e => this.setState({ error: e}));
  }

  componentDidMount() {
    this.fetchAllTimeCampers();
    this.fetchTopRecentCampers();
  }

  render() {
    const {isLoading, results, searchKey} = this.state;
    console.log(this.state);

    const list = (
      results &&
      results[searchKey] 
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
            <Table list={list}/>
          </div>
      </div>
      </div>
    );
  }
}

export default App;
