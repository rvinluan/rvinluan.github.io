---
published: false
---

##inline vs block

Block is one after another. Inline is next to each other. If you want things to be next to each other, they should be inline. However inline has a few caveats:

- no vertical margins (line-height instead)
- no width/height (font-size instead)

There's a solution! inline-block. You get all of the 'next-to-each-other-ness' of inline plus all the sizing and spacing control of block.

One caveat to inline-block: whitespace in your source code matters. It's like text, right? [There are a few ways around this](http://css-tricks.com/fighting-the-space-between-inline-block-elements/).

##what about floats?

Floats are used for getting text to wrap around elements and that kind of junk. Avoid them for layout if you can. Remember that most HTML and CSS was invented for text heavy documents.

##the vertical-align property

one of the best things about using inline-block for layout is that you gain access to the vertical-align property. Here are some examples of what it does.

vertical-align middle is awesome and is what you want a lot of the time. The best and most important thing is that it works with elements of variable height. You don't have to declare anything!

#vertical-aligning within a container

ok so vertical aligning is great but it only works relative to other siblings. AKA you can't use vertical align on a parent and its child.

But you can cheat! You can insert a dummy sibling element that's 100% of the height of the parent, and vertical align anything you want to that.

Now make it width: 0 or visibility: hidden and voila!