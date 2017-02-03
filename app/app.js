import React, {Component} from 'react';
import {App, reactify} from '../src/index';

const Sphere = reactify(WHS.Sphere);

export class Application extends Component {
  render() {
    return (
      <App modules={[
        new WHS.app.SceneModule(),
        new WHS.app.CameraModule({
          position: {
            z: 20
          }
        }),
        new WHS.app.RenderingModule(),
        new WHS.controls.OrbitModule()
      ]}>
        <Sphere
          geometry={[3, 32, 32]}
          material={new THREE.MeshBasicMaterial({color: 0xffffff})}
        >
          <Sphere
            geometry={[3, 32, 32]}
            material={new THREE.MeshBasicMaterial({color: 0xff0000})}
            position={[3, 0, 0]}
          />
        </Sphere>
      </App>
    )
  }
}
