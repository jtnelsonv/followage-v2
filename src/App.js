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
    axios.post('http://127.0.0.1:8000/search', {'username': user}).then(res => this.setState({channels: JSON.parse(res.data)}));
  }

  render() {
    return (
      <section className="hero is-fullheight" style={{backgroundColor: "#293241"}}>
          <Search getChannels={this.getChannels} />
          <Content channels={this.state.channels} />
          {/* <Footer /> */}
      </section>
    );
  }
}

export default App;
