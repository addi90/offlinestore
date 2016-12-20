import 'aframe';
import {Entity, Scene} from 'aframe-react';
import React, { Component } from 'react';
import { render } from 'react-dom';

import Background from './Components/Background';

class Wrapper extends Component {
  render() {
      return (
        <div>
          <Scene>
            <Background src='./assets/Panorama-360-Grad5.jpg'/>
            <Entity geometry={{primitive: 'box'}} material="color: green" position={[0, -20, 0]}/>
          </Scene>
        </div>
      );
  }
}

render( 
    <Wrapper/>, 
    document.querySelector('#container')
);