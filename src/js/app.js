import 'aframe';
import 'aframe-animation-component';
import 'aframe-event-set-component';
import 'aframe-text-component';
import 'babel-polyfill';
import {Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';

import Assets from './components/Assets';
import Camera from './components/Camera';
import Sky from './components/Sky';

// event-set__1="_event: mousedown; scale: 0.25 0.25 0.25"
// event-set__2="_event: mouseup; scale: 0.5 0.5 0.5"
// event-set__3="_event: mouseenter; scale: 0.5 0.5 0.5"
// event-set__4="_event: mouseleave; scale: 0.25 0.25 0.25"

class VRScene extends React.Component {
  constructor(props) {
    super(props);
  }

  _onItemSelect () {}

  _rotateIndefinite() {
    const el = this.el;
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
          event-set__1="_event: mousedown; scale: 0.25 0.25 0.25"
          event-set__2="_event: mouseup; scale: 0.5 0.5 0.5"
          event-set__3="_event: mouseenter; scale: 0.5 0.5 0.5"
          event-set__4="_event: mouseleave; scale: 0.25 0.25 0.25"
          position='20 0 20'
          rotation='-90 0 0'
          scale='0.25 0.25 0.25' 
          obj-model="obj: #nike-blueorange-obj; mtl: #nike-blueorange-mtl"
        />

        <Entity
          onClick={() => {
            console.log('entity model clicked now');
            this._onItemSelect();
          }}
          position='-20 0 -20'
          rotation='-90 0 0'
          scale="0.25 0.25 0.25"
          obj-model="obj: #nike-free-obj; mtl: #nike-free-mtl">
          <a-animation
            begin="mouseenter"
            end="mouseleave"
            attribute="rotation"
            to="-90 360 0"
            repeat="indefinite"
            easing="linear" />
          <a-animation
            begin="mouseenter"
            end="mouseleave"
            attribute="scale"
            to=".5 .5 .5"
            easing="linear" />
        </Entity>
      </Scene>
    );
  }
}

ReactDOM.render(<VRScene/>, document.querySelector('.scene-container'));
