---
title: What They Don't Tell You About CSS
subtitle: A Webdev beginner-intermediate guide, part 1
layout: post
show_subtitle: true
---

One of my life philosophies is something along the lines of "The easiest problem to solve is the one you've encountered before". The corollary to that is, of course, to encounter as many problems as possible. 

In an effort to canonicalize the many mistakes I've made while CSS-ing websites, I've compiled a list of things that have tripped me up in the past and continue to trip me up to this day. A lot of problems that arise come from not fully understanding what certain things do, so I'll try to explain those when possible.

###Floats

Floats can be one of the most confusing concepts for beginners, and the name doesn't help much. There are tons and tons and tons of articles on how CSS floats work, so I'm not going to try and repeat what they say. 

One problem you'll without a doubt encounter is clearfixing. If you have a block level element that contains floated children, its height can be incorrectly calculated to be 0 and that can get weird. The generally accepted solution is to use [Nicholas Gallagher's Clearfix Hack]() or to use `display: inline-block` instead of floating.

But one thing I don't see mentioned a lot is why that "glitch" happens in the first place. 

A key thing to remember about CSS is that it was originally designed to style long documents of text—it was never intended to be able to do fancy layout stuff like horizontal centering or columns (that's what [Flexbox]() is for). So we as developers needed to use existing tools as a hack. First it was tables. Nowadays if you want a grid you use a series of floating divs.

If you think of floats as a mechanism for wrapping text around images, their behavior around block-level elements makes a lot of sense. Floating an element left will push it as far left as possible within the flow, but push aside any inline (or inline-block) elements. A paragraph for example, which is a block level element, will stay where it is (it'll act like the float doesn't exist), while the words inside it (which are inline) will move to accomodate it. This is why block-level elements don't account for their floating children: they act like they don't exist.

It's very easy to see in [this JSFiddle:]() the green block element doesn't get moved by the floating div, but the text inside does.

###Inline Block

The thing about using inline-block though, is that you run into one of the stranger HTML/CSS bugs out there, and it has to do with whitespace. When you're starting out with HTML everyone will tell you that whitespace doesn't matter - it's all collapsed and no amount of spaces you can put in your HTML code will come out on the page. 

Except when your elements are inline-block.

If you have a list, that for example, looks like this:

{% highlight html %}
<ul>
    <li>one</li>
    <li>two</li>
    <li>three</li>
    <li>four</li>
    <li>five</li>
</ul>
{% endhighlight %}

And you decide you want to use inline-block to display them, they'll sit next to each other, but with a tiny amount of whitespace between each one. You can sit in the web inspector for days adjusting margins and padding and vertical align and you'll never find the source of that tiny space. What causes it then? __The newline character after each `<li>` tag.__

[Chris Coyier]() has a nice list of the myriad ways you can solve this problem. Personally I like commenting out the whitespace like this:

{% highlight html %}
<ul>
    <li>one</li><!--
 --><li>two</li><!--
 --><li>three</li><!--
 --><li>four</li><!--
 --><li>five</li>
</ul>
{% endhighlight %}

Why does this happen though? Chris Coyier explains in the above article:

