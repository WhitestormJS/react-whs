![](http://i.imgur.com/MJmzMdb.png)

# react-whs [![Build Status](https://img.shields.io/travis/WhitestormJS/react-whs.svg?style=flat-square)](https://travis-ci.org/WhitestormJS/react-whs) [![NPM Version](https://img.shields.io/npm/v/react-whs.svg?style=flat-square)](https://www.npmjs.com/package/react-whs)

> Go to [WhitestormJS/whitestorm.js](https://github.com/WhitestormJS/whitestorm.js)

## Usage 

Try with **React** on [**Codepen**](http://codepen.io/sasha240100/pen/dNqKMd?editors=1010):

<a href="http://codepen.io/sasha240100/pen/dNqKMd?editors=1010"><img src="http://i.imgur.com/AcsnqTs.png" height="50" /></a>


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

## Custom components (that are not included in whs lib)

> Simply include `@reactify` decorator.

```javascript
import React, {Component} from 'react';
import * as THREE from 'three';
import {MeshComponent} from 'whs/src/core/MeshComponent';

import {reactify} from 'react-whs';

@reactify
export default class BasicSphere extends MeshComponent {
  build() {
    return new THREE.Mesh(
      new THREE.SphereGeometry(3, 16, 16),
      new THREE.MeshBasicMaterial({color: 0xff0000}) // red
    );
  }
}
```
