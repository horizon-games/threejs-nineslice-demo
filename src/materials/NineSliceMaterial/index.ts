import {
  DoubleSide,
  RawShaderMaterial,
  Texture,
  Uniform,
  Vector2,
  Vector4
} from 'three'

import fragmentShader from './frag.glsl'
import vertexShader from './vert.glsl'

export interface NineSliceMaterialOptions {
  atlas: Texture
  atlasST: Vector4
  textureSize: Vector2
  textureSlicesLTRB: Vector4
  size: Vector2
  paddingScale: number
  opacity?: number
}

interface IUniforms {
  atlas: Uniform
  atlasST: Uniform
  size: Uniform
  u: Uniform
  v: Uniform
  xPadding: Uniform
  yPadding: Uniform
  opacity: Uniform
}

export default class NineSliceMaterial extends RawShaderMaterial {
  constructor(options: NineSliceMaterialOptions) {
    const { textureSlicesLTRB, textureSize, paddingScale } = options
    const uniforms: IUniforms = {
      atlas: new Uniform(options.atlas),
      atlasST: new Uniform(options.atlasST),
      size: new Uniform(options.size),
      u: new Uniform(
        new Vector4(
          0,
          textureSlicesLTRB.x / textureSize.x,
          textureSlicesLTRB.z / textureSize.x,
          1
        )
      ),
      v: new Uniform(
        new Vector4(
          0,
          textureSlicesLTRB.y / textureSize.y,
          textureSlicesLTRB.w / textureSize.y,
          1
        )
      ),
      xPadding: new Uniform(
        new Vector4(
          -textureSlicesLTRB.x * paddingScale,
          0,
          0,
          (textureSize.x - textureSlicesLTRB.z) * paddingScale
        )
      ),
      yPadding: new Uniform(
        new Vector4(
          textureSlicesLTRB.y * paddingScale,
          0,
          0,
          -(textureSize.y - textureSlicesLTRB.w) * paddingScale
        )
      ),
      opacity: new Uniform(options.opacity !== undefined ? options.opacity : 1)
    }
    super({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      side: DoubleSide,
      uniforms
    })
  }

  setSize(width: number, height: number) {
    this.uniforms.size.value.set(width, height)
  }

  set opacity(value: number) {
    if (this.uniforms) {
      this.uniforms.opacity.value = value
    }
  }

  get opacity() {
    if (this.uniforms) {
      return this.uniforms.opacity.value
    } else {
      return 1
    }
  }
}
