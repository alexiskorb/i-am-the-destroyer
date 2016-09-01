
PrisonScene = require("./base_prison_scene.js");
THREE = require("three");
ThreeUtils = require("../sdk/threeutils");
ClickTarget = require("./clicktarget.js");

// In which you must get past a keypad door

var PrisonScene3 = function()
{
	this.backgroundUrl = "media/doorframe.png";

	PrisonScene.call(this);
}

PrisonScene3.prototype = new PrisonScene();

PrisonScene3.prototype.added = function()
{
	var atlas = ThreeUtils.loadAtlas("prison1");
	
	this.ffx = 650;
	this.ffy = -88;
	this.crystalSprite = this.createClickableSprite("crystal", this.ffx, this.ffy);
	this.crystalBob = 0;

	// create door
	var doorClickTarget = this.createClickableSprite("keydoor", 0, 0);
	doorClickTarget.addAction({
		action: "showInfoBox",
		target: "keypad",
		continue: true
	})
	doorClickTarget.addAction({
		action: "triggerScene",
		target: "prison4",
		globalIsTrue: "LAMP_PLUGGED_IN",
		globalIsFalse: "DAM_BUILT"
	})
	doorClickTarget.addAction({
		action: "triggerScene",
		target: "prison4",
		globalIsTrue: "BAD_DOOR"
	})

	// create outlet
	var outlet = this.createClickableSprite("outlet", -500, 0);
	outlet.addAction({
		action: "showInfoBox",
		target: "outlet",
		continue: true
	})
	outlet.addAction({
		action: "interact",
		target: "lamp",
		setGlobals: ["LAMP_PLUGGED_IN"]
	})
	var lamp = this.createClickableSprite("lamplarge", -600, 85);
	lamp.addTrue("LAMP_PLUGGED_IN");

	PrisonScene.prototype.added.call(this);
}

PrisonScene3.prototype.update = function()
{
	this.crystalBob += bmacSdk.deltaSec;
	this.crystalSprite.mesh.position.y = this.ffy + Math.cos(this.crystalBob) * 20 - 10;
	PrisonScene.prototype.update.call(this);
}

module.exports = new PrisonScene3();
