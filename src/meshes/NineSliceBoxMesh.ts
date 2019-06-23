import { Mesh } from 'three'
import NineSliceMaterial, {
  NineSliceMaterialOptions
} from '~/materials/NineSliceMaterial'

import NineSliceGeometry from './geometry/NineSliceGeometry'

let __geometry: NineSliceGeometry
function __getGeometry() {
  if (!__geometry) {
    __geometry = new NineSliceGeometry()
  }
  return __geometry
}

export default class NineSliceBoxMesh extends Mesh {
  material: NineSliceMaterial
  constructor(opts: NineSliceMaterialOptions) {
    super(__getGeometry(), new NineSliceMaterial(opts))
  }
  setSize(width: number, height: number) {
    this.material.setSize(width, height)
  }
}
