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
    this.state = {
      _isItemAddedToCart: false
    }
  }

  _onItemSelect () {
    this.setState({_isItemAddedToCart: true});
  }

  render () {
    const pdp = {
      item1: {
        name: 'Nike shoes',
        description: 'Blue shoes',
        price: '99.67'
      },
      item2: {
        name: 'Nike shoes',
        description: 'Blue Orange shoes',
        price: '109.67'
      }
    };

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

        <Entity id="shoe1"
          position='13.47 0 37.37'
          rotation='-90 0 0'
          scale="0.25 0.25 0.25"
          obj-model="obj: #nike-blueorange-obj; mtl: #nike-blueorange-mtl">
          <a-animation
             begin="rotate"
             end="pause"
             attribute="rotation"
             to="-90 360 0"
             easing="linear" />
          <a-animation
             begin="rotate"
             attribute="opacity"
             from='0'
             to="0.9"
             easing="linear" />
          <a-animation
             begin="pause"
             attribute="opacity`"
             from='0.9'
             to="0"
             easing="linear" />
        </Entity>

        <a-entity>
          <a-plane 
            material="opacity:0.1" 
            geometry="primitive:plane" 
            position="-15 5.61 50" 
            rotation="0 180 0" 
            scale="30 27 1" 
            event-proxy="listen1: mouseenter; target1: #shoe1; emit1: rotate; listen2: mouseleave; target2: #shoe1; emit2: pause;">

            <a-animation
              begin="mouseenter"
              attribute="opacity"
              from="0.1"
              to="0.8"
              easing="linear" />
            <a-animation
              begin="mouseleave"
              attribute="opacity"
              from="0.8"
              to="0.1"
              easing="linear" />
          </a-plane>


          <Entity
            position="-2.45 15 48.83"
            rotation='0 180 0'
            material={{color: 'black'}}
            event-proxy="listen1: mouseenter; target1: #shoe; emit1: rotate; listen2: mouseleave; target2: #shoe; emit2: pause;"
            text={{text: pdp.item2.name, size: 2.5}} />
          
          <Entity
            position="-2.45 11.41 48.83"
            rotation='0 180 0'            
            material={{color: 'black'}}
            event-proxy="listen1: mouseenter; target1: #shoe1; emit1: rotate; listen2: mouseleave; target2: #shoe1; emit2: pause;"
            text={{text: pdp.item2.description, size: 1.5}} />

          <Entity
            position="-2.45 8.41 48.83"  
            rotation='0 180 0'                    
            material={{color: 'black'}}
            event-proxy="listen1: mouseenter; target1: #shoe1; emit1: rotate; listen2: mouseleave; target2: #shoe1; emit2: pause;"
            text={{text: pdp.item2.price, size: 1.5}} >
          </Entity>

          <Entity
              position="-2.45 5 48.83"
              rotation='0 180 0'
              event-proxy="listen1: mouseenter; target1: #shoe1; emit1: rotate; listen2: mouseleave; target2: #shoe1; emit2: pause;"
              onClick={() => this._onItemSelect()}
              material={{color: 'green'}}
              text={{text: 'Add to cart', size: 1.5}} />
        </a-entity>




        <Entity id="shoe"
          position='-20 0 -14.38'
          rotation='-90 0 0'
          scale="0.25 0.25 0.25"
          obj-model="obj: #nike-free-obj; mtl: #nike-free-mtl">
          <a-animation
             begin="rotate"
             end="pause"
             attribute="rotation"
             to="-90 360 0"
             easing="linear" />
        </Entity>

        <a-entity>
          <a-plane 
            material="opacity:0.1" 
            geometry="primitive:plane" 
            position="-43.75 5.61 -2.96" 
            rotation="0 90 0" 
            scale="30 27 1" 
            event-proxy="listen1: mouseenter; target1: #shoe; emit1: rotate; listen2: mouseleave; target2: #shoe; emit2: pause;">

            <a-animation
              begin="mouseenter"
              attribute="opacity"
              from="0.1"
              to="0.8"
              easing="linear" />
            <a-animation
              begin="mouseleave"
              attribute="opacity"
              from="0.8"
              to="0.1"
              easing="linear" />
          </a-plane>


          <Entity
            position="-42.45 15 8.83"
            rotation='0 90 0'
            material={{color: 'black'}}
            event-proxy="listen1: mouseenter; target1: #shoe; emit1: rotate; listen2: mouseleave; target2: #shoe; emit2: pause;"
            text={{text: pdp.item1.name, size: 2.5}} />
          
          <Entity
            position="-42.45 11.41 8.83"
            rotation='0 90 0'            
            material={{color: 'black'}}
            event-proxy="listen1: mouseenter; target1: #shoe; emit1: rotate; listen2: mouseleave; target2: #shoe; emit2: pause;"
            text={{text: pdp.item1.description, size: 1.5}} />

          <Entity
            position="-42.45 8.41 8.83"  
            rotation='0 90 0'                    
            material={{color: 'black'}}
            event-proxy="listen1: mouseenter; target1: #shoe; emit1: rotate; listen2: mouseleave; target2: #shoe; emit2: pause;"
            text={{text: pdp.item1.price, size: 1.5}} >
          </Entity>

          {
            this.state._isItemAddedToCart 
            ? <Entity
              position="-42.45 5 8.83"
              rotation='0 90 0'
              event-proxy="listen1: mouseenter; target1: #shoe; emit1: rotate; listen2: mouseleave; target2: #shoe; emit2: pause;"
              material={{color: 'grey', backgroundColor: 'white'}}
              text={{text: 'Added to cart', size: 1.5}} />

            : <Entity
              position="-42.45 5 8.83"
              rotation='0 90 0'
              event-proxy="listen1: mouseenter; target1: #shoe; emit1: rotate; listen2: mouseleave; target2: #shoe; emit2: pause;"
              onClick={() => this._onItemSelect()}
              material={{color: 'green'}}
              text={{text: 'Add to cart', size: 1.5}} />
          }

        </a-entity>
      </Scene>
    );
  }
}

ReactDOM.render(<VRScene/>, document.querySelector('.scene-container'));
