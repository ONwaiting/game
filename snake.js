window.onload = function () {
    (function () {
        class snake {
            constructor() {
                this.startBtn = document.querySelector('button'); //开始按钮
                this.stopBtn = document.querySelector('button:last-of-type'); //暂停按钮
                this.sHead = document.querySelector('.head'); //蛇头
                this.game = document.querySelector('.game'); //场景
                this.posi = []; //蛇的位置
                this.dir = 0; //运动方向
            }
            init() {
                var that = this;
                this.head = document.querySelectorAll('.game>div'); //初始化开始位置
                this.startBtn.style.left = this.game.offsetLeft + 140 + 'px'; //设置开始按钮位置
                this.stopBtn.style.left = this.startBtn.offsetLeft + this.startBtn.offsetWidth + 20 + 'px';
                this.startBtn.style.top = this.game.offsetTop - this.startBtn.offsetHeight - 20 + 'px';
                this.stopBtn.style.top = this.game.offsetTop - this.startBtn.offsetHeight - 20 + 'px';
                this.posi = [{
                    x: 0,
                    y: 0
                }, {
                    x: 1,
                    y: 0
                }, {
                    x: 2,
                    y: 0
                }]; //蛇的初始位置
                for (let i = 0; i < this.posi.length; i++) {
                    this.head[i].style.left = this.posi[i].x * 15 + 'px';
                    this.head[i].style.top = this.posi[i].y * 15 + 'px';
                }

                //蛇运动方向判定
                document.onkeydown = function (e) {
                    if (e.keyCode === 39) {
                        that.dir = 0;
                    } else if (e.keyCode === 37) {
                        that.dir = 1;
                    } else if (e.keyCode === 40) {
                        that.dir = 2;
                    } else if (e.keyCode === 38) {
                        that.dir = 3;
                    }
                }
                this.food(); //显示第一个食物
                var time = 100; //蛇的运动速度
                this.startBtn.onclick = function () {
                    clearInterval(that.timer);
                    that.timer = setInterval(function () {
                        that.move(); //运动函数
                    }, time);
                }
                this.stopBtn.onclick = function () {
                    clearInterval(that.timer);
                }
            }
            move() {
                var flag = false; //吃掉食物开关
                var arrST = {}; //保存蛇尾位置
                arrST.x = this.posi[0].x;
                arrST.y = this.posi[0].y;
                for (var i = 0; i < this.posi.length; i++) {
                    if (i + 1 < this.posi.length) {
                        this.posi[i].x = this.posi[i + 1].x;
                        this.posi[i].y = this.posi[i + 1].y;
                    }
                }
                switch (this.dir) {
                    case 0:
                        this.posi[this.posi.length - 1].x++;
                        if (this.posi[this.posi.length - 1].x > 39) {
                            this.posi[this.posi.length - 1].x = 39;
                        } //蛇的位置判定
                        break;
                    case 1:
                        this.posi[this.posi.length - 1].x--;
                        if (this.posi[this.posi.length - 1].x < 0) {
                            this.posi[this.posi.length - 1].x = 0;
                        }
                        break;
                    case 2:
                        this.posi[this.posi.length - 1].y++;
                        if (this.posi[this.posi.length - 1].y > 26) {
                            this.posi[this.posi.length - 1].y = 26;
                        }
                        break;
                    case 3:
                        this.posi[this.posi.length - 1].y--;
                        if (this.posi[this.posi.length - 1].y < 0) {
                            this.posi[this.posi.length - 1].y = 0;
                        }
                        break;
                }
                
                //蛇头位置与食物位置重合判定
                if(this.posi[this.posi.length - 1].x*15===this.foodAr[0].x&&this.posi[this.posi.length - 1].y*15===this.foodAr[0].y){
                    this.posi.unshift(arrST);
                    flag = true;
                    this.game.removeChild(this.foodD);
                    this.food(); //重写食物函数
                }
                this.display(flag);
            }
            food() { //食物函数
                var that = this;
                this.foodD = document.createElement('div');
                var flag;
                var foodPosi = {}; //随机食物的位置
                this.foodAr = []; //保存蛇的位置
                foodPosi.x = Math.round(this.ran(0, that.game.offsetWidth - 15));
                foodPosi.y = Math.round(this.ran(0, that.game.offsetHeight - 15));
                while (this.foodAr.length < 1) { //循环判定食物的位置
                    flag = true;
                    if (foodPosi.x % 15 === 0 && foodPosi.y % 15 === 0) {
                        for (var i = 0; i < this.posi.length; i++) {
                            if (this.posi[i].x * 15 === foodPosi.x && this.posi[i].y * 15 === foodPosi.y) {
                                foodPosi.x = Math.round(this.ran(0, that.game.offsetWidth - 15));
                                foodPosi.y = Math.round(this.ran(0, that.game.offsetHeight - 15));
                                flag = false; //确保食物的位置不与蛇的位置重合
                            }
                        }
                        if (flag) {
                            this.foodAr.push(foodPosi);
                        }
                    } else {
                        foodPosi.x = Math.round(this.ran(0, that.game.offsetWidth - 15));
                        foodPosi.y = Math.round(this.ran(0, that.game.offsetHeight - 15));
                    }

                }
                this.foodD.style.cssText = `left:${this.foodAr[0].x}px;top:${this.foodAr[0].y}px;`;
                this.foodD.className = 'food'; //场景中加入食物
                this.game.appendChild(this.foodD);
                // this.foodMove();
            }
            foodMove() {
                var speed = 0;
                var that = this;
                var x, y;
                this.foodD.timer = setInterval(function () {
                    speed = parseInt((Math.random() > 0.5 ? '-' : '') + 15 * that.ran(1, 3));
                    x = that.foodD.offsetLeft + speed;
                    y = that.foodD.offsetTop + speed;
                    if (x < 0) {
                        x = 0;
                    } else if (x > that.game.offsetWidth - 15) {
                        x = that.game.offsetWidth - 15;
                    }
                    if (y < 0) {
                        y = 0;
                    } else if (y > that.game.offsetHeight - 15) {
                        y = that.game.offsetHeight - 15;
                    }
                    // that.foodAr[0].x = x;
                    // that.foodAr[0].y = y;
                    var a = that.ran(1, 2);
                    if (a == 1) {
                        that.foodD.style.left = x + 'px';
                    } else {
                        that.foodD.style.top = y + 'px';
                    }
                }, 1000);
            }

            display(flag) { //显示函数
                var j = 0;
                if (flag) {
                    var divN = document.createElement('div');
                    this.game.insertBefore(divN, this.sHead);
                    console.log(this.posi);
                }
                this.body = document.querySelectorAll('.game>div');
                for (let i = 0; i < this.posi.length; i++) {
                    this.body[i].style.left = this.posi[i].x * 15 + 'px';
                    this.body[i].style.top = this.posi[i].y * 15 + 'px';
                    //蛇的越界判定
                    if (this.posi[i].x * 15 < 0) {
                        this.body[i].style.left = 0;
                    }
                    if (this.posi[i].y * 15 < 0) {
                        this.body[i].style.top = 0;
                    }
                    if (this.posi[i].x * 15 > this.game.offsetWidth - 15) {
                        this.body[i].style.left = this.game.offsetWidth - 15 + 'px';
                    }
                    if (this.posi[i].y * 15 > this.game.offsetHeight - 15) {
                        this.body[i].style.top = this.game.offsetHeight - 15 + 'px';
                    }
                }
            }
            ran(min, max) {
                return Math.round(Math.random() * (max - min) + min);
            }
            meet(obj0, obj1) {
                if ((obj0.offsetLeft + obj0.offsetWidth >= obj1.offsetLeft) && (obj0.offsetLeft < obj1.offsetLeft +
                        obj1.offsetWidth) &&
                    (obj0.offsetTop + obj0.offsetHeight >= obj1.offsetTop) && (obj0.offsetTop < obj1.offsetTop +
                        obj1.offsetHeight)
                ) {
                    return true;
                } else {
                    return false;
                }
            }
        }
        new snake().init();

    })(window);
}