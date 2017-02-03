import React, {Component} from 'react';
import {RApp, R} from '../src/index';

const RSphere = R(WHS.Sphere);

export class Application extends Component {
  render() {
    return (
      <RApp modules={[
        new WHS.app.SceneModule(),
        new WHS.app.CameraModule({
          position: {
            z: 20
          }
        }),
        new WHS.app.RenderingModule()
      ]}>
        <RSphere material={new THREE.MeshBasicMaterial({color: 0xffffff})} />
      </RApp>
    )
  }
}
