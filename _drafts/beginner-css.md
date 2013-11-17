---
title: Thinking in CSS Conceptually
subtitle: A Webdev beginner-intermediate guide, part 1
layout: post
show_subtitle: true
---

Originally, this post was going to be about the quirks and weird parts of CSS, the things most people don't tell you when you're starting out that can cause you a lot of problems if you don't understand what's going on. These are things like [why z-index is broken when you don't set a value on position]() and [why spaces in your source code can show up on the page if your elements are displayed inline-block]().

But then I read a great article by this person about [Troubleshooting your CSS]() and it covered everything I was meaning to cover. It's a great guide and you should check it out.

Instead I'm going to write about something I see people doing a lot: misusing certain CSS techniques to achieve certain layouts, making it harder to read and maintain and easier to break. They can happen for a number of reasons, from project constraints like lack of time to just not knowing that better solutions exist. One thing I know for sure is that these would happen a lot less if we all learned to think conceptually with CSS and how to decide which technique to use.

###A note to the reader

Like any craft, there are a million ways to accomplish one thing. The opinions expressed in this post are just mine, so I'm certain I will be wrong about some things and/or someone will disagree with me. I recognize my fallibility and suggest you don't take my advice as fact, but I do hope you think about what I've layed out and apply it to how it works with your process.

###The first rule

If you can only get one thing out of this article, then I'm going to ask you to try a little harder and at least get two things. Let's say you're trying to style an elment and trying to figure out what to use in CSS to get it to look that way. There are two questions you should always ask yourself:

1. How is the style of this element defined by relationships to other elements?
2. How is the style of this element defined by its other attributes?

The important thing about these questions is that they help you decide what CSS technique to **not** use. So for example, with question one, you might define the position of the element as "aligned to the right of this containing div". In that case, answering question 1 will tell you that you might have to set something on the containing div, and answering question 2 will tell you that it should be aligned right regardless of width and padding and margin. So you should probably go with `float: right;` or `display:inline-block + text-align: right`, and not `position: absolute + right: 0`.

###Testing robustness

Another thing you should do often is consider the robustness of the code you're writing. There are a lot of things that can happen to a web page (that are quite common, in fact) that can upset the natural balance of your stylesheet. If you've written good CSS, your style should hold up to changes, whether made by the user, by something breaking, or by project constraints changing down the line. When writing CSS, consider what happens when:

- The width or height of the page changes
- The font size changes
- The proper font fails to load and a fallback font is chosen instead
- Javascript doesn't run
- The colors are inverted