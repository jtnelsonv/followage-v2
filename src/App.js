import React, { Component } from 'react';
import './App.css';
import Search from './components/Search';
import Content from './components/Content';
// import Footer from './components/Footer';
import axios from 'axios';

class App extends Component {
  state = {
    channels: [{'data': ''}]
  }

  getChannels = (user) => {
    axios.post('https://api.followage.com/search', {'username': user}).then(res => this.setState({channels: JSON.parse(res.data)}));
  }

  render() {
    return (
      <section className="hero is-fullheight" style={{backgroundColor: "#E0FBFC", paddingTop: "9em"}}>
          <Search getChannels={this.getChannels} />
          <Content channels={this.state.channels} />
          {/* <Footer /> */}
      </section>
    );
  }
}

export default App;
