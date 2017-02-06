# react-whs
WhitestormJS React integration 
[![Build Status](https://img.shields.io/travis/WhitestormJS/react-whs.svg?style=flat-square)](https://travis-ci.org/WhitestormJS/react-whs)

## Usage 

```javascript
import React, {Component} from 'react';
import {App, Sphere} from 'react-whs';

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
          key="1"
        />
      </App>
    )
  }
}
```
