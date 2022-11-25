import * as THREE from '../node_modules/three/build/three.module.js';

export default class HandleRaycaster{
    constructor(raycaster) {
        this.raycaster = raycaster
    }

    raycasterUpdate(camera) {
        let origin = camera.position.clone()
        origin.set(origin.x, origin.y - 2.5, origin.z)

        this.raycaster.set(origin, new THREE.Vector3(0, -1, 0))

        var intersectionsDown = this.raycaster.intersectObjects(this.getCollidables())

        var onObject = intersectionsDown.length > 0 && intersectionsDown[0].distance < 0.25
    }

    intersectObjects(pointer, camera, scene){
        this.raycaster.setFromCamera(pointer, camera)

        const intersects = this.raycaster.intersectObjects(scene.children)

        for(let i = 0; i < intersects.length; i++) {
            if(intersects[i].object.name == "assets") {
                let doc = document.getElementById("assets")
                doc.style.display = "flex";
            }
            else if(intersects[i].object.name == "tokens") {
                let doc = document.getElementById("tokens")
                doc.style.display = "flex";
            }
            else if(intersects[i].object.name == "GBX-link") {
                let url = "https://gbxbrasil.com/" 
                window.open(url, '_blank').focus();
            }

            else if(intersects[i].object.name == "NFTs-link") {
                let url = "https://www.gbxnft.com.br/" 
                window.open(url, '_blank').focus();
            }


            else {
                console.log(intersects[i])
            }
        }
    }

    getCollidables() {
        return 0
    }
}