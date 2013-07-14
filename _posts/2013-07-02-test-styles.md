---
layout: post
title: "Test Post: Please Ignore"
subtitle: No, seriously
show_subtitle: true
---

This is a test of my blog's style. It has paragraphs and lists and all kinds of shit.

This is a test paragraph, made only for test\*ing what paragraphs look like\*. Who would have thought! The asterisks are there so that I can set a reasonable measure for whatever font or font size I'm using—they let me know how many characters wide my lines are. As far as I can tell [Trent Walton](http://trentwalton.com/2012/06/19/fluid-type/) invented it, and I think it's a pretty neat idea. 

### Here’s a really long section header let’s see what it looks like when it takes up two lines or even more maybe

1. Here's
2. An
3. enumerated
4. list.
5. and more!

### Another subhead

+ whoah there!
+ here's an unordered list
+ with a [link](http://www.google.com) in it!

### Code with Pygment highlighting

{% highlight js %}
$(function(){
    $('.a').on('click','.b', function(){
        var which = $(this),
            row = which.attr('data-row'),
            c = $('.d'),
            lastInRow = which.siblings().addBack().filter(function(index) {
                return $(this).attr('data-row') === row;
            }).last();
        
        c.slideUp(200, function() {
            lastInRow.after(c);
            c.slideDown();
        });
        
    })
})
{% endhighlight %}

### Blockquotes

> You have to look the best to be the best.