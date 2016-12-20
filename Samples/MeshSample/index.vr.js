/**
 * The examples provided by Oculus are for non-commercial testing and
 * evaluation purposes only.
 *
 * Oculus reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * OCULUS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

'use strict';

/**
 * MeshSample loads and displays a spinning model in React VR.
 *
 * To do this, object model is loaded and placed in the scene with the <Mesh> tag; it
 * is also illuminated with a <PointLight>. Rotation is achieved based on a React state
 * variable that is applied as a rotation transform.
 */

import React from 'react';
import {
  AppRegistry,
  asset,
  Image,
  Mesh,
  Pano,
  PointLight,
  Text,
  View,
  VrButton,
} from 'react-vr';
import PDP from './itempdp';

class MeshSample extends React.Component {
  constructor() {
    super();
    this.state      = {rotation: 0, isItemVisible: false};
    this.lastUpdate = Date.now();
    this.rotate     = this.rotate.bind(this);
  }

  /**
   * After kickoff in componentDidMount(), rotate is called every frame through
   * requestAnimationFrame. It updates the state.rotation variable used to rotate
   * the model based om on time measurement; this is important to account for
   * different VR headset framerates.
   */
  rotate() {
    const now       = Date.now();
    const delta     = now - this.lastUpdate;
    this.lastUpdate = now;

    this.setState({rotation: this.state.rotation + delta / 20});
    this.frameHandle = requestAnimationFrame(this.rotate);
  }

  // componentDidMount() {
  //   this.rotate();
  // }

  componentWillUnmount() {
    if (this.frameHandle) {
      cancelAnimationFrame(this.frameHandle);
      this.frameHandle = null;
    }
  }

  _onViewClicked () {
    if (this.state.isItemVisible) {
      if (this.frameHandle) {
        cancelAnimationFrame(this.frameHandle);
        this.frameHandle = null;
      }
    } else {
      this.rotate();
    }
    this.setState({isItemVisible: !this.state.isItemVisible});
  }

  render() {
    return (
      <View
        enableGazeCollision={true} >
        <Pano source={asset('Panorama-360-Grad5.jpg')}/>

        <VrButton
          onClick={()=>this._onViewClicked()}>
          <Text style={{
            backgroundColor:'grey',
            padding: 0.1,
            textAlign:'center',
            alignItems:'center',
            fontSize: 0.4,
            position: 'absolute',
            transform: [{translate: [0, -2.5, -7]}],
            layoutOrigin: [0.5, 0.5]}}>
          Show item</Text>
        </VrButton>

        
          <View>
            <Mesh
              style={{
                transform: [
                  {translate: [0, -15, -70]},
                  {scale : 1 },
                  {rotateY : this.state.rotation},
                  {rotateX : -90}
                ],
              }}
              source={
                {mesh: asset('blueorgange1-16K.obj'), 
                mtl: asset('blueorgange1-16K.mtl'), 
                lit: true}}
            />
            {
              this.state.isItemVisible &&
              <PDP 
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor:'grey',
                  width: 10,
                  transform: [
                    {translate: [30, -15, -70]},
                    {scale : 4 }
                  ],
                }}
                text={'Product description. Lorem ipsum. Lorem ipsum. Lorem ipsum. Lorem ipsum. '} />
            }
          </View>

        <PointLight 
          decay={2}
          style={{color:'white', transform:[{translate : [0, 400, 700]}]}} />

        </View>
    );
  }
};

AppRegistry.registerComponent('MeshSample', () => MeshSample);
