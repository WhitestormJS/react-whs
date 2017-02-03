import {Mesh, SphereGeometry, MeshBasicMaterial} from 'three';
import {MeshComponent} from 'whs';

export default class BasicSphere extends MeshComponent {
  build() {
    return new Mesh(
      new SphereGeometry(3, 16, 16), // radius: 3
      new MeshBasicMaterial({color: 0xff0000}) // red
    )
  }
}
