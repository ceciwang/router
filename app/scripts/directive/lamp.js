'use strict';

angular.module('routeApp').directive("lamp", function(){
    return {
        restrict: "A",
        scope: {
            colorpicker : "=lamp"
        },
        template: '	<div class = "external lights">Toggle Lights!</div>'+
            '<div class="dustFrame"> '+
            '<div class = "dustCloser dust"></div>'+
            ' <div class = "dustFar dust"></div>'+
            ' </div>'+
            '<canvas id="Light"></canvas><canvas id="RopeDrawingArea">You need a internet browser that support html5 canvas…</canvas>"',

        link: function(scope, element){
            console.log(scope.colorpicker)
            var ropeDemo = {
                data: {
                    fps: +60,
                    intervalId: null,
                    gravity: +20.5,
                    pixelsPerMeter: +150
                },

                context: {
                    canvas: null,
                    drawingContext: null,
                    size: { w: +0, h: +0 },
                    center: { x: +0, y: +0 },
                    mouse: { x: +0, y: +0 },
                    isGrabbing: false,
                    img0: null,
                    img1:null,
                    stopped: false
                },

                DrawOverride: function () { throw "Not implemented"; },

                ThinkOverride: function () { throw "Not implemented"; },

                Step: function () {
                    ropeDemo.ThinkOverride();
                    if (Math.abs(ropeDemo.rope.coeff)>0.0001 || isNaN(ropeDemo.rope.coeff)){
                        ropeDemo.DrawOverride();

                    }else{
                        ropeDemo.Stop();
                        ropeDemo.waitLight();
                    }
                },

                StartOverride: function () { throw "Not implemented"; },

                Start: function () {
                    ropeDemo.StartOverride();

                    ropeDemo.data.intervalId = setInterval(ropeDemo.Step, +1000 / ropeDemo.data.fps);
                },

                Stop: function () {
                    clearInterval(ropeDemo.data.intervalId);
                },

                Initialize: function () {
                    // Gather data

                    ropeDemo.context.canvas = document.getElementById("RopeDrawingArea");

                    ropeDemo.context.canvas.width = window.innerWidth;
                    ropeDemo.context.canvas.height = window.innerHeight;
                    ropeDemo.context.size.w = window.innerWidth;
                    ropeDemo.context.size.h = window.innerHeight;
                    ropeDemo.context.drawingContext = ropeDemo.context.canvas.getContext("2d");


                    ropeDemo.context.center.x = ropeDemo.context.size.w * 0.5;
                    ropeDemo.context.center.y = ropeDemo.context.size.h * +0;


                    ropeDemo.context.img0 = new Image();
                    ropeDemo.context.img1 = new Image();


                    //IMPORTANT: Wait for the picture to be loaded!
                    ropeDemo.context.img0.onload = function(){

                        // Start application
                        ropeDemo.Start();
                    };

                    //yes, the src goes after
                    ropeDemo.context.img0.src = 'images/lamp0.png';
                    ropeDemo.context.img1.src = 'images/lamp1.png';


                },
                Light: function () { throw "Not implemented"; },
                noLight:function () { throw "Not implemented"; }
            };

            ropeDemo.rope = {
                items: [],
                nbItems: 20,
                length: +50,
                relaxationIterations: +10,
                coeff:+1,
                state: false,
                neon: null,
                oldCoeff: null
            };

            ropeDemo.DrawOverride = function () {

                // Draw segments

                ropeDemo.context.drawingContext.clearRect(0, 0, ropeDemo.context.size.w, ropeDemo.context.size.h);

                ropeDemo.context.drawingContext.beginPath();

                for (var index in ropeDemo.rope.items) {
                    var item = ropeDemo.rope.items[index];


                    if (index == 0) {
                        ropeDemo.context.drawingContext.moveTo(item.x + ropeDemo.context.center.x, item.y + ropeDemo.context.center.y);

                    } else if (item.isRope == true){
                        ropeDemo.context.drawingContext.lineTo(item.x + ropeDemo.context.center.x, item.y + ropeDemo.context.center.y);




                    }else if (item.isRope == false){

                        var item0 = ropeDemo.rope.items[index-18];
                        ropeDemo.rope.coeff = ((item.x + ropeDemo.context.center.x)- (item0.x + ropeDemo.context.center.x))/((item.y + ropeDemo.context.center.y)-(item0.y + ropeDemo.context.center.y));

                        ropeDemo.context.drawingContext.save();
                        ropeDemo.context.drawingContext.translate((item.x + ropeDemo.context.center.x), (item.y + ropeDemo.context.center.y));
                        ropeDemo.context.drawingContext.rotate(ropeDemo.rope.coeff);

                        //the light


                        ropeDemo.context.drawingContext.drawImage(ropeDemo.context.img0,-150,-10);


                        ropeDemo.context.drawingContext.restore();

                    }
                }
                var grad= ropeDemo.context.drawingContext.createLinearGradient((ropeDemo.context.size.w * 0.5)-10, 0, (ropeDemo.context.size.w * 0.5)+20,0);
                grad.addColorStop(0, "#666666");
                grad.addColorStop(1, "#111111");

                ropeDemo.context.drawingContext.strokeStyle = grad;
                ropeDemo.context.drawingContext.lineWidth = 7;
                ropeDemo.context.drawingContext.stroke();
                ropeDemo.context.drawingContext.closePath();



            };

            ropeDemo.ThinkOverride = function () {
                var itemLength = ropeDemo.rope.length / ropeDemo.rope.nbItems;
                var ellapsedTime = +1 / ropeDemo.data.fps;

                if (ropeDemo.context.isGrabbing) {
                    ropeDemo.rope.items[19].x = ropeDemo.context.mouse.x - ropeDemo.context.center.x;
                    ropeDemo.rope.items[19].y = ropeDemo.context.mouse.y - ropeDemo.context.center.y;
                }

                // Apply verlet integration
                for (var index in ropeDemo.rope.items) {
                    var item = ropeDemo.rope.items[index];

                    var old_x = item.x;
                    var old_y = item.y;


                    if (!item.isPinned ) {
                        physic.ApplyUnitaryVerletIntegration(item, ellapsedTime, ropeDemo.data.gravity, ropeDemo.data.pixelsPerMeter);
                    }

                    item.old_x = old_x;
                    item.old_y = old_y;
                }

                // Apply relaxation
                for (var iterations = 0; iterations < ropeDemo.rope.relaxationIterations; iterations++) {

                    for (var index in ropeDemo.rope.items) {
                        var item = ropeDemo.rope.items[index];

                        if (!item.isPinned ) {
                            if (index > +0) {
                                var previous = ropeDemo.rope.items[+index - 1];
                                physic.ApplyUnitaryDistanceRelaxation(item, previous, item.segmentLength);
                            }
                        }
                    }

                    for (var index in ropeDemo.rope.items) {
                        var item = ropeDemo.rope.items[ropeDemo.rope.nbItems - 1 - index];

                        if (!item.isPinned ) {
                            if (index > 0) {
                                var next = ropeDemo.rope.items[ropeDemo.rope.nbItems - index];
                                physic.ApplyUnitaryDistanceRelaxation(item, next, item.segmentLength);
                            }
                        }
                    }
                }
            };

            ropeDemo.waitLight = function(){
                setTimeout(function(){ropeDemo.Light(); }, 400);
                setTimeout(function(){ropeDemo.noLight()},450);

                setTimeout(function(){ropeDemo.Light()}, 600);
                setTimeout(function(){ropeDemo.noLight()}, 700);

                setTimeout(function(){ropeDemo.Light()}, 1100);
                $('.dustCloser').css({'opacity':'1'}).addClass('dustCloserAnimated');
                $('.dustFar').css({'opacity':'1'}).addClass('dustFarAnimated');

            };
            ropeDemo.Light = function(){
                $('.central').css({'opacity':'1'});
                ropeDemo.data.state = true;
                ropeDemo.context.drawingContext.beginPath();



                var item = ropeDemo.rope.items.slice(-1)[0];
                var item0 = ropeDemo.rope.items.slice(-9)[0];
                ropeDemo.rope.coeff = ((item.x + ropeDemo.context.center.x)- (item0.x + ropeDemo.context.center.x))/((item.y + ropeDemo.context.center.y)-(item0.y + ropeDemo.context.center.y));
                ropeDemo.context.drawingContext.save();
                ropeDemo.context.drawingContext.translate((item.x + ropeDemo.context.center.x), (item.y + ropeDemo.context.center.y));
                ropeDemo.context.drawingContext.rotate(ropeDemo.rope.coeff);

                //the light

                ropeDemo.context.drawingContext.moveTo(item.x, item.y+170);
                ropeDemo.context.drawingContext.lineTo(3900, 1280);
                ropeDemo.context.drawingContext.lineTo(-3900,1280);
                ropeDemo.context.drawingContext.lineTo(item.x, item.y+170);
                var grd = ropeDemo.context.drawingContext.createRadialGradient(0, 0, 2, 640, 1030, 1280);

                grd.addColorStop(0, 'white');
                // dark blue

//                scope.colorpicker
//                scope.$watch('colorpicker', function(oldval, newval){
//                    ropeDemo.context.drawingContext.moveTo(item.x, item.y+170);
//                    ropeDemo.context.drawingContext.lineTo(3900, 1280);
//                    ropeDemo.context.drawingContext.lineTo(-3900,1280);
//                    ropeDemo.context.drawingContext.lineTo(item.x, item.y+170);
//                    var grd = ropeDemo.context.drawingContext.createRadialGradient(0, 0, 2, 640, 1030, 1280);
//
//                    grd.addColorStop(0, 'white');
//                    // dark blue
//                    var color = 'rgba('+scope.colorpicker.red+', '+ scope.colorpicker.green +', ' + scope.colorpicker.blue+', 0.6)';
//                    console.log(color)
//                    grd.addColorStop(1, 'rgba(0, 255, 255, 0.6)');
//                    ropeDemo.context.drawingContext.fillStyle = grd;
//                    ropeDemo.context.drawingContext.fill();
//
////                    console.log(newval)
//                }, true);
                var color = 'rgba('+scope.colorpicker.red+','+ scope.colorpicker.green +', ' + scope.colorpicker.blue+', 0.6)';
                grd.addColorStop(1, 'rgba(0, 255, 255, 0.6)');

//                ropeDemo.context.drawingContext.fillStyle = 'rgba(255, 255, 209, 0.9)';
                ropeDemo.context.drawingContext.fillStyle = grd;
                ropeDemo.context.drawingContext.fill();

                ropeDemo.context.drawingContext.drawImage(ropeDemo.context.img1,-150,-10);


                ropeDemo.context.drawingContext.restore();
                ropeDemo.context.drawingContext.lineWidth = 0;
                ropeDemo.context.drawingContext.closePath();
                $('.central2').css({'display':'block'});
            };

            ropeDemo.noLight = function(){

                ropeDemo.data.state = false;
                $('.central').css({'opacity':'0'});


                ropeDemo.context.drawingContext.clearRect(0, 60, ropeDemo.context.size.w, ropeDemo.context.size.h);

                ropeDemo.context.drawingContext.beginPath();
                var item = ropeDemo.rope.items.slice(-1)[0];
                var item0 = ropeDemo.rope.items.slice(-9)[0];
                ropeDemo.rope.coeff = ((item.x + ropeDemo.context.center.x)- (item0.x + ropeDemo.context.center.x))/((item.y + ropeDemo.context.center.y)-(item0.y + ropeDemo.context.center.y));
                ropeDemo.context.drawingContext.save();
                ropeDemo.context.drawingContext.translate((item.x + ropeDemo.context.center.x), (item.y + ropeDemo.context.center.y));
                ropeDemo.context.drawingContext.rotate(ropeDemo.rope.coeff);

                ropeDemo.context.drawingContext.drawImage(ropeDemo.context.img0,-150,-10);


                ropeDemo.context.drawingContext.restore();
                ropeDemo.context.drawingContext.lineWidth = 0;
                ropeDemo.context.drawingContext.closePath();
                $('.central2').css({'display':'none'});
            };

            ropeDemo.turnOff = function(){
                // document.body.style.background="#FFF";
                $('.dustCloser').css({'opacity':'0'}).removeClass('dustCloserAnimated');
                $('.dustFar').css({'opacity':'0'}).removeClass('dustFarAnimated');

                ropeDemo.noLight();
            };

            ropeDemo.StartOverride = function () {

                ropeDemo.rope.items = [];
                var i;
                for (i = 0; i < ropeDemo.rope.nbItems; i++) {
                    var x =  ropeDemo.rope.length / ropeDemo.rope.nbItems;
                    ropeDemo.rope.items[i] = {
                        x: x+0.1,
                        y: +0,
                        segmentLength: x,
                        isRope: true,
                        old_x: x,
                        old_y: +0,
                        isPinned: false
                    };


                }
                i = ropeDemo.rope.nbItems-1;
                var x = ropeDemo.rope.length / ropeDemo.rope.nbItems;
                ropeDemo.rope.items[i] = {
                    x: x+0.1,
                    y: +0,
                    segmentLength: x,
                    isRope: false,
                    old_x: x,
                    old_y: +0,
                    isPinned: false
                };

                ropeDemo.rope.items[0].isPinned = true;
            };

            var physic = {
                ApplyUnitaryVerletIntegration: function (item, ellapsedTime, gravity, pixelsPerMeter) {
                    item.x = 2 * item.x - item.old_x; // No acceleration here
                    item.y = 2 * item.y - item.old_y + gravity * ellapsedTime * ellapsedTime * pixelsPerMeter;
                },

                ApplyUnitaryDistanceRelaxation: function (item, from, targettedLength) {
                    var dx = item.x - from.x;
                    var dy = item.y - from.y;
                    var dstFrom = Math.sqrt(dx * dx + dy * dy);

                    if (dstFrom > targettedLength && dstFrom != 0 ) {
                        item.x -= (dstFrom - targettedLength) * (dx / dstFrom) * 0.5;
                        item.y -= (dstFrom - targettedLength) * (dy / dstFrom) * 0.5;
                    }
                }
            };

            var central = $('.mainText');

            element.find(".lights").click(function(){
                if(	ropeDemo.data.state == true){
                    ropeDemo.turnOff();
                    central.css({'left':'50%'});

                }else{
                    ropeDemo.waitLight();
                }
            });

            $('.central').css({'opacity':'0'});
            ropeDemo.Initialize();

        }
    }
});
