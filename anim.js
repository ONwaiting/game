function getStyle(obj, attr) {
    if (window.getComputedStyle) {
        return getComputedStyle(obj)[attr];
    } else {
        return obj.currentStyle[attr];
    }
}

function anim(obj, json, callback) {
    var speed = 0;
    var attr;
    for (var type in json) {
        if (type === 'opacity') {
            json[type] *= 100;
        }
    }
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var flag = true;
        for (var type in json) {
            if (type === 'opacity') {
                attr = getStyle(obj, type) * 100;
            } else {
                attr = parseInt(getStyle(obj, type));
            }
            speed = (json[type] - attr) / 10;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            if (speed != 0) {
                if (type === 'opacity') {
                    obj.style.opacity = speed / 100 + attr / 100;
                    obj.style.filter = 'alpha(opacity=' + (attr + speed) + ')';
                } else {
                    obj.style[type] = speed + attr + 'px';
                }
                flag = false;
            }
        }
        if (flag) {
            clearInterval(obj.timer);
            callback && typeof callback === 'function' && callback();
        }
    }, 5);
}