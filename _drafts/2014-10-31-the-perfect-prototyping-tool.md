---
published: false
---

##Let's get the obvious out of the way

It'd have to have great parity/mirroring between your desktop and your phone. It'd have to import assets from as many places as possible. It'd have to be fast and nicely designed.

##The sweet spot

GUIs are great for dragging things around and getting a visual preview. Sliders are awesome for adjusting properties because you don't have to type out every word. They can hide irrelevant information from you until you want to see it.

Code is good when you need to repeat yourself a lot. You can quickly abstract out common workflows. It's even better at hiding information, but not so good at keeping it organized. Code also lets you do stuff that the GUI designer didn't think you wanted to do. It also lets you interface with other code, so you can use things like real data.

##Don't repeat yourself

Sliders and buttons are great if I'm setting something up once because I don't have to type everything out. But if I'm doing something 10 times, code is better because I can copy/paste (or even abstract out into a for loop). I can encapsulate common behavior in a function and call that function later, essentially giving me a macro for anything I can think of.

##State-based

I should be able to define a 'home screen' state and go back and forth, without having to code the animation twice. I should be able to define how states switch and on what events they trigger, and be able to change that quickly. I should be able to control which individual animations are a part of state changes. I should be able to easily swap out and experiment with different easing curves or animation styles.

##Bind to multiple events

If I want to trigger a state transition on tap AND on pinch, I should be able to do that quickly and easily. I should also be able to pass parameters into the state transition so that I can define a state with a few variations, for example.

##No more magic numbers

I don't want to have to count pixels. I should easily be able to position elements based off of other elements, so instead of saying 340 I can say 'the center of the screen' or 'the bottom edge of element X'. 

##Keep organized

I don't want all my code in one file, I don't want all my screens on one canvas. I want to be able to only look at what I'm working on at the moment. So far nobody has gotten this right.
