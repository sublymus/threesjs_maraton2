import { world_config } from './world_config.js'
export class LocalLoader {
  static testWorld = {
    scene: 0x334455,
    ground: 0x4ffcf9e,
  }
  static testGem = {
    color: 0x84d5dc,//pc
    metalness: 0,
    roughness: 0,
    reflectivity: 0,
    ior: 1.1,
    thickness: 30,
    clearcoat: 0,
    transmission: 1,
  }
  static testMetal = {
    color: 0xbead2e,//pc
    metalness: 1,
    roughness: 0,
  }

  ring = null;
  upDateFeatureMap
  modelPromise

  dependencies = {

    obj: {
      THREE: null,
      ADDON: null
    }
  }
  constructor() {

  }

  getDependencies() {
    return this.dependencies;
  }
  init = ({ THREE, ADDON }) => {
    this.dependencies.obj.ADDON = ADDON;
    this.dependencies.obj.THREE = THREE;
    const updateGem = (o, key, value) => {
      // let i = 0;
      // for (const mesh of o.children) {
      //   i++;
      //   if (i == 5 || i == 6) continue;
      //   mesh.material[key] = value;
      // }
      mesh.material[key] = value;
    }
    const updateMetal = (o, key, value) => {
      // [4, 5].forEach(v => {

      //   const mesh = o.children[v];
      //   if (mesh)
      //     mesh.material[key] = value;
      // })
      mesh.material[key] = value;
    }

    let root = null
    let i = 0;
    const f = (mesh, base) => {
      console.log(i++);
      if (Array.isArray(mesh)) {
        for (const m of mesh) {
          f(m, base)
        }
      } else {
        base.add(mesh)
      }
    }

    const seTmodel = (gltf) => {
      // const 
      // root = gltf.scene.children//[2].clone();
      // const base = new this.dependencies.obj.THREE.Object3D();
      // f(root,base);
      // base.add(root);
      // this.ring.add(base);
      // root.rotation.x = Math.PI * (85 / 180);
      const metal = new THREE.MeshPhysicalMaterial({
        color: LocalLoader.testMetal.color,
        metalness: 1,
        roughness: 0,
        flatShading: false
      });
      gltf.children[0].material = metal;
      gltf.children[1].visible = false;
      gltf.children[2].material = metal;
      gltf.children[3].material = metal;
      metal.flatShading = false;
      metal.needsUpdate = true;
      gltf.children[0].geometry.normalsNeedUpdate = true;
      const material = new THREE.MeshPhysicalMaterial({
        color: LocalLoader.testGem.color,
        metalness: LocalLoader.testGem.metalness,
        roughness: LocalLoader.testGem.roughness,
        ior: LocalLoader.testGem.ior,
        // envMap: hdrEquirect,
        envMapIntensity: 1,
        transmission: LocalLoader.testGem.transmission,
        specularIntensity: 1,
        specularColor: LocalLoader.testGem.specularColor,
        side: this.dependencies.obj.THREE.DoubleSide,
        transparent: true
      });
      gltf.children[4].material = material;
      gltf.scale.set(0.3, 0.3, 0.3)

      return gltf
    }

    this.modelPromise = new Promise((rev) => {
      new this.dependencies.obj.ADDON.OBJLoader().load(`${world_config.url}/Engagement_9mm.obj`, (gltf) => {
        console.log(gltf);
        rev(seTmodel(gltf))
      });
    })


    this.upDateFeatureMap = {
      'metal': (value) => {
        if (typeof value == 'number' || typeof value == 'string' || typeof value == 'boolean') {
          if (typeof value == 'string') updateMetal(root, 'color', new this.dependencies.obj.THREE.Color(parseInt(value, 16)))
        } else {
          updateMetal(root, 'color', value?.value ? new this.dependencies.obj.THREE.Color(parseInt(value.value, 16)) : LocalLoader.testMetal.color)
        }
      },
      'gem': (value) => {
        if (typeof value == 'number' || typeof value == 'string' || typeof value == 'boolean') {
          if (typeof value == 'string') updateGem(root, 'color', new this.dependencies.obj.THREE.Color(parseInt(value, 16)))
        } else {
          updateGem(root, 'color', value?.value ? new this.dependencies.obj.THREE.Color(parseInt(value.value, 16)) : LocalLoader.testMetal.color)
        }
      }
    }
  }

  getModel() {
    return this.modelPromise
  }

  showFeature(_id) {
    throw new Error("Method not implemented.");
  }

  updateFeature(feature, value) {
    this.upDateFeatureMap[feature.name]?.(value)
  }

}
