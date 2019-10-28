import React, { Component } from 'react';

class Search extends Component {

  state = {
    term: ''
  }

  onTermChange = (e) => {
    this.setState({ term: e.target.value }, () => {
      this.props.formSubmit(this.state.term)
    })
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    this.props.formSubmit(this.state.term);
    this.setState({ term: '' });
  }

  render() {
    return (
      <div className="my-1">
        <form onSubmit={this.onFormSubmit}>
          <div className="form-group">
            <input className="form-control" type="text" value={this.state.term} onChange={this.onTermChange} />
          </div>
        </form>
      </div>
    )
  }
}

export default Search;

