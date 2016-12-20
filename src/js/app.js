import 'aframe';
import 'aframe-animation-component';
import 'aframe-text-component';
import 'babel-polyfill';
import {Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';

import Assets from './components/Assets';
import Camera from './components/Camera';
import Text from './components/Text';
import Sky from './components/Sky';

class VRScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scale: '0.25 0.25 0.25'
    };
  }

  _onItemSelect () {
    this.setState({ scale: '.5 .5 .5'});
  }

  render () {

    return (
      <Scene>
        <Camera>
          <a-cursor
            animation__click="property: scale; startEvents: click; from: 0.1 0.1 0.1; to: 1 1 1; dur: 150"
>
          </a-cursor>
        </Camera>
        <Assets />

        <Sky src="url(assets/Panorama-360-Grad5.jpg)"/>

        <Entity
          onClick={() => this._onItemSelect()}
          position='20 0 20'
          rotation='-90 0 0'
          scale={this.state.scale} 
          obj-model="obj: #nike-blueorange-obj; mtl: #nike-blueorange-mtl"
        />

        <Entity
          onClick={() => {
            console.log('entity model clicked now'); 
          }}
          position='-20 0 -20'
          rotation='-90 0 0'
          scale="0.25 0.25 0.25" 
          obj-model="obj: #nike-free-obj; mtl: #nike-free-mtl"
        />
      </Scene>
    );
  }
}

ReactDOM.render(<VRScene/>, document.querySelector('.scene-container'));
