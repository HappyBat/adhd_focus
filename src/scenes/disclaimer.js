import Config from "../config";
import PopupPlugin from "../../dist/pop";

export default class disclaimer extends Phaser.Scene {
  constructor() {
    super({ key: "disclaimer" });
  }

  create() {
    /*this.disclaimer = this.add
      .graphics()
      .lineStyle(1, 0xffffff, 1.0)
      .strokeRect(0, 0, 1350, 768)*/
    this.t = "Disclaimer";
    this.disclaimerHeading = this.add
      .text(530, 70, this.t, {
        fontSize: "46px",
        fill: "white",
      })
      .setDepth(2000);
    /*this.link = this.add
      .text(530, 70, "link", {
        fontSize: "20px",
        fill: "white",
      })
      .setDepth(2000);
    this.link.setInteractive();
    this.link.on("pointerdown", () => {
      this.openExternalLink();
    });*/
    this.t2 =
      "\n\nThis game is journalistic work. As such it does not constitute medical, professional, scientific or other advice of any sort. You must not use the information for diagnosing or treating a medical or health condition.\n\n" +
      "Please seek appropriate professional advice. If you are in the UK, in an emergency you can call 999. For Europe call 112 and for America call 911. If you are in the UK and you are in a crisis and need to speak to someone (not in immediate danger) call the NHS at 111, contact your GP and ask for an emergency appointment, contact the Samaritans (116 123) or the 'Shout crisis text line' (85258).\n\n" +
      "If you would like to talk to someone about ADHD, telephone ADDISS (ADHD Europe) on 020 8952 2800. You can find further information on AD(H)D at https://www.adhdfoundation.org.uk/ (UK), https://adhdeurope.eu/ (EU) or https://chadd.org/ (America).\n\n" +
      "If you have Attention Deficit (Hyperactivity) Disorder, depression or Obsessive-Compulsive Disorder, playing the game might act as a trigger, although the author took great care in avoiding anything that she considers too sensitive for people with those mental health conditions. \n\n" +
      "Playing the game is at your own risk. The author is not liable for any discomfort arising from playing this game.\n\n" +
      "If you have any questions, remarks, complaints, praise, criticism or ideas for improvement please contact golubr[at]cardiff.ac.uk.";

    this.disclaimerText = new PopupPlugin(
      this,
      1,
      "0xffffff",
      700,
      16,
      1366,
      0,
      0,
      0,
      0,
      "20px",
      false
    );
    this.disclaimerText.setText(this.t2, true);

    this.add
      .graphics()
      .fillStyle(0x505050, 0.8)
      .fillRect(1250, 680, 60, 40)
      .lineStyle(3, 0x005e58, 1.0)
      .strokeRect(1250, 680, 60, 40);
      /*.graphics()
      .fillStyle(0x505050, 0.8)
      .fillRect(1110, 680, 200, 40)
      .lineStyle(3, 0x005e58, 1.0)
      .strokeRect(1110, 680, 200, 40);*/
    this.text1 = {
      x: 1100,
      y: 690,
      text: "Ok, let's  GO!",
      style: { color: "#ffffff", fontSize: "24px"},
    };
    this.Go = this.make.text(this.text1);
    this.Go.setInteractive({ useHandCursor: true });
    this.Go.on("pointerdown", () => {
      this.scene.start("intermediate");
    });
  }
  openExternalLink() {
    /*var ADHDFOundation = "ADHD Foundation";
    var url1 ="https://www.adhdfoundation.org.uk/" + encodeURIComponent(ADHDFOundation);

    var s = window.open(url1, '_blank');

    if (s && s.focus)
    {
        s.focus();
    }
    else if (!s)
    {
        window.location.href = url1;
    }*/
  }

  update() {}
}
