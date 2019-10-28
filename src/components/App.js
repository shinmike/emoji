import React, { Component } from 'react';
import './App.css';

import Search from './Search';
import List from './List';

import emojiList from '../data/emojiList.json';

import { CopyToClipboard } from 'react-copy-to-clipboard';

class App extends Component {

  state = {
    term: '',
    selectedEmoji: ''
  }

  componentDidMount() {
    this.setState({ term: "happy" })
  }

  formSubmit = (term) => {
    if (term === "") {
      this.setState({ term: "happy" })
    } else {
      this.setState({ term })
    }
  }

  onEmojiSelect = (emoji) => {
    alert("Copied the text: " + emoji);
  }

  handleMouseEnter = (e) => {
    this.setState({ selectedEmoji: e.target.getAttribute('data-key') })
  }

  handleMouseLeave = () => {
    this.setState({ selectedEmoji: "" })
  }

  emojiListRendered(){
    return emojiList.map((emoji) => {
      let emojiKeywordsArray = emoji.keywords.split(" ");
      let emojiKeywordsArrayFiltered = [];
      for (let word of emojiKeywordsArray) {
        if (!emojiKeywordsArrayFiltered.includes(word)) {
          emojiKeywordsArrayFiltered.push(word);
        }
      }
      return (emojiKeywordsArrayFiltered.map((word) => {
        if (word === this.state.term) {
          return (
            <CopyToClipboard text={emoji.symbol} key={emoji.title}>
              <li
                className="list-group-item my-1"
                data-key={emoji.title}
                onClick={() => this.onEmojiSelect(emoji.symbol)}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}>{emoji.symbol}
                <span className="float-right">{this.state.selectedEmoji === emoji.title ? "click to copy" : ""}</span>
              </li>
            </CopyToClipboard>
          )
        }
        return null
      })
      )
    })
  }

  render() {
    return (
      <div className="container">
        <h1 className="text-center">Emoji Search</h1>
        <div className="row my-3">
          <div className="col">
            <Search formSubmit={this.formSubmit} />
            <List emojiListRendered={this.emojiListRendered()} />
          </div>
        </div>
      </div>
    )
  }
}

export default App;