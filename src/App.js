import React, { Component } from 'react';
import Header from './components/header'
import Table from './components/table'
import Loading from './components/loading'

import './App.css';

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
    });
    
    return fetch(`${PATH_BASE}/${reverseSortOn}`)
    .then(response => response.json())
    .catch(e => this.setState({ error: e}));
  }  

  fetchAllTimeCampers(){
    const reverseSortOn = 'alltime';
    this.setState({
        isLoading: true,
    });

   return  fetch(`${PATH_BASE}/${reverseSortOn}`)
    .then(response => response.json())
    .catch(e => this.setState({ error: e}));
  }
  
  setCamperResults(result, resultType) {
    const {results } = this.state
    this.setState({ 
      results: {
        ...results, 
        [resultType]: result
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
      const allTimeCampers = await this.fetchAllTimeCampers();
      this.setCamperResults(allTimeCampers, "alltime");
      const lastFetchType =  "recent";
      const topRecentCampers = await this.fetchTopRecentCampers();
      this.setCamperResults(topRecentCampers, lastFetchType);
      this.setState({
        reverseSortOn: lastFetchType,
      })

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
    const list = (
      results &&
      results[reverseSortOn] 
    ) || [];
      
    return (
    <div className="App">
      <Header />
      <div className="page right-shadow">
        { error ? 
          <p>Something went wrong :(</p>
          :
          <Table 
            list={list} 
            onChangeSortOn={this.onChangeSortOn}
            activeSortKey={reverseSortOn}/>
        }
        { isLoading  ? 
            <Loading /> 
            :
            null
        }
      </div>  
      <footer><p>Coded by <a href="https://www.maribelduran.com/" target="_blank">Maribel Duran</a></p></footer>
      </div>
    );
  }
}

export default App;