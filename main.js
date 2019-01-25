/*! modernizr 3.3.1 (Custom Build) | MIT *
	 * https://modernizr.com/download/?-touchevents-setclasses !*/
	!function(e,n,t){function o(e,n){return typeof e===n}function s(){var e,n,t,s,a,i,r;for(var l in c)if(c.hasOwnProperty(l)){if(e=[],n=c[l],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(s=o(n.fn,"function")?n.fn():n.fn,a=0;a<e.length;a++)i=e[a],r=i.split("."),1===r.length?Modernizr[r[0]]=s:(!Modernizr[r[0]]||Modernizr[r[0]]instanceof Boolean||(Modernizr[r[0]]=new Boolean(Modernizr[r[0]])),Modernizr[r[0]][r[1]]=s),f.push((s?"":"no-")+r.join("-"))}}function a(e){var n=u.className,t=Modernizr._config.classPrefix||"";if(p&&(n=n.baseVal),Modernizr._config.enableJSClass){var o=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");n=n.replace(o,"$1"+t+"js$2")}Modernizr._config.enableClasses&&(n+=" "+t+e.join(" "+t),p?u.className.baseVal=n:u.className=n)}function i(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):p?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function r(){var e=n.body;return e||(e=i(p?"svg":"body"),e.fake=!0),e}function l(e,t,o,s){var a,l,f,c,d="modernizr",p=i("div"),h=r();if(parseInt(o,10))for(;o--;)f=i("div"),f.id=s?s[o]:d+(o+1),p.appendChild(f);return a=i("style"),a.type="text/css",a.id="s"+d,(h.fake?h:p).appendChild(a),h.appendChild(p),a.styleSheet?a.styleSheet.cssText=e:a.appendChild(n.createTextNode(e)),p.id=d,h.fake&&(h.style.background="",h.style.overflow="hidden",c=u.style.overflow,u.style.overflow="hidden",u.appendChild(h)),l=t(p,e),h.fake?(h.parentNode.removeChild(h),u.style.overflow=c,u.offsetHeight):p.parentNode.removeChild(p),!!l}var f=[],c=[],d={_version:"3.3.1",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){c.push({name:e,fn:n,options:t})},addAsyncTest:function(e){c.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=d,Modernizr=new Modernizr;var u=n.documentElement,p="svg"===u.nodeName.toLowerCase(),h=d._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];d._prefixes=h;var m=d.testStyles=l;Modernizr.addTest("touchevents",function(){var t;if("ontouchstart"in e||e.DocumentTouch&&n instanceof DocumentTouch)t=!0;else{var o=["@media (",h.join("touch-enabled),("),"heartz",")","{#modernizr{top:9px;position:absolute}}"].join("");m(o,function(e){t=9===e.offsetTop})}return t}),s(),a(f),delete d.addTest,delete d.addAsyncTest;for(var v=0;v<Modernizr._q.length;v++)Modernizr._q[v]();e.Modernizr=Modernizr}(window,document);
	//Polyfill for map method - Reference: http://es5.github.io/#x15.4.4.19
	Array.prototype.map||(Array.prototype.map=function(r,t){var n,o,e;if(null==this)throw new TypeError(" this is null or not defined");var i=Object(this),a=i.length>>>0;if("function"!=typeof r)throw new TypeError(r+" is not a function");for(arguments.length>1&&(n=t),o=new Array(a),e=0;a>e;){var p,f;e in i&&(p=i[e],f=r.call(n,p,e,i),o[e]=f),e++}return o});
    
	var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    
    var acAnimated = {Plugins: {}};

     /* SplitText Plugin - Starts */
    acAnimated.Plugins.SplitText = function(element, options) {
        if (!options.hasOwnProperty("words")) options.words = 1;
        if (!options.hasOwnProperty("chars")) options.chars = 1;
        if (!options.hasOwnProperty("spacing")) options.spacing = 5;
        this.searchTextNodes = function(element) {
            var foundTextNodes = [];
            if (element == null || element == undefined) return foundTextNodes;
            for (var i=0; i<=element.childNodes.length-1; i++) {
                var node = element.childNodes[i];
                if (node.nodeName == "#text") { //text found
                    foundTextNodes.push(node);
                } else {
                    var foundTextNodes = foundTextNodes.concat(this.searchTextNodes(node));
                }
            }
            return foundTextNodes;
        }
        this.createElement = function(text, relatedNode) {
            var node = document.createElement("div");
            var nodeText = document.createTextNode(text);
            node.nodeText = nodeText;
            node.appendChild(nodeText);
            node.style.display = "inline-block";
            node.style.position = "relative";
            if (text.trim() == "") node.style.width = String(options.spacing) + "px";
            relatedNode.parentNode.insertBefore(node, relatedNode);
            return node;
        }
        this.splitCharacters = function(textNode) {
            var characters = textNode.nodeValue.toString();
            var chars = [];
            if (characters.trim() != "") {
                for (var c=0; c<=characters.length-1; c++) {
                    var character = characters.substr(c, 1)
                    var char = this.createElement(character, textNode);
                    if (character.trim() != "") chars.push(char);
                }
                textNode.parentNode.removeChild(textNode);
            }
            return chars;
        }
        this.splitWords = function(textNode) {
            var textWords = textNode.nodeValue.toString().split(" ");
            var words = [];
            for (var w=0; w<=textWords.length-1; w++) {
                var textWord = textWords[w];
                var word = this.createElement(textWord, textNode);
                if (textWord.trim() != "") words.push(word);
                if (w < textWords.length-1) this.createElement(" ", textNode); //spacing for word
            }
            textNode.parentNode.removeChild(textNode);
            return words;
        }
        this.splitTextNodes = function(textNodes) {
            var splitText = {words: [], chars: []};
            for (var i=0; i<=textNodes.length-1; i++) {
                var textNode = textNodes[i];
                if (options.words == 0) {
                    splitText.chars = splitText.chars.concat(this.splitCharacters(textNode));
                } else {
                    var words = this.splitWords(textNode);
                    if (options.chars == 1) {
                        for (var w=0; w<=words.length-1; w++) {
                            var word = words[w];
                            var chars = this.splitCharacters(word.nodeText);
                            splitText.chars = splitText.chars.concat(chars);
                            word.chars = chars;
                        }
                    }
                    splitText.words = splitText.words.concat(words);
                }
            }
            return splitText;
        }
        var textNodes = this.searchTextNodes(element);
        var splitText = this.splitTextNodes(textNodes);
        return splitText;
    }
    /* SplitText Plugin - Ends */

/**
 * Init.
 */
 if (Enabler.isInitialized()) {
		init();
	} else {
	  	Enabler.addEventListener(studio.events.StudioEvent.INIT, init);
	}

function init() {
	  	if (Enabler.isPageLoaded()) {
	    	//Enabler.setProfileId(10012416);
	    	politeInit();
	  	} else {
	  		//Enabler.setProfileId(10012416);
	    	Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, politeInit);
	 	}
	};

	

function politeInit() {

	 

	var tl;
var loops = 0;
	tl = new TimelineMax({repeat:-1, repeatDelay:3, onComplete:restart});

	// Specifications
	var time = 0.5;
	var between = 0.25;
	var cta = document.querySelector("#cta");
  var btnemoji = document.querySelectorAll(".btnemoji");
  var randomItem = 0;//Math.floor(btnemoji.length*Math.random()),
            var txt1 = document.querySelectorAll('#text1 span'),
            // var txt2 = document.querySelectorAll('#text2 span');
            ctaURL;

	animate();
        
		function animate() {
			 var splitText = acAnimated.Plugins.SplitText(text1, {spacing: 2});
            
            TweenMax.set(btnemoji[randomItem], {alpha:1});

			tl
            	.set("#logo2", {y:-145, scale:0.3})
            	.to("#wrect", 1, {alpha:0, ease:Linear.easeNone}, "st")
 	
 	 			.staggerTo(".emoji", 0.15, {alpha:1, ease:Linear.easeNone}, 0.25, "st+=0.3")
            	.staggerFrom(".emoji", 0.15, {scale:0.5, ease:Back.easeOut, transformOrigin:"50% 50%"}, 0.25, "st+=0.3")
            	.staggerTo(".emoji", 0.05, {alpha:0, ease:Linear.easeNone}, 0.25, "st+=0.55")

				.addLabel("fr2", "-=0.3")
 				
 				.to("#logo", 0.5, {alpha:0, y:"-=100", ease:Back.easeIn}, "fr2")
 				.to("#bluebg", 1, {alpha:0, ease:Linear.easeNone}, "fr2+=0.5")
  				.staggerFrom(splitText.chars, 0.4, {alpha:0, ease:Linear.easeNone}, 0.02, "fr2+=1.5")

  				.from("#cta", 0.5, {x:"+=50", alpha:0, ease:Back.easeOut}, "fr2+=3")
            	.from("#logo2", 1, {alpha:0, ease:Linear.easeNone}, "fr2+=0.8")

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

        //Exit Handler - we need at least one
		function bgExitHandler(e) {
		 	Enabler.exit('Background Exit');
		 	//checkFrame();
		 	return false;
		}
        
        //Exit Handler - we need at least one
		function logoExitHandler(e) {
		 	Enabler.exit('Logo Exit');
		 	//checkFrame();
		 	return false;
		}

		//Exit Handler - we need at least one
		function ctaExitHandler(e) {
		 	Enabler.exit('CTA Offer Exit');
		 	//checkFrame();
		 	return false;
		}


/**
 * Start over all the animations as part of a TimelineMax object.
 */
		function restart() {
			tl.restart();
		}
		
//- Frame 2 ----------------------------------------------------------->

	/*tl.from("#frame2-copy", time, {autoAlpha:0});
	tl.from("#frame2-text", time, {autoAlpha:0, x:"-50"},"-="+between);
	tl.from("#frame2-image", time, {autoAlpha:0, x:"+50"},"-="+between);

	tl.to("#frame2-copy", time, {delay:wait, autoAlpha:0});
	tl.to("#frame2-text", time, {autoAlpha:0},"-="+between);
	tl.to("#frame2-image", time, {autoAlpha:0},"-="+between); */

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
};

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

// $('#frame3-yes').textillate({
//   loop: false, // Повтор анимации true/false
//   minDisplayTime: 1500, // устанавливает минимальное время отображения текста
//   initialDelay: 1500,// устанавливает начальную задержку перед началом анимации
//   autoStart: true,  // автоматический запуск анимации true/false
//   inEffects: [],
//   in: {
//     effect: 'fadeInLeft', 
//     delayScale: 0.3,  // время появления каждой буквы
//     delay: 70, // установить задержку между символами
//     sync: false, // одновременное появление эффекта true/false
//     shuffle: false,// рандомная последовательность символов 
//     reverse: false,// обратная последовательность символов
//     callback: function () {} // callback that executes once the animation has finished
//   },
// });

