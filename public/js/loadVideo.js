import * as THREE from '../node_modules/three/build/three.module.js';

let volume = 1
// export default function createVideo(scene, level) {
//     console.log("loading video")
//     const video = document.getElementById("video")
//     console.log(video)
//     video.load()
//     video.play()
//     let videoTexture = new THREE.VideoTexture(video)
//     videoTexture.minFilter = THREE.LinearFilter
//     videoTexture.magFilter = THREE.LinearFilter
//     videoTexture.format = THREE.RGBFormat

//     let videoObject = new THREE.Mesh(
//         new THREE.PlaneGeometry(3, 1.6),
//         new THREE.MeshBasicMaterial( { map: videoTexture } )
//     )

//     videoObject.position.set(-3.15, -0.85, -1.39)
//     videoObject.autoplay = true
//     videoObject.rotation.set(0, 179.07, 0)
//     videoObject.name = "movieVideo"
//     console.log(scene)
//     scene.add(videoObject)
//     console.log("video added")

// }

export default class CreateVideo {
    constructor(scene, level) {
        this.scene = scene
        this.level = level
        this.video1Boolean = false
        this.video2Boolean = false
        this.video3Boolean = false
        this.video4Boolean = false


        this.goldParamsImages = [ // Mudei para um array de objetos pois assim consigo trabalhar melhor com o for e a função fica melhor utilizada
            { // Video 1
                videoPosition: {
                    "x": 6.75,
                    "y": -1.05,
                    "z": -0.8
                },
                videoRotation: {
                    "x": 0,
                    "y": -89.54,
                    "z": 0
                }
            },
            { // Video 2
                videoPosition: {
                    "x": 2.3,
                    "y": -1,
                    "z": -12.4
                },
                videoRotation: {
                    "x": 0,
                    "y": 119.37,
                    "z": 0
                }
            }

        ]
    }

    loadVideo(mobileControls) {


        this._loadImageStatic()

        const video = document.getElementById("video2")
        video.load()
        let videoTexture = new THREE.VideoTexture(video)
        videoTexture.minFilter = THREE.LinearFilter
        videoTexture.magFilter = THREE.LinearFilter
        let videoObject = new THREE.Mesh(new THREE.PlaneGeometry(2.7, 1.35), new THREE.MeshBasicMaterial({ map: videoTexture }))
        videoObject.position.set(2.25, -1.1, -12.4)

        videoObject.rotation.set(0, 119.37, 0)
        videoObject.name = "video2"
        this.scene.add(videoObject)
        video.volume=0;
        video.play()

    }

    _loadImageStatic() {
        let imgArr = [ '../files/GBXVesting/NFTs.png', '../files/GBXVesting/GBX-Logo.png']

        for(var i = 0; i < 1; i++) {
            let planeGeometry = new THREE.PlaneGeometry(2.7, 1.35)
            let texture = new THREE.TextureLoader().load(imgArr[i])
            let planeMaterial = new THREE.MeshLambertMaterial({ map: texture, transparent: true})

            var plane = new THREE.Mesh(planeGeometry, planeMaterial)
            plane.position.set(this.goldParamsImages[i].videoPosition.x, this.goldParamsImages[i].videoPosition.y, this.goldParamsImages[i].videoPosition.z)
            plane.rotation.set(this.goldParamsImages[i].videoRotation.x, this.goldParamsImages[i].videoRotation.y, this.goldParamsImages[i].videoRotation.z)

            this.scene.add(plane)
        }



        let buttonPDFGeometry = new THREE.PlaneGeometry(0.5, 0.5)
        let buttonPDFTexture = new THREE.TextureLoader().load('../files/GBXVesting/pdf.png')
        let buttonPDFPlaneMaterial = new THREE.MeshLambertMaterial({ map: buttonPDFTexture, transparent: true, DoubleSide: true})

        let buttonPDFObject = new THREE.Mesh(buttonPDFGeometry, buttonPDFPlaneMaterial)
        buttonPDFObject.position.set(0.3, -0.85, -12.4)
        buttonPDFObject.rotation.set(0, 119.37, 0)

        buttonPDFObject.name = 'assets'

        this.scene.add(buttonPDFObject)

        let buttonPDFObject2 = new THREE.Mesh(buttonPDFGeometry, buttonPDFPlaneMaterial)
        buttonPDFObject2.position.set(6.75, -0.85, -2.70)
        buttonPDFObject2.rotation.set(0, -89.54, 0)

        buttonPDFObject2.name = 'tokens'
        this.scene.add(buttonPDFObject2)
        
        let buttonlinkTexture1 = new THREE.TextureLoader().load('../files/GBXVesting/link.png')
        let buttonInfoPlaneMaterial2 = new THREE.MeshLambertMaterial({ map: buttonlinkTexture1, transparent: true, DoubleSide: true})
        let buttonlinkObject1 = new THREE.Mesh(buttonPDFGeometry, buttonInfoPlaneMaterial2)
        
        buttonlinkObject1.position.set(0.3, -1.45, -12.4)
        buttonlinkObject1.rotation.set(0, 119.37, 0)
        buttonlinkObject1.name = 'GBX-link'
        this.scene.add(buttonlinkObject1)

        let buttonlinkObject2 = new THREE.Mesh(buttonPDFGeometry, buttonInfoPlaneMaterial2)
        buttonlinkObject2.position.set(6.75, -1.45, -2.70)
        buttonlinkObject2.rotation.set(0, -89.54, 0)
        buttonlinkObject2.name = 'NFTs-link'
        this.scene.add(buttonlinkObject2)

        
    }

    _addVideoOnScene(videoController, video, level, params) {
        if (level === "gold") {
            video.position.set(params.videoPosition.x, params.videoPosition.y, params.videoPosition.z)
            video.rotation.set(params.videoRotation.x, params.videoRotation.y, params.videoRotation.z)
            this.scene.add(video)
            // setTimeout(videoController.play(), 10000)
        }
    }

    updateVideoVolume(camera, mobileControls, mutedControlsButton) {
        
        const maxDistance = 500;
        

        // for (var i = 1; i < 2; i++) { // @TODO POSITIONAL AUDIO with rotation 
            const video = document.getElementById("video1" )
            let distanceBetweenPlayerVideo = camera.position.distanceToSquared(this.scene.getObjectByName("video1").position)
            //  console.log("distance: " + distanceBetweenPlayerVideo)
            

            if(distanceBetweenPlayerVideo < maxDistance){
                if(!mutedControlsButton){
                    if(!mobileControls.detectiOS()){
                        // console.log("mutedControlsButton " + mutedControlsButton)
                        video.muted = false;
                    } 
                }
                // console.log(video.muted)
        
                volume = Math.max( 0, 1 - 1/maxDistance * distanceBetweenPlayerVideo )
            }
            else{
                volume = 0                
            }    
                
            if (isNaN(volume) || !isFinite(volume)){
                volume = 0
            }
            // console.log("video " + i + ": " + volume)
            video.volume = parseFloat(volume)

            
        // }
    }
}
