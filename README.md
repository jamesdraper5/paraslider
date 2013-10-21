# ParaSlider

ParaSlider is a simple slider which creates a parallax effect while transitioning between slides. The images can also be blurred while sliding out, although this is only available on Chrome at the moment as other browsers don't yet support the necessary CSS3 specs.

## Usage

To use the slider, simply add the slider.js and slider.css files to your project along with the fonts folder for the slider buttons. The structure of your HTML should then be like so:

```
<div id="slider">
	<ul>
		<li>
			<img src="path/to/image" alt="img 1">
			<p>This is slide 1</p>
		</li>
		<li>
			<img src="path/to/image" alt="img 2">
			<p>This is slide 2</p>
		</li>
	</ul>
</div>
```

A working sample can be seen in the example folder, but here's a quick run down on each of the options:

```
$('#slider').paraSlider({
    animSpeed: 2000,
    pauseTime: 3000,
    manualAdvance: false,
    useNavButtons: true,
    keyboardNav: true,
    pauseOnHover: true,
    scaleOnHover: true,
    blurImages: true
});
```

`animSpeed`: this is the time (in milliseconds) it takes to animate fully from one slide to the next. (Default: 2000)  
`pauseTime`: if the slider is set to run automatically, this is the time in milliseconds between each animation. Note that the animSpeed setting above will eat into this time, so if animSpeed and pauseTime are equal, there will be no pause between slides. (Default: 4000)  
`manualAdvance`: set this to true if you want the slider to auto run. (Defult: false)  
`useNavbuttons`: this toggles whether or not there are buttons to control the slider (Default: true)  
`keyboardNav`: use this to decide if the left and right keyboard buttons control the slider (Default: true)  
`pauseOnHover`: if this is true, then the slider will stop running when you hover over the slider (Default: true)  
`scaleOnHover`: this creates a subtle zoom effect on the image when you hover over it (Default: true)  
`blurImages`: this gradually blurs the images while they are animating out of the slider. This is currently only available on Google Chrome as it is the only browser that supports this blur filter. (Default: true)

## Author

**James Draper**

+ [http://www.jamesdraper.info](http://www.jamesdraper.info)
+ [http://twitter.com/jamesdraper5](http://twitter.com/jamesdraper5)
+ [http://github.com/jamesdraper5](http://github.com/jamesdraper5)