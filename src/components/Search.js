import React, { Component } from 'react'
import PropTypes from "prop-types";

export class Search extends Component {
    state = {
        user: '',
        error: ''
    }

    onChange = (e) => this.setState({ user: e.target.value });

    // submit form
    onSubmit = (e) => {
        try {
            e.preventDefault();
            const username = this.state.user;

            if (username.match(/^(\w)+$/gi)) {
                this.props.getChannels(username);
            } else {
                this.setState({ user: '' });
                this.setState({ error: 'Please enter a valid username' });
            }
        } catch (error) {
            console.error('onSubmit function error --> ' + error);
        }
    }

    // submit form when enter key is pressed
    onEnter = (e) => {
        try {
            // key code for enter is 13
            if (e.keyCode === 13) {
                this.onSubmit(e);
            }
        } catch (error) {
            console.error('onEnter function error --> ' + error);
        }
    }

    render() {
        return (
        <div id="header" className="fixed-header" style={{backgroundColor: "#293241", paddingTop: "2.5em"}}>
            <div className="p-5" style={{backgroundColor: "#EE6C4D"}}>
                <div className="container">
                <form id="search" onSubmit={this.onSubmit} onKeyDown={this.onEnter}>
                    <div className="field is-grouped is-grouped-centered">
                        <div className="control is-expanded">
                            <input className="input is-medium" type="text" placeholder={this.state.error === '' ? 'Enter your Twitch username...'  : this.state.error} value={this.state.user} onChange={this.onChange} />
                        </div>
                        <div className="control">
                            <button form="search" className="submit-btn"><span>Submit</span></button>
                        </div>
                    </div>
                  </form>
                </div>
            </div>
        </div>
        )
    }
}

Search.propTypes = {
    getChannels: PropTypes.func.isRequired
}

export default Search