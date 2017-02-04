import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {App, Sphere} from '../../src/index';

import * as WHS from 'whs';
import * as THREE from 'three';

export class Application extends Component {
  render() {
    return (
      <App modules={[
        new WHS.app.SceneModule(),
        new WHS.app.CameraModule({
          position: {
            z: 20
          }
        })
      ]}
      start={false}
      >
        <Sphere
          geometry={[3, 32, 32]}
          material={new THREE.MeshBasicMaterial({color: 0xffffff})}
          key="1"
        >
          <Sphere
            geometry={[3, 32, 32]}
            material={new THREE.MeshBasicMaterial({color: 0xff0000})}
            position={[3, 0, 0]}
          />
        </Sphere>
        <Sphere
          geometry={[3, 32, 32]}
          material={new THREE.MeshBasicMaterial({color: 0x00ff00})}
          position={[-3, 0, 3]}
          key="2"
        />
      </App>
    )
  }
}
