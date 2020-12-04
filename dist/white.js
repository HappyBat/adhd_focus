export default class WhiteLayer {

  constructor(scene) {
    this.scene = scene;
    this.whiteLayer = this.scene.add
      .graphics()
      .fillStyle(0x505050, 0.9)
      .fillRect(0, 0, 1366, 768)
      .setDepth(950);
  }
  destroy() {
    this.whiteLayer.destroy();
  }
}
