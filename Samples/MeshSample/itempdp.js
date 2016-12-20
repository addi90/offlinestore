'use strict';

import React from 'react';
import {
  Text,
  View,
  VrButton,
} from 'react-vr';

export default class PDP extends React.Component {
  constructor () {
    super();
    this.state = {
      buttonText: 'Add to cart'
    };
  }

  _addToCart () {
    this.setState({buttonText: 'Added to cart'});
  }

  render () {
    return (
      <View style={this.props.style}>
          <Text
            style={{
              padding: 0.1,
              fontSize: 1,
            }}>
            {this.props.text}
          </Text>
          <VrButton
            onClick={()=>this._addToCart()}>
            <Text style={{
              backgroundColor: 'orange',
              padding: 0.1,
              fontSize: 1,}}>
              {this.state.buttonText}
            </Text>
          </VrButton>
      </View>
    );
  }
}
