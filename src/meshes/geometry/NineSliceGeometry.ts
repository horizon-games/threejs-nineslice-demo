import {
  BufferGeometry,
  Float32BufferAttribute,
  Sphere,
  Uint16BufferAttribute,
  Vector3
} from 'three'

export default class NineSliceGeometry extends BufferGeometry {
  constructor() {
    super()
    const gridX = 3
    const gridY = 3

    const gridX1 = gridX + 1
    const gridY1 = gridY + 1

    const vertCount = gridX1 * gridY1
    const triangleCount = gridX * gridY * 2
    const posArr = new Float32Array(vertCount * 2)
    const sizeMaskArr = new Float32Array(vertCount * 2)
    const sliceSelectorArr = new Float32Array(vertCount * 2)
    const indexArr = new Uint16Array(triangleCount * 3)

    const augmentedPositions = [-1, 0, 0, 1]

    let i2 = 0
    for (let iy = 0; iy < gridY1; iy++) {
      const ay = augmentedPositions[iy]
      for (let ix = 0; ix < gridX1; ix++) {
        const ax = augmentedPositions[ix]

        posArr[i2] = ax
        posArr[i2 + 1] = -ay

        sizeMaskArr[i2] = ix < 2 ? 0 : 1
        sizeMaskArr[i2 + 1] = iy < 2 ? 0 : -1

        sliceSelectorArr[i2] = ix
        sliceSelectorArr[i2 + 1] = iy

        i2 += 2
      }
    }

    let i6 = 0
    for (let iy = 0; iy < gridY; iy++) {
      for (let ix = 0; ix < gridX; ix++) {
        const a = ix + gridX1 * iy
        const b = ix + gridX1 * (iy + 1)
        const c = ix + 1 + gridX1 * (iy + 1)
        const d = ix + 1 + gridX1 * iy

        indexArr[i6] = a
        indexArr[i6 + 1] = b
        indexArr[i6 + 2] = d

        indexArr[i6 + 3] = b
        indexArr[i6 + 4] = c
        indexArr[i6 + 5] = d
        i6 += 6
      }
    }

    this.setIndex(new Uint16BufferAttribute(indexArr, 1))
    this.setAttribute('sizeMask', new Float32BufferAttribute(sizeMaskArr, 2))
    this.setAttribute(
      'sliceSelector',
      new Float32BufferAttribute(sliceSelectorArr, 2)
    )
    this.boundingSphere = new Sphere(new Vector3(), 1000)
  }
}
