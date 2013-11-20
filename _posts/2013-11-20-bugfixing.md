---
title: Bugfixing with Squarespace and Timed Javascript
layout: post
date: 2013-11-20
---

My friend Daniel Bogre Udell recently asked me to help him fix a CSS glitch he was seeing with a Squarespace site he was working on for one of his clients. When we met up one thing he stressed was that he was trying to patch up some functionality in a default template because the 'developer option' where you could roll your own code cost twice as much. It sounded reasonable to me, so we sat down in the lab one day to try and fix it.

The problem was this: He was using a template with a horizontal slideshow functionality, except he wanted to override the default previous/next buttons and instead have the user be able to horizontally scroll through the slideshow. He set the slideshow to `overflow: scroll` and it worked, except for one thing: there was an unusual amount of whitespace on the right side of the slideshow div.

<img src="{{site_url}}/imgs/danHack_1.png" alt="problem illustrated here">

With liberal usage of the Chrome Developer Tools, we figured out two things: one, that the width was being set using Javascript that was run by Squarespace, and two, that the extra whitespace was because it was about twice as wide as it should be. So we injected some js in the header to grab the width of the slideshow and set it to half what it was. (It should be noted at this point that there were multiple galleries on this site with the same problem, so we couldn't just hard code a solution.)

Unsurprisingly, that didn't work. The reason why was that we had wrapped our code inside a function passed into jQuery, meaning that it would run on `document.ready`. The slideshow on the other hand, was sized and created only after all the images were loaded, which happens an undeterminable amount of time *after* the `document.ready` event fires.

We could have attached event listeners to all the images and ran some code when that happened, but what we needed to ensure was that our code ran *after Squarespace's code*, which isn't as straightforward as it might seem.

Right around here when we were trying to figure out when their slideshow code ran, we had a breakthrough. We didn't need to fix the slideshow immediately when the page loaded. **We could do it *way* after: when the user started scrolling on the slideshow, because they wouldn't see the glitch until they reached the end, after they had been scrolling for a while.** We attached an event listener to the scroll on the slidedhow and ran a function that halved its width.

But it wasn't over yet. Our code still wasn't working: the slideshow still wasn't being set to the correct size. Thanks to a well placed `console.log`, we were able to figure out that because the scroll event was firing multiple times per second, it was halving its width each time, and getting smaller and smaller as you scrolled. Duh. We only wanted the width correction to happen once, ever. Luckily, because we were using jQuery, there was a function to do just that. The solution was as simple as changing:

{% highlight js %}
$('#slideshow').on('scroll', function(){ ... })
{% endhighlight %}

to

{% highlight js %}
$('#slideshow').one('scroll', function(){ ... })
{% endhighlight %}

And that was it. It worked great and we didn't have to upgrade to the developer package. I think in the end we learned a lot about how to fix problems with code running in the right order, and thinking about when things actually needed to be run. We also learned the value in knowing the depth of libraries, because seriously how cool was it that we were able to solve a problem by adding **one character** in the end? Thanks, jQuery!

