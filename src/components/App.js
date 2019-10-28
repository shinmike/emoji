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
    if (term === ""){
      this.setState({term: "happy"})
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

  render() {

    let emojiListRendered = emojiList.map((emoji) => {
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
              <ul onClick={() => this.onEmojiSelect(emoji.symbol)} className="list-group">
                <li data-key={emoji.title} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} className="list-group-item my-1">{emoji.symbol}
                  <span className="float-right">{this.state.selectedEmoji === emoji.title ? "click to copy" : ""}</span>
                </li>
              </ul>
            </CopyToClipboard>
          )
        }
        return null
      })
      )
    })

    return (
      <div className="container-fluid">
        <h1 className="text-center">Emoji Search</h1>
        <div className="row my-3">
          <div className="col-md-4">
            <Search formSubmit={this.formSubmit} />
          </div>
          <div className="col-md-8">
            <List emojiListRendered={emojiListRendered} />
          </div>
        </div>
      </div>
    )
  }
}

export default App;