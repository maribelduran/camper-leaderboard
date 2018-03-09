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
      searchKey: null,
      error: null,
    }
    this.fetchTopRecentCampers = this.fetchTopRecentCampers.bind(this);
    this.fetchAllTimeCampers = this.fetchAllTimeCampers.bind(this);
    this.setCamperResults = this.setCamperResults.bind(this);
    this.getCampersData - this.getCampersData.bind(this);
    this.onSortSelect = this.onSortSelect.bind(this);
  }

  fetchTopRecentCampers() {
    const searchKey = 'recent';
    this.setState({
      isLoading: true,
      searchKey: searchKey,
    });
    
    return fetch(`${PATH_BASE}/${searchKey}`)
    .then(response => response.json())
   // .then(result => this.setCamperResults(result))
    .catch(e => this.setState({ error: e}));
  }  

  fetchAllTimeCampers(){
    const searchKey = 'alltime';
    this.setState({
        isLoading: true,
        searchKey: searchKey,
    });
   return  fetch(`${PATH_BASE}/${searchKey}`)
    .then(response => response.json())
   // .then(result => this.setCamperResults(result))
    .catch(e => this.setState({ error: e}));
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

  onSortSelect(selection){
    const {results, searchKey} = this.state;
   
    if (!results[selection]){
      console.log("should be fetching something")
      if (selection === "alltime") this.fetchAllTimeCampers();
      if (selection === "recent") this.fetchTopRecentCampers();
    }else{
      this.setState({
        searchKey: selection,
      });
    }
  }

  async getCampersData(){
      try{
        const recentCampers = await this.fetchTopRecentCampers();
        this.setCamperResults(recentCampers);
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
    const {isLoading, results, searchKey, error} = this.state;
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
          { error ? <p>Something went wrong :(</p>
            :
            <Table list={list} onSortSelect={this.onSortSelect}/>
         
          }
           </div>
      </div>
      </div>
    );
  }
}

export default App;