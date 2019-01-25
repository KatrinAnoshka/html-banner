    var acAnimated = {Plugins: {}};

    /* SplitText Plugin */
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

    /* GSAP animation */
    function politeInit() {

    	var tl;
        var loops = 0;
    	tl = new TimelineMax({repeat:-1, repeatDelay:3, onComplete:restart});
    	var time = 0.5;
    	var between = 0.25;
    	var cta = document.querySelector("#cta");
        var btnemoji = document.querySelectorAll(".btnemoji");
        var randomItem = 0;
        var txt = document.querySelectorAll('#text span'),
        ctaURL;

	    animate();
        
        /* Animation of all the objects */
    	function animate() {
    		
            var splitText = acAnimated.Plugins.SplitText(text, {spacing: 2});
            TweenMax.set(btnemoji[randomItem], {alpha:1});

    		tl
                .set("#logo", {y:-145, scale:0.3})
                .to("#wrect", 1, {alpha:0, ease:Linear.easeNone}, "st")
     	
     	 		.staggerTo(".emoji", 0.15, {alpha:1, ease:Linear.easeNone}, 0.25, "st+=0.3")
                .staggerFrom(".emoji", 0.15, {scale:0.5, ease:Back.easeOut, transformOrigin:"50% 50%"}, 0.25, "st+=0.3")
                .staggerTo(".emoji", 0.05, {alpha:0, ease:Linear.easeNone}, 0.25, "st+=0.55")

    			.addLabel("fr2", "-=0.3")
     				
     			.to("#logo2", 0.5, {alpha:0, y:"-=100", ease:Back.easeIn}, "fr2")
     			.to("#bluebg", 1, {alpha:0, ease:Linear.easeNone}, "fr2+=0.5")
      			.staggerFrom(splitText.chars, 0.4, {alpha:0, ease:Linear.easeNone}, 0.02, "fr2+=1.5")

      			.from("#cta", 0.5, {x:"+=50", alpha:0, ease:Back.easeOut}, "fr2+=3")
                .from("#logo", 1, {alpha:0, ease:Linear.easeNone}, "fr2+=0.8")

        }

        /* Change emojis on button by mouseover */    
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

        /* Start over all the animations as part of a TimelineMax object */
		function restart() {
			tl.restart();
		}
		
    };

