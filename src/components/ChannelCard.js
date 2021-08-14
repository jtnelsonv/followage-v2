import React, { Component } from "react";
import moment from "moment";
import "moment-precise-range-plugin";
import PropTypes from "prop-types";

class ChannelCard extends Component {
  calculateFollowTime = (date) => {
    try {
      const startDate = moment(date).format("YYYY-MM-DD hh:mm");
      const endDate = moment().format("YYYY-MM-DD hh:mm");
      const followTime = moment.preciseDiff(startDate, endDate);
      return followTime;
    } catch (error) {
      console.error("calculateFollowTime() --> Error: " + error);
    }
  };

  render() {
    const channel = this.props.channel;
    const profileImage = channel.profile_image_url !== '' ? channel.profile_image_url : 'https://picsum.photos/id/680/160/160';
    return (
      <React.Fragment>
        <div className="profile shadow">
          <div className="profile-header">
            <div className="profile-background-gradient"></div>
            <img
              className="profile-image"
              src={profileImage}
              alt="Profile" />
          </div>
          <div className="profile-content">
            <div className="profile-bio">
              <h3 className="profile-name">{channel.display_name}</h3>
              <p className="profile-info">
                Following for {this.calculateFollowTime(channel.followed_at)}
              </p>
            </div>
            <div className="profile-channel">
              <div className="profile-channel-stats">
                <span className="profile-channel-stats-data">{parseInt(channel.view_count).toLocaleString(undefined)}</span>
                <span>
                  View Count
                </span>
              </div>
              <div className="profile-channel-stats">
                <span className="profile-channel-stats-data">{moment(channel.followed_at).format("MMM Do YYYY")}</span>
                <span>
                  Followed
                </span>
              </div>
              <div className="profile-channel-visit">
                <a className="button profile-channel-visit-button" href={'https://twitch.tv/' + channel.login} target="_blank" rel="noreferrer">Visit</a>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

ChannelCard.propTypes = {
  channel: PropTypes.object.isRequired,
};

export default ChannelCard;


// JSON example of channel
//   {
//     "id": "127550308",
//     "login": "botezlive",
//     "display_name": "BotezLive",
//     "type": "",
//     "broadcaster_type": "partner",
//     "description": "Welcome to BotezLive, a chess show hosted by two sisters, Alexandra (25) and Andrea (18). Both grew up playing chess competitively and represented Team Canada in many international events. We also stream Just Chatting and occasionally other games.",
//     "profile_image_url": "https://static-cdn.jtvnw.net/jtv_user_pictures/ec097930-dea0-4819-aafb-cd0e935a60f9-profile_image-300x300.png",
//     "offline_image_url": "https://static-cdn.jtvnw.net/jtv_user_pictures/94819334-d50f-473e-afd2-5a7cbc916e99-channel_offline_image-1920x1080.jpeg",
//     "view_count": 27694797,
//     "created_at": "2016-06-23T19:36:28.687739Z",
//     "followed_at": "2020-10-19T00:46:21Z"
//   }
