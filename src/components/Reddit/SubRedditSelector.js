/*
VO
This component is for the drop-down that would have the subreddits
*/

import React, { Component } from 'react';
import { Select } from 'semantic-ui-react'

class SubRedditSelector extends Component {

  handleChange = (e, { value }) => {
    this.props.subRedditSelected(value);
  }

  render() {
    const { options, value } = this.props;
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
