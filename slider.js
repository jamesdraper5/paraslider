/*!
 * jQuery ParaSLider parallax image slider
 * Original author: @jamesdraper5
 * 
 * Licensed under the MIT license
 */


;(function ( $, window, document, undefined ) {
    
    var ParaSlider = function(element, options){
        //Defaults are below
        var settings = $.extend({}, $.fn.paraSlider.defaults, options);

        //Useful variables. Play carefully.
        var vars = {
            currentSlide: 1,
            totalSlides: 0,
            animating: false,
            paused: false
        };
    
        //Get this slider
        var slider = $(element);
        slider.addClass('paraslider');

        //Find our slider children
        var list = slider.find('ul');

        // clone first and last slides 
        var firstSlideCopy = list.children('li:first').clone();
        var lastSlideCopy = list.children('li:last').clone();

        // prepend the last image before the first to create a seamless loop
        lastSlideCopy.prependTo(list);

        // append the first image after the last to create a seamless loop
        firstSlideCopy.appendTo(list);

        // set up the vars for slide animation
        var sliderWidth = slider.width();
        var sliderHeight = slider.height();
        var leftPos = -settings.widthDifference + 'px';
        var middlePos = -settings.widthDifference/2 + 'px';
        var rightPos = 0;
        var listItems = list.children('li');
        
        // resize slides and position them
        listItems.each(function( index ) {
            var $this = $(this);
            $this.css({ width: sliderWidth });
            $this.css({ height: sliderHeight });

            var img = $this.find('img:first');
            var imgClass;

            if ( index === 0 ) {
                imgClass = listItems.length - 2;
            } else if ( index === listItems.length - 1 ) {
                imgClass = 1;
            } else {
                imgClass = index;
                vars.totalSlides++;
            }

            // add a class to each image which represents the slide index
            img.addClass('img-' + imgClass);

            // set the first image in the middle
            if ( index === 1 ) {
                img.css({ 'left': middlePos }); 
            } 

        });

        // position the slider in correct start position
        list.css({ left: -sliderWidth });

        // this is the main function which animates the slides
        var changeSlide = function( direction ) {
            if ( !vars.animating ) {
                vars.animating = true;

                var currentPos = list.position();
                var currentLeft = currentPos.left;

                if ( direction === 'prev') {

                    var newLeft = currentLeft + sliderWidth;
                    var currentSlideIndex = vars.currentSlide;
                    var nextSlideIndex = ( currentSlideIndex - 1 === 0 ) ? vars.totalSlides : currentSlideIndex - 1;
                    var currentImg = $('.img-' + currentSlideIndex);
                    var nextImg = $('.img-' + nextSlideIndex);
                    var startPos = rightPos;
                    var endPos = leftPos;
                
                } else {

                    var newLeft = currentLeft - sliderWidth;
                    var currentSlideIndex = vars.currentSlide;
                    var nextSlideIndex = ( currentSlideIndex + 1 > vars.totalSlides ) ? 1 : currentSlideIndex + 1;
                    var currentImg = $('.img-' + currentSlideIndex);
                    var nextImg = $('.img-' + nextSlideIndex);
                    var startPos = leftPos;
                    var endPos = rightPos;

                } 
                    
                // move the next image to the right position, ready to animate to the centre
                nextImg.css({
                    left: startPos
                });

                // animate the next image into the centre of its parent list item
                nextImg.animate({
                    left: middlePos
                }, settings.animSpeed);
                
                // if using the blur setting, blur the outgoing image and unblur the incoming one
                if ( settings.blurImages ) {
                    currentImg.addClass('blur');
                    nextImg.removeClass('blur');
                }

                // animate the current image to the left of its parent while its moving out 
                currentImg.animate({
                    left: endPos
                }, settings.animSpeed);

                // animate the next list item into view
                list.animate({
                    left: newLeft
                }, settings.animSpeed, function() {

                    if ( direction === 'prev') {

                        // decrease current slide number by 1
                        vars.currentSlide -= 1;

                        // if you land on the first placeholder img replace it with the last image 
                        if ( vars.currentSlide === 0 ) {

                            list.css({ left: (vars.totalSlides) * -sliderWidth });
                            vars.currentSlide = vars.totalSlides;

                        }

                    } else {

                        // increase current slide number by 1
                        vars.currentSlide += 1;

                        // if you land on the last placeholder img replace it with the first image 
                        if ( vars.currentSlide > vars.totalSlides ) {

                            list.css({ left: -sliderWidth });
                            vars.currentSlide = 1;

                        }
                    }
                    vars.animating = false;
                });
               
            }
        }

        var navClick = function(e) {
            if(vars.animating) return false;
            clearInterval(timer);
            timer = '';
            changeSlide( e.target.id );
            e.preventDefault();
        }
        
        //Keyboard Navigation
        if(settings.keyboardNav){
            $(window).keydown(function(event){
                //Left
                if(event.keyCode == '37'){
                    if(vars.animating) return false;
                    clearInterval(timer);
                    timer = '';
                    changeSlide('prev');
                }
                //Right
                if(event.keyCode == '39'){
                    if(vars.animating) return false;
                    clearInterval(timer);
                    timer = '';
                    changeSlide('next');
                }
            });
        }
        
        //For pauseOnHover setting
        if(settings.pauseOnHover){
            slider.hover(function(){
                vars.paused = true;
                clearInterval(timer);
                timer = '';
            }, function(){
                vars.paused = false;
                //Restart the timer
                if(timer == '' && !settings.manualAdvance){
                    timer = setInterval(function() { changeSlide('next'); }, settings.pauseTime);
                }
            });
        }

        // Initialize the slider if it runs automatically
        var timer = 0;
        if(!settings.manualAdvance && listItems.length > 1){
            // auto run the slider
            timer = setInterval(function() { changeSlide('next'); }, settings.pauseTime);
        }

        // add event listener to navigation buttons
        $(document).on('click', '.nav-btn', navClick);

        if ( settings.scaleOnHover ) {
            $('img').hover(function(){
                $(this).toggleClass('big');
            });
        }

        return this;
    }


    $.fn.paraSlider = function( options )  {
 
        return this.each(function(key, value){
            var element = $(this);
            // Return early if this element already has a plugin instance
            if (element.data('paraslider')) return element.data('paraslider');
            // Pass options to plugin constructor
            var paraslider = new ParaSlider(this, options);
            // Store plugin object in this element's data
            element.data('paraslider', paraslider);
        });
 
    };

    //Default settings
    $.fn.paraSlider.defaults = {
        widthDifference: 200,
        animSpeed: 1200,
        pauseTime: 3000,
        keyboardNav: true,
        pauseOnHover: true,
        manualAdvance: false,
        scaleOnHover: true,
        blurImages: true
    };
 
})( jQuery, window, document );