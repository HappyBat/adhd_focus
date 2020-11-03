    /*
    if (this.allEmpties.length == 15) {
      for (var i = 0; i < this.allEmpties.length; i++) {
        console.log(this.allEmpties[i].y);
        console.log(i)
        if ((i == 0) || (i == 3) || (i == 7) || (i == 9) || (i == 13)) {
            var empty = this.allEmpties[i];
            empty.on("pointerdown", () => {
              console.log(empty)
              var y = empty.y;
              this.createRight(390, y, i);
          });
        }
        else {
          var empty = this.allEmpties[i];
          empty.on("pointerdown", () => {
            var y = empty.y;
            this.createWrong(390, y, i);
          });
        }
      }
    } 
  }*/
  }
  /*if (this.allEmpties.length == 15) {
        this.timedEvent2 = this.time.addEvent({
          delay: 0, 
          callback: onEventDolphins,
          callbackScope: this,
        });
      //this.createEmpty();

    /*this.empty1 = this.add
      .image(390, 164, "empty")
      .setInteractive()
      .setScale(0.6)
      .setDepth(1000);

    this.empty2 = this.add
      .image(390, 186.5, "empty")
      .setInteractive()
      .setScale(0.6)
      .setDepth(1000);

    this.empty3 = this.add
      .image(390, 209, "empty")
      .setInteractive()
      .setScale(0.6)
      .setDepth(1000);

    this.empty4 = this.add
      .image(390, 283, "empty")
      .setInteractive()
      .setScale(0.6)
      .setDepth(1000);

    this.empty5 = this.add
      .image(390, 305, "empty")
      .setInteractive()
      .setScale(0.6)
      .setDepth(1000);

    this.empty6 = this.add
      .image(390, 327, "empty")
      .setInteractive()
      .setScale(0.6)
      .setDepth(1000);

    this.empty7 = this.add
      .image(390, 401, "empty")
      .setInteractive()
      .setScale(0.6)
      .setDepth(1000);

    this.empty8 = this.add
      .image(390, 423, "empty")
      .setInteractive()
      .setScale(0.6)
      .setDepth(1000);

    this.empty9 = this.add
      .image(390, 445, "empty")
      .setInteractive()
      .setScale(0.6)
      .setDepth(1000);

    this.empty10 = this.add
      .image(390, 518, "empty")
      .setInteractive()
      .setScale(0.6)
      .setDepth(1000);

    this.empty11 = this.add
      .image(390, 540.5, "empty")
      .setInteractive()
      .setScale(0.6)
      .setDepth(1000);

    this.empty12 = this.add
      .image(390, 563, "empty")
      .setInteractive()
      .setScale(0.6)
      .setDepth(1000);

    this.empty13 = this.add
      .image(390, 636, "empty")
      .setInteractive()
      .setScale(0.6)
      .setDepth(1000);

    this.empty14 = this.add
      .image(390, 658.5, "empty")
      .setInteractive()
      .setScale(0.6)
      .setDepth(1000);

    this.empty15 = this.add
      .image(390, 681, "empty")
      .setInteractive()
      .setScale(0.6)
      .setDepth(1000);*/

  //right 1,4,8,10,14

  /*this.empty1.on("pointerdown", () => {this.createRight(this.empty1.x, this.empty1.y);});
    this.empty4.on("pointerdown", () => {this.createRight(this.empty4.x, this.empty4.y);});
    this.empty8.on("pointerdown", () => {this.createRight(this.empty8.x, this.empty8.y);});
    this.empty10.on("pointerdown", () => {this.createRight(this.empty10.x, this.empty10.y);});
    this.empty14.on("pointerdown", () => {this.createRight(this.empty14.x, this.empty14.y);});*/

  //wrong
  /*this.empty2.on("pointerdown", () => {this.createWrong(this.empty2.x, this.empty2.y);});

    this.empty2.on("pointerdown", () => {this.createWrong(this.empty2.x, this.empty2.y);});
    this.empty3.on("pointerdown", () => {this.createWrong(this.empty3.x, this.empty3.y);});
    this.empty5.on("pointerdown", () => {this.createWrong(this.empty5.x, this.empty5.y);});
    this.empty6.on("pointerdown", () => {this.createWrong(this.empty6.x, this.empty6.y);});
    this.empty7.on("pointerdown", () => {this.createWrong(this.empty7.x, this.empty7.y);});
    this.empty9.on("pointerdown", () => {this.createWrong(this.empty9.x, this.empty9.y);});
    this.empty11.on("pointerdown", () => {this.createWrong(this.empty11.x, this.empty11.y);});
    this.empty12.on("pointerdown", () => {this.createWrong(this.empty12.x, this.empty12.y);});
    this.empty13.on("pointerdown", () => {this.createWrong(this.empty13.x, this.empty13.y);});
    this.empty15.on("pointerdown", () => {this.createWrong(this.empty15.x, this.empty15.y);});*/

  //this.OnClick(right);
  //this.OnClick(wrong);

  /*OnClick(right,wrong){
    if(right){
      console.log("here");
      for(var i; i < 16; i++){
        name = "empty"+[i].toString();
        this.name.on("pointerdown", () => {
          this.createRight(this.name.x, this.name.y);
        });
      }
    }
    if(wrong){
      console.log("here");
      for(var i; i < 16; i++){
        name = "empty"+[i].toString();
        this.name.on("pointerdown", () => {
          this.createWrong(this.name.x, this.name.y);
        });
      }
    }
  }*/

  /*createEmpty(){
    console.log("hello")/*
    for(var i; i < 16; 1++){
      x = 390;
      y= 164;
      if (this.[i]==1){y=164;}
      if (this.[i]==2){y = 186.5;}
      if (this.[i]=3){y=209;} 
      if (this.[i]==4){y=283;}
      if (this.[i]==5){y=305;}
      if (this.[i]==6){y=327;}
      if (this.[i]==7){y=401;}
      if (this.[i]==8){y=423;}
      if (this.[i]==9){y=445;}
      if (this.[i]==10){y=518;}
      if (this.[i]==11){y=540.5;}
      if (this.[i]==12){y=563;}
      if (this.[i]==13){y=636;}
      if (this.[i]==14){y=658.5;}
      if (this.[i]==15){y=681;}

      this.emptyName = "empty"+[i].toString;
      this.emptyName = this.add
        .image(x, y, "empty")
        .setInteractive()
        .setScale(0.6)
        .setDepth(1000);
    }
  }*/

  /*onEventDolphins(x,y) {
    console.log()
    for (var i = 0; i < this.allEmpties.length; i++) {
    this.createWrong(x, y);
    /*
    if (this.allEmpties.length == 15) {
      for (var i = 0; i < this.allEmpties.length; i++) {
        console.log(this.allEmpties[i].y);
        console.log(i)
        if ((i == 0) || (i == 3) || (i == 7) || (i == 9) || (i == 13)) {
            var empty = this.allEmpties[i];
            empty.on("pointerdown", () => {
              console.log(empty)
              var y = empty.y;
              this.createRight(390, y, i);
          });
        }
        else {
          var empty = this.allEmpties[i];
          empty.on("pointerdown", () => {
            var y = empty.y;
            this.createWrong(390, y, i);
          });
        }
      }
    } 
  }*/
    /*if (this.allEmpties && this.executed2 == 0) {
      if (this.allEmpties.length == 15) {
        this.timedEvent2 = this.time.addEvent({
          delay: 0, 
          callback: onEventDolphins,
          callbackScope: this,
        });
      }
      function onEventDolphins() {
        for (var i = 0; i < this.allEmpties.length; i++) {
          this.allEmpties[i].on("pointerdown", () => {
            console.log(this.allEmpties[i]);

            this.right = this.add
              .image((this.allEmpties[i].x),(this.allEmpties[i].y), "right")
              .setScale(0.6)
              .setDepth(1200);
          });
        }
        this.executed2 = 1;
      }
    }*/