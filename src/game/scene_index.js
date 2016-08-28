
Scene = require("./base_scene.js");
THREE = require("three");
ThreeUtils = require("../sdk/threeutils");
ClickTarget = require("./clicktarget.js");

var IndexScene = function()
{
	this.backgroundUrl = "media/prison1_bg.png";

	Scene.call(this);
}

IndexScene.prototype = new Scene();

IndexScene.prototype.added = function()
{
	var atlas = ThreeUtils.loadAtlas("prison1");
	
	// create forcefield
	this.ffx = -278;
	this.ffy = -88;
	this.forcefieldSprites = [];
	for (var i = 0; i < 4; i++)
	{
		var sprite = ThreeUtils.makeAtlasMesh(atlas, "prison1_ff");
		sprite.position.set(this.ffx, this.ffy, -15);
		this.transform.add(sprite);
		this.forcefieldSprites.push(sprite);
	}

	// create lasers
	var laserTexture = ThreeUtils.loadTexture("media/prison1_lasers.png");
	var laserGeo = ThreeUtils.makeSpriteGeo(1920, 1080);
	this.laserSprite = ThreeUtils.makeSpriteMesh(laserTexture, laserGeo);
	this.transform.add(this.laserSprite);
	this.laserSprite.z = -15;

	// create top shadow
	var topShadow = ThreeUtils.makeAtlasMesh(atlas, "prison_topshadow");
	this.transform.add(topShadow);
	//topShadow.

	// create floor
	
	// create johnson
	var johnsonSprite = this.createClickableSprite("johnson15_sprite", -200, -200);
	johnsonSprite.triggerConversation = require("../data/prophet_conversation.json");

	// create door
	var doorClickTarget = this.createClickableSprite("door", 0, 0);
	doorClickTarget.triggerScene = "creationOfTheWorld";

	Scene.prototype.added.call(this);
}

IndexScene.prototype.update = function()
{
	// jitter forcefield
	for (var i = 0; i < this.forcefieldSprites.length; i++)
	{
		this.forcefieldSprites[i].position.set(
			this.ffx + (Math.random()-0.5)*4*i, this.ffy + (Math.random()-0.5)*4*i,
			this.forcefieldSprites[i].position.z);
	}
}

module.exports = new IndexScene();
