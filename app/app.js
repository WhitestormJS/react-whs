import React, {Component} from 'react';
import {App, Sphere} from '../src/index';

import {MeshBasicMaterial} from 'three';

import {
  SceneModule, 
  CameraModule, 
  RenderingModule, 
  OrbitControlsModule, 
  DefineModule,
  PerspectiveCamera,
} from 'whs';

import {BasicSphere} from './components/BasicSphere';

export class Application extends Component {
  render() {
    return (
      <App modules={[
        new SceneModule(),
        new DefineModule('camera', new PerspectiveCamera({
          position: {
            z: 20
          }
        })),
        new RenderingModule(),
        new OrbitControlsModule()
      ]}
      refApp={app => {
        console.log(app); // app
      }}
      >
        <Sphere
          geometry={[3, 32, 32]}
          material={new MeshBasicMaterial({color: 0xffffff})}
          key="1"
          refComponent={component => {
            console.log(component); // component
          }}
        >
          <Sphere
            geometry={[3, 32, 32]}
            material={new MeshBasicMaterial({color: 0xff0000})}
            position={[3, 0, 0]}
          />
        </Sphere>
        <Sphere
          geometry={[3, 32, 32]}
          material={new MeshBasicMaterial({color: 0x00ff00})}
          position={[-3, 0, 3]}
          key="2"
        />
        <BasicSphere key="3"
          position={[0, 6, 0]}
          refComponent={component => {
            component.material.color.setRGB(1, 1, 0); // Set yellow
          }}
        />
      </App>
    )
  }
}
