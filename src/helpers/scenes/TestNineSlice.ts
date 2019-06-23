import {
  Mesh,
  MeshBasicMaterial,
  PlaneBufferGeometry,
  Vector2,
  Vector4,
  WebGLRenderer
} from 'three'
import { loadTexture } from '~/loaders/assetLoader'
import NineSliceBoxMesh from '~/meshes/NineSliceBoxMesh'

import { BaseTestScene } from './BaseTestScene'

export default class TestNineSliceScene extends BaseTestScene {
  private nineslices: NineSliceBoxMesh[] = []
  constructor() {
    super()

    const init = async () => {
      //
      const map = await loadTexture('nineslices.png')
      for (let i = 0; i < 10; i++) {
        const iCol = (i % 2) / 2
        const iRow = (~~(i / 2) % 2) / 2
        const nineslice = new NineSliceBoxMesh({
          atlas: map,
          atlasST: new Vector4(0.5, 0.5, iCol, iRow),
          size: new Vector2(600, 600),
          textureSize: new Vector2(512, 512),
          paddingScale: 1,
          textureSlicesLTRB: new Vector4(
            512 / 3,
            512 / 3,
            (512 / 3) * 2,
            (512 / 3) * 2
          )
        })
        nineslice.userData.speed = Math.random() + 0.5
        nineslice.userData.phase = Math.random()
        nineslice.position.set(
          -1 + Math.random() * 2,
          1 - Math.random() * 2,
          i * 0.1
        )
        nineslice.scale.multiplyScalar(0.001)
        this.scene.add(nineslice)
        this.nineslices.push(nineslice)
      }
      const plane = new Mesh(
        new PlaneBufferGeometry(),
        new MeshBasicMaterial({
          map,
          transparent: true
        })
      )
      plane.position.set(0, 1, 2)
      plane.scale.multiplyScalar(0.4)
      this.scene.add(plane)
    }
    init()
  }
  update(dt: number) {
    const now = performance.now() * 0.001
    for (const nineslice of this.nineslices) {
      const phase = (nineslice.userData.phase + now) * nineslice.userData.speed
      nineslice.setSize(
        (0.5 + 0.5 * Math.cos(phase * 1.2)) * 200 + 150,
        (0.5 + 0.5 * Math.sin(phase)) * 200 + 150
      )
    }
    super.update(dt)
  }
  render(renderer: WebGLRenderer, dt: number) {
    super.render(renderer, dt)
  }
}
