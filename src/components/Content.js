import React, { Component } from "react";
import Channels from "./Channels";
import PropTypes from "prop-types";

class Content extends Component {
  render() {
    const channels = this.props.channels;
    if (channels[0].data === "") {
      return (
        <div className="hero-body content-bg"></div>
      );
    } else if (channels[0].data === "error") {
        return (
            <div className="hero-body notfound-bg"></div>
          );
    } else {
      return (
        <div className="hero-body content-bg">
          <div className="container">
            <Channels channels={channels} />
          </div>
        </div>
      );
    }
  }
}

Content.propTypes = {
  channels: PropTypes.array.isRequired,
};

export default Content;
