import { LocalLoader } from "./LocalLoader.js";
class World {
    scene;
    camera;
    controls = null;
    localLoader;

    dependencies = {
        obj: {
            THREE: null,
            WorldManager: null,
            ADDON: null,
        }
    }
    WorldManager;
    constructor() {
        this.localLoader = new LocalLoader();
    }
    getDependencies() {
        this.dependencies.path = {
            ...this.dependencies.path,
            ...this.localLoader.getDependencies().path
        }
        return this.dependencies;
    }
    init = (objDependencies, renderer, WorldManager) => {
        const { THREE, ADDON } = objDependencies;
        this.dependencies.obj.ADDON = ADDON;
        this.dependencies.obj.THREE = THREE;
        this.WorldManager = WorldManager;

        this.scene = new this.dependencies.obj.THREE.Scene();
        this.camera = new this.dependencies.obj.THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100)
        this.camera.position.set(7, 7, 7);
        this.camera.lookAt(0, 0, 0);
        this.scene = new this.dependencies.obj.THREE.Scene();

        const setTexture = (texture) => {
            texture.mapping = this.dependencies.obj.THREE.EquirectangularReflectionMapping;
            this.scene.background = texture;
            this.scene.environment = texture;
        }

        const path = '/src/World/images/royal_esplanade_1k.hdr';

        this.WorldManager.loadCache(new this.dependencies.obj.ADDON.RGBELoader(), path, setTexture)

        this.localLoader.init(objDependencies);
        const hemiLight = new this.dependencies.obj.THREE.HemisphereLight(0xffffff, 0xffffff, 2);
        hemiLight.color.setHSL(0.6, 1, 0.6);
        hemiLight.groundColor.setHSL(0.095, 1, 0.75);
        hemiLight.position.set(0, 50, 0);
        this.scene.add(hemiLight);

        this.localLoader.getModel().then((model) => {
            this.scene.add(model);
        })

        window.addEventListener('resize', () => {
            (this.camera).aspect = window.innerWidth / window.innerHeight;
            (this.camera).updateProjectionMatrix();
        })

        this.controls = new this.dependencies.obj.ADDON.OrbitControls(this.camera, this.WorldManager.tactil.getView())
        this.controls.target.z = 0;
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.enabled = true;
        this.controls.maxDistance = 20;
        this.controls.minDistance = 7;
    }

    getScene() {
        return this.scene
    }
    getCamera() {
        return this.camera
    }
    update(t) {
        t = t / 10
        this.controls?.update();
        this.scene.rotation.y = t;
        // console.log(this.scene.children[1]?.rotation.x);
    }

    open() {
        if (this.controls) this.controls.enabled = true;
        //    console.log('this.dependencies.obj.WorldManager',this.WorldManager);
        this.WorldManager.tactil.visibility(false);
        const path = '/src/World/images/royal_esplanade_1k.hdr';
        // this.WorldManager.loadCache(new this.dependencies.obj.ADDON.RGBELoader(), path, (t) => this.scene.getObjectByName('Round').material.envMap = t);
    }
    close() {
        if (this.controls) this.controls.enabled = false;
    }
}

export { World };
