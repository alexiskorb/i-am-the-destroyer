
THREE = require("three");

var Scene = function()
{
	this.transform = new THREE.Object3D();
	this.clickTargets = [];
}

module.exports = Scene;

Scene.prototype.added = function()
{

}

Scene.prototype.createClickTarget = function(mesh)
{
	var target = new ClickTarget(mesh);
	this.clickTargets.push(target);
	return target;
}

/**
 * Gets the click target at the specified position, if any.
 */
Scene.prototype.getClickTarget = function(position)
{
	for (var i = 0; i < this.clickTargets.length; i++)
	{
		if (this.clickTargets[i].isPointInBounds(position))
		{
			return this.clickTargets[i];
		}
	}
	return null;
}

Scene.prototype.show = function()
{
	GameEngine.scene.add(this.transform);
}

Scene.prototype.hide = function()
{
	GameEngine.scene.remove(this.transform);
}