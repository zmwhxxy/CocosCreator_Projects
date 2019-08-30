// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
       m_Hero:cc.Animation,
       m_BtRoll:cc.Button,
       m_bCanClicked:true,
    },

    // LIFE-CYCLE CALLBACKS:

    //第一次进入游戏，控件创建后会调用此函数
    onLoad () {
        this.m_bCanClicked = true;

        this.m_BtRoll.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.m_BtRoll.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.m_BtRoll.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        
        this.m_Hero.play('Run');
    },

    onTouchStart () {
        if(this.m_bCanClicked && this.m_Hero.currentClip.name != 'Jump') {
            this.m_Hero.play('Roll');
        }
    },

    onTouchEnd () {
        if(this.m_bCanClicked && this.m_Hero.currentClip.name != 'Jump') {
            this.m_Hero.play('Run');
        }    
    },

    onAnimationEnd() {
        this.m_bCanClicked = true;
        this.m_Hero.play('Run');
    },

    onAnimationChanged:function(target, data) {
        if(this.m_bCanClicked) {
            this.m_bCanClicked = false;

            var callback = cc.callFunc(this.onAnimationEnd.bind(this), this.m_Hero.node, this);
            this.m_Hero.play(data);
            
            if(data == "Jump") {
                var jumpBy = cc.jumpBy(2, 0, 0, 84, 1);
                var seq = cc.sequence(jumpBy, callback);
                this.m_Hero.node.runAction(seq)
            }
        }
    },

    start () {

    },

    // update (dt) {},
});
