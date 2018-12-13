(function () {
    window.onload = function () {
        var bg_air = document.querySelector('.air');
        var speed = 0;

        function ran(min, max) {
            return Math.round(Math.random() * (max - min) + min);
        }
        bg_air.style.cssText = `background:url("./img/bg_0${ran(1,5)}.jpg") repeat-y;background-size:cover;`;
        setInterval(function () {
            speed += 2;
            bg_air.style.backgroundPosition = "0 " + speed + "px";
        }, 10);
        //user
        class myplane {
            constructor(w, url, burl) {
                this.w = w;
                this.url = url;
                this.burl = burl;
            }
            createPlane() {
                this.plane = document.createElement('img');
                this.plane.src = this.url;
                this.plane.style.position = 'absolute';
                this.plane.style.left = document.documentElement.clientWidth / 2 - this.w / 2 + 'px';
                this.plane.style.top = document.documentElement.clientHeight - 100 + 'px';
                bg_air.appendChild(this.plane);
                this.move();
            }
            move() {
                var that = this;
                var timerU = null;
                var timerD = null;
                var timerL = null;
                var timerR = null;
                var y = this.plane.offsetTop;
                var x = this.plane.offsetLeft;
                document.addEventListener('keydown', function (e) {
                    switch (e.keyCode) {
                        case 87:
                            moveup();
                            break;
                        case 83:
                            movedown();
                            break;
                        case 65:
                            moveleft();
                            break;
                        case 68:
                            moveright();
                            break;
                    }

                    function moveup() {
                        clearInterval(timerD)
                        clearInterval(timerU);
                        timerU = setInterval(function () {
                            y -= 1;
                            if (y < 0) {
                                y = 0;
                            }
                            that.plane.style.top = y + 'px';
                        }, 2)
                    }

                    function movedown() {
                        clearInterval(timerU)
                        clearInterval(timerD);
                        timerD = setInterval(function () {
                            y += 1;
                            if (y > document.documentElement.clientHeight - that.plane.offsetHeight) {
                                y = document.documentElement.clientHeight - that.plane.offsetHeight;
                            }
                            that.plane.style.top = y + 'px';
                        }, 2)
                    }

                    function moveleft() {
                        clearInterval(timerR)
                        clearInterval(timerL);
                        timerL = setInterval(function () {
                            x -= 1;
                            if (x < 0) {
                                x = 0;
                            }
                            that.plane.style.left = x + 'px';
                        }, 2)
                    }

                    function moveright() {
                        clearInterval(timerL)
                        clearInterval(timerR);
                        timerR = setInterval(function () {
                            x += 1;
                            if (x > document.documentElement.clientWidth - that.plane.offsetWidth) {
                                x = document.documentElement.clientWidth - that.plane.offsetWidth;
                            }
                            that.plane.style.left = x + 'px';
                        }, 2)
                    }
                }, false);
                document.addEventListener('keyup', function (e) {
                    if (e.keyCode === 87) {
                        clearInterval(timerU);
                    }
                    if (e.keyCode === 83) {
                        clearInterval(timerD);
                    }
                    if (e.keyCode === 65) {
                        clearInterval(timerL);
                    }
                    if (e.keyCode === 68) {
                        clearInterval(timerR);
                    }

                },false);

            }
        }
        new myplane(46, "./img/myplane.gif", "./img/myplaneBoom.gif").createPlane();
        class bullet {
            constructor(url){
                
            }
        }
    }
})()