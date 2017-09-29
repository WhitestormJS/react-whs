import {
  Mesh,
  IcosahedronGeometry,
  MeshBasicMaterial
} from 'three';

import {MeshComponent} from 'whs';
import {reactify} from '../../src/index';

@reactify
export class BasicSphere extends MeshComponent {
  build() {
    return new Mesh(
      new IcosahedronGeometry(3, 5),
      this.applyBridge({
        material: new MeshBasicMaterial({color: 0xffffff})
      }).material
    )
  }
}
