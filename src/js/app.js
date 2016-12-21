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

AFRAME.registerComponent('event-proxy', {
  schema: {
    listen1: {default: ''},
    target1: {type: 'selector'},
    emit1: {default: ''},
    listen2: {default: ''},
    target2: {type: 'selector'},
    emit2: {default: ''}
  },
  update: function () {
    const data = this.data;
    const el = this.el;
    el.addEventListener(data.listen1, () => data.target1.emit(data.emit1));
    el.addEventListener(data.listen2, () => data.target2.emit(data.emit2));
  }
});

class VRScene extends React.Component {
  constructor(props) {
    super(props);
  }

  _onItemSelect () {}

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

        <Entity id="shoe"
          onClick={() => {
            console.log('entity model clicked now');
            this._onItemSelect();
          }}
          position='-20 0 -20'
          rotation='-90 0 0'
          scale="0.25 0.25 0.25"
          obj-model="obj: #nike-free-obj; mtl: #nike-free-mtl">
          <a-animation
             begin="rotate"
             end="pause"
             attribute="rotation"
             to="-90 360 0"
             repeat="indefinite"
             easing="linear" />
        </Entity>

        <a-entity>
          <a-plane 
            material="opacity:0.3" 
            geometry="primitive:plane" 
            position="-42.72 5.61 -2.96" 
            rotation="0 90 0" 
            scale="9 24 1"
            event-proxy="listen1: mouseenter; target1: #shoe; emit1: rotate; listen2: mouseleave; target2: #shoe; emit2: pause;">

            <a-animation
              begin="mouseenter"
              attribute="scale"
              to="30 27 1"
              easing="linear" />
            <a-animation
              begin="mouseleave"
              attribute="scale"
              to="9 24 1"
              easing="linear" />

            <a-animation
              begin="mouseenter"
              attribute="opacity"
              from="0.3"
              to="1"
              easing="linear" />
            <a-animation
              begin="mouseleave"
              attribute="opacity"
              from="1"
              to="0.3"
              easing="linear" />
          </a-plane>
        </a-entity>
      </Scene>
    );
  }
}

ReactDOM.render(<VRScene/>, document.querySelector('.scene-container'));
