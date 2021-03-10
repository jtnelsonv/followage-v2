import React, { Component } from "react";
import ChannelCard from "./ChannelCard";
import PropTypes from "prop-types";

class Channels extends Component {
  // Sorts the channels listed by the original date/time the user started following
  // Shortest: channels followed for the shortest time will be at the top
  // Anything: channels followed the longest will be at the top
  sortChannelsByFollowTime = (method, channels) => {
    if (method === "shortest") {
      return channels.sort((a, b) => b.followed_at.localeCompare(a.followed_at));
    } else {
      return channels.sort((a, b) => a.followed_at.localeCompare(b.followed_at));
    }
  };

  render() {
    const channels = this.props.channels;
    const sortedChannels = this.sortChannelsByFollowTime('shortest', channels);
    return sortedChannels.map((channel) => (
      <ChannelCard key={channel.id} channel={channel} />
    ));
  }
}

Channels.propTypes = {
  channels: PropTypes.array.isRequired,
};

export default Channels;
