import React from 'react';

export default () => (
  <a-assets>
    <a-asset-item id="nike-free-obj" src="../assets/NikeFree2-10K.obj"/>
    <a-asset-item id="nike-free-mtl" src="../assets/NikeFree2-10K.mtl"/>
    <a-asset-item id="nike-blueorange-obj" src="../assets/blueorgange1-16K.obj"/>
    <a-asset-item id="nike-blueorange-mtl" src="../assets/blueorgange1-16K.mtl"/>
    <a-asset-item id="nike-white-obj" src="../assets/nikewhite128.obj"/>
    <a-asset-item id="nike-white-mtl" src="../assets/nikewhite128.mtl"/>

    <a-mixin id="rotating">
      <a-animation attribute="rotation" begin="-90 0 0" to="90 90 90" dur="5000" />
    </a-mixin>
  </a-assets>
)