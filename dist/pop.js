export default class PopupPlugin{

constructor(scene, bT, bC, wH, p, w,closed, xpos, ypos, textAdjust, fontSize, animate) {
   // Check to see if any optional parameters were passed
   // set properties from opts object or use defaults
   this.scene = scene;
   this.borderThickness = bT//10;
   this.closeBorderThickness = 3//10;
   this.borderColor = bC//0x005e58;//0x907748;
   this.borderAlpha = 1;
   this.windowAlpha = 0.95;
   this.windowColor = 0x303030;
   this.windowHeight = wH//700;
   this.padding = p//32;
   //this.closeBtnColor = "darkorange";
   this.dialogSpeed = 3.5;
   this.fontsize = fontSize;
   // used for animating the text
   this.eventCounter = 0;
   // if the dialog window is shown
   this.visible = true;
   // the current text in the window
   // the text that will be displayed in the window
   this.dialog;
   this.graphics;
   this.closeBtn;
   this.w = w;
   this.closed = closed;
   this.closedFlag = 0;

   this.xpos = xpos;
   this.ypos = ypos;
   this.textAdjust = textAdjust;
   this.animate = animate;
   // Create the dialog window
   this._createWindow();
   
}
 
  //  Called when a Scene shuts down, it may then come back again later
  // (which will invoke the 'start' event) but should be considered dormant.
 
  // called when a Scene is destroyed by the Scene Manager
  destroy() {
    this.shutdown();
    this.scene = undefined;
  }
    // Initialize the dialog modal
  
  // Gets the width of the game (based on the scene)
_getGameWidth() {
  return this.w;
}
  
 
// Gets the height of the game (based on the scene)
_getGameHeight() {
  return this.scene.sys.game.config.height;
}
 
// Calculates where to place the dialog window based on the game size
_calculateWindowDimensions(width, height) {
  var x = this.padding + this.xpos;
  var y = height - this.windowHeight - this.padding + this.ypos;
  var rectWidth = width - (this.padding * 2);
  var rectHeight = this.windowHeight;
  return {
    x,
    y,
    rectWidth,
    rectHeight
  };
}
// Creates the inner dialog window (where the text is displayed)
_createInnerWindow(x, y, rectWidth, rectHeight) {
  this.graphics.fillStyle(this.windowColor, this.windowAlpha);
  this.graphics.fillRect(x + 1, y + 1, rectWidth - 1, rectHeight - 1);
}
 
// Creates the border rectangle of the dialog window
_createOuterWindow(x, y, rectWidth, rectHeight) {
  this.graphics.lineStyle(this.borderThickness, this.borderColor, this.borderAlpha);
  this.graphics.strokeRect(x, y, rectWidth, rectHeight);
}
// Creates the dialog window
_createWindow(){
  var gameHeight = this._getGameHeight();
  var gameWidth = this._getGameWidth();
  var dimensions = this._calculateWindowDimensions(gameWidth, gameHeight);
  this.graphics = this.scene.add.graphics();
 
  this._createOuterWindow(dimensions.x, dimensions.y, dimensions.rectWidth, dimensions.rectHeight);
  this._createInnerWindow(dimensions.x, dimensions.y, dimensions.rectWidth, dimensions.rectHeight);
  this._createCloseModalButton();
  this._createCloseModalButtonBorder();
}
// Creates the close dialog window button

_createCloseModalButton() {
  if (this.closed == 1){
      var self = this;
      this.closeBtn = this.scene.make.text({
        x: this._getGameWidth() - this.padding - 33.5 + this.xpos,
        y: this._getGameHeight() - this.windowHeight - this.padding + 0.5+ this.ypos,
        text: 'X',
        style: {
          font: 'bold 40px Arial',
          fill: "darkred"
        }
      });
      this.closeBtn.setInteractive();
      this.closeBtn.on('pointerover', function () {
        this.setTint(0x000000);
      });
      this.closeBtn.on('pointerout', function () {
        this.clearTint();
      });
      this.closeBtn.on('pointerdown', function () {
        self.toggleWindow();
        this.closedFlag = 1;
      });
  }
}


_createCloseModalButtonBorder() {
  if (this.closed == 1) {
  var x = this._getGameWidth() - this.padding - 40 + this.xpos;
  var y = this._getGameHeight() - this.windowHeight - this.padding +this.ypos;
  this.graphics.lineStyle(this.closeBorderThickness, this.borderColor, this.borderAlpha);
  this.graphics.strokeRect(x, y, 40, 40);

  }
}

// Hide/Show the dialog window
toggleWindow(){
  this.visible = !this.visible;
  if (this.text) this.text.visible = this.visible;
  if (this.graphics) this.graphics.visible = this.visible;
  if (this.closeBtn) this.closeBtn.visible = this.visible;
  this.closedFlag = 1;
}

setText(text, animate){
  animate = this.animate;
  // Reset the dialog
  this.eventCounter = 0;
  this.dialog = text.split('');
  if (this.timedEvent) this.timedEvent.remove();
 
  var tempText = animate ? '' : text;
  this._setText(tempText);

  if (animate) {
    this.timedEvent = this.scene.time.addEvent({
      delay: 125 - (this.dialogSpeed * 30),
      callback: this._animateText,
      callbackScope: this,
      loop: true
      
    });
  }
}
 
// Calcuate the position of the text in the dialog window
_setText(text) {
  // Reset the dialog
  if (this.text) this.text.destroy();
 
  var x = this.padding * 2 + this.xpos + 0.90*(-this.textAdjust);
  var y = this._getGameHeight() - this.windowHeight+this.padding + this.ypos;
 
  this.text = this.scene.make.text({
    x,
    y,
    text,
    style: {
      wordWrap: {
        width: this._getGameWidth() - this.padding * 2 - 25 + this.textAdjust,
      },
    },
  });

  this.text.setLineSpacing(6);
  this.text.setFontSize(this.fontsize);
}
_animateText(){
  this.eventCounter++;
  this.text.setText(this.text.text + this.dialog[this.eventCounter - 1]);
  if (this.eventCounter === this.dialog.length) {
    this.timedEvent.remove();
  }
}
}
