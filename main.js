/**
 * Globals.
 */
// var tl;
// var loops = 0;

/**
 * Init.
 */
// function init() {
// 	tl = new TimelineMax({onComplete:restart});

	// Specifications
	// var time = 0.5;
	// var between = 0.25;
	// var wait = 2;
 //  var waitFramePeople = 7;
 //  var waitFrame1Text = 1;

	
//- Frame 1 ----------------------------------------------------------->
// tl.from("#frame1-text, #frame1b-text", time, {autoAlpha:0, x:"-50"},"-="+between);
// tl.from("#frame1-text-back", time+between, {autoAlpha:0, x:"-50"},"-="+between);
//   tl.from("#frame1-people", waitFramePeople, {autoAlpha:100, x:"-200"},"-="+wait);


//   tl.to("#frame1-text, #frame1b-text, #frame1-text-back", time, {autoAlpha:0},"-="+between);



//- Frame 3 ----------------------------------------------------------->

	// tl.from("#frame3-copy", time, {autoAlpha:0});
 //  tl.from("#frame3-yes", time, {autoAlpha:0});

	// tl.to("#frame3-copy, #frame3-yes", time, {delay:wait, autoAlpha:0});
//- Frame 4 ----------------------------------------------------------->

//   	tl.from("#frame4-copy", time, {autoAlpha:0, onComplete:loopCheck});
//     tl.from("#logos", time, {autoAlpha:0, y:"+50"}, "-="+between);
//     tl.from("#cta", time, {autoAlpha:0, x:"-50"}, "+="+between);

//     tl.to("#frame4-copy", time, {delay:wait, autoAlpha:0});
//   	tl.to("#lockup", time, {y:"+50"});
// }

/**
 * Show the current frame and all its elements without animation. Use to position assets quickly.
 */
// function showFrame(num) {
// 	if (tl) tl.pause();
// 	var elements = e("frame-"+num).children;
// 	for (var i = 0; i < elements.length; i++) {
// 		elements[i].style.visibility = "visible";
// 	}
// }

/**
 * Check loops. If we've reached the loop limit, clear our TimelineMax object.
 * Otherwise, simply increment the loops and let TimelineMax restart.
 */
// function loopCheck() {
// 	if (loops >= 2) tl.clear();
// 	loops++;
// }

/**
 * Start over all the animations as part of a TimelineMax object.
 */
// function restart() {
// 	tl.restart();
// }

/**
 * For animating assets at the start of each frame.
 */
// function appear(name,time,specs,label) {
// 	specs.onStart = show;
// 	specs.onStartParams = [name];

// 	tl.from("#"+name, time, specs, label);
// }

/**
 * For animating assets at the end of each frame.
 */
// function disappear(name,time,specs,label,hideOnComplete) {
// 	hideOnComplete = (hideOnComplete == undefined) ? true : hideOnComplete;
// 	if (hideOnComplete) {
// 		specs.onComplete = hide;
// 		specs.onCompleteParams = [name];
// 	}

// 	tl.to("#"+name, time, specs, label);
// }

/**
 * Show/hide an element with display block.
 */
// function show(name) { e(name).style.display = "block"; }
// function hide(name) { e(name).style.display = "none"; }

/**
 * Shorthand to grab an element.
 */
// var e = getElement = function(name) {
// 	return document.getElementById(name);
// };

$(' .textillate-demo').textillate({
  loop: false, // Повтор анимации true/false
  minDisplayTime: 1500, // устанавливает минимальное время отображения текста
  initialDelay: 0,// устанавливает начальную задержку перед началом анимации
  autoStart: true,  // автоматический запуск анимации true/false
  inEffects: [],
  in: {
    effect: 'fadeInLeft', 
    delayScale: 0.5,  // время появления каждой буквы
    delay: 50, // установить задержку между символами
    sync: false, // одновременное появление эффекта true/false
    shuffle: false,// рандомная последовательность символов 
    reverse: false,// обратная последовательность символов
    callback: function () {} // callback that executes once the animation has finished
  },
});


	function politeInit(){		
	    console.log = function() {}
        
        var select = function(s) {
                return document.querySelector(s);
            },
            selectAll = function(s) {
                return document.querySelectorAll(s);
            },
            wrapper = select('#wrapper'),
            wrect = select('#wrect'),
            logo = select('#logo'),
            logo2 = select('#logo2'),
            logopart2cont = select('#logopart2cont'),
            logopart1cont = select('#logopart1cont'),
            emojis = select('#emojis'),
            bluebg = select('#bluebg'),
            bgexit = select('#bgexit'),
            cta = select('#cta'),
            emoji = selectAll(".emoji"),
            btnemoji = selectAll(".btnemoji"),
            tl = new TimelineMax(),
            randomItem = 0,//Math.floor(btnemoji.length*Math.random()),
            txt1 = document.querySelectorAll('#text1 span'),
            txt2 = document.querySelectorAll('#text2 span'),
            ctaURL;
            
        animate();
    }  

		function animate() {
            var splitText = acAnimated.Plugins.SplitText(text1, {spacing: 7});
            
            TweenMax.set(btnemoji[randomItem], {alpha:1});
            
			tl
            .set(logo, {y:-145, scale:0.3})
            .to(wrect, 1, {alpha:0, ease:Linear.easeNone}, "st")
            
            //.from(line, 0.5, {height:0, ease:Power2.easeInOut}, "st+=0.5")
            //.from(logopart2cont, 1.3, {x:"-=800", ease:Power2.easeOut}, "st+=1")
            //.from(logopart1cont, 1.3, {x:"+=400", ease:Power3.easeOut}, "st+=1")
            //.from(logo, 3, {x:"+=300", ease:Power2.easeOut}, "st")
            
            .staggerTo(emoji, 0.15, {alpha:1, ease:Linear.easeNone}, 0.25, "st+=0.3")
            .staggerFrom(emoji, 0.15, {scale:0.5, ease:Back.easeOut, transformOrigin:"50% 50%"}, 0.25, "st+=0.3")
            .staggerTo(emoji, 0.05, {alpha:0, ease:Linear.easeNone}, 0.25, "st+=0.55")
            
            .addLabel("fr2", "-=0.3")
            .to(bluebg, 1, {alpha:0, ease:Linear.easeNone}, "fr2+=0.5")
            .to(logo2, 0.5, {alpha:0, y:"-=100", ease:Back.easeIn}, "fr2")
            .staggerFrom(splitText.chars, 0.4, {alpha:0, ease:Linear.easeNone}, 0.02, "fr2+=1.5")
            
            .from(cta, 0.5, {x:"+=50", alpha:0, ease:Back.easeOut}, "fr2+=3")
            .from(logo, 1, {alpha:0, ease:Linear.easeNone}, "fr2+=0.8")
		}

		
        
        
        cta.addEventListener('mouseover', changeBtn, false);
        
        function changeBtn(e) {
            TweenMax.to(btnemoji[randomItem], 0.1, {alpha:0, ease:Back.easeIn});
            
            randomItem = Math.floor(btnemoji.length*Math.random());
            TweenMax.to(btnemoji[randomItem], 0.2, {alpha:1, ease:Linear.easeNone});
            TweenMax.from(btnemoji[randomItem], 0.4, {scale:0.3, transformOrigin:"50% 50%", ease:Back.easeOut, onComplete:function(){
                cta.addEventListener('mouseover', changeBtn, false);
            }});
            
            cta.removeEventListener('mouseover', changeBtn, false);
        }



