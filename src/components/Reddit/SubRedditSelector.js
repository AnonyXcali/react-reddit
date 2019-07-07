import React, { Component } from 'react';
import { Select } from 'semantic-ui-react'

/**
@component SubRedditSelector
This component is responsible for Select dropdown containing subreddit options
  @renders
    - Select dropdown
**/

class SubRedditSelector extends Component {

  handleChange = (e, { value }) => {
    this.props.subRedditSelected(value);
  }

  render() {
    const { options } = this.props;
    return (
      <Select
      className='_subRedditSelectElem'
      placeholder='SubReddit!'
      options={options}
      onChange={this.handleChange}
      />
    );
  }
}


export default SubRedditSelector;
