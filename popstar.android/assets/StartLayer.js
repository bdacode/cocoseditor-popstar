/**
 * @GameName :
 * popstar
 *
 * @DevelopTool:
 * Cocos2d-x Editor (CocosEditor)
 *
 * @time
 * 2014-02-23 pm
 *
 * @Licensed:
 * This showcase is licensed under GPL.
 *
 * @Authors:
 * Programmer: touchSnow
 *
 * @Links:
 * http://www.cocos2d-x.com/ (cocos官方)
 * https://github.com/makeapp      （github）
 * http://blog.csdn.net/touchsnow (csdn博客)
 * http://blog.makeapp.co/ （官方博客）
 * http://www.cocoseditor.com/ （建设中官网）
 *
 * @Contact
 * 邮箱：zuowen@makeapp.co
 * qq群：232361142
 *
 */


var StartLayer = function ()
{
    cc.log("StartLayer");
    this.newGame = this.newGame || {};
    this.pop = this.pop || {};
    this.star = this.star || {};
    this.menus = this.menus || {};
    this.isFirst = true;
};

StartLayer.prototype.onDidLoadFromCCB = function ()
{
    if (sys.platform == 'browser') {
        this.onEnter();
    }
    else {
        this.rootNode.onEnter = function ()
        {
            this.controller.onEnter();
        };
    }

};

cc.RADIANS_TO_DEGREES = function (angle)
{
    cc.log("angle==" + angle);
    cc.log("cc.DEG==" + cc.DEG)
    return angle * cc.DEG;
};

cc.DEG = 180 / Math.PI;

StartLayer.prototype.onEnter = function ()
{

    var sp = cc.RADIANS_TO_DEGREES(1.0);
    cc.log("sp==" + sp);

    this.star.setZOrder(200);
    this.pop.setZOrder(200);
    this.menus.setZOrder(200);
    this.menus.runAction(cc.Sequence.create(
            cc.MoveTo.create(0.3, cc.p(0, -60)),
            cc.MoveTo.create(0.1, cc.p(0, 100)),
            cc.MoveTo.create(0.1, cc.p(0, 0))
    ));

    if (sys.platform != 'browser') {
        if (this.isFirst) {
            cc.StarParticle.create(this.rootNode, 200, 800, "leaf_open");
            cc.StarParticle.create(this.rootNode, 500, 1000, "quanquan");
            this.isFirst = false;
        }
    }
    cc.AudioEngine.getInstance().playEffect("Resources/sounds/fire.mp3", true);
}

StartLayer.prototype.onStartClicked = function ()
{
    cc.AudioEngine.getInstance().stopAllEffects();
    this.newGame.runAction(cc.Sequence.create(cc.ScaleTo.create(0.1, 1.1), cc.DelayTime.create(0.5),
            cc.CallFunc.create(function ()
            {
                cc.AudioEngine.getInstance().stopAllEffects();
                cc.BuilderReader.runScene("", "MainLayer");
            }, this)
    ));
}
