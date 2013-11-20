---
title: Where to put your Javascript files
subtitle: A Webdev beginner-intermediate guide, part 2
layout: post
show_subtitle: true
---

Recently I've come across a problem that I've never had before, and upon Googling a solution I've found the current discussion to be woefully inadequate. I had to move some javascript around for templating purposes, but some of them were in the head and some of them were in the body. No doubt the question of where to put javascript files confuses a lot of beginners. It's because the explanation can be long-winded and very contextually dependent. But in my searching I've found many explanations to have conflicting and very opinionated subjective arguments. This article is my attempt to write a comprehensive guide to where you should include your javascript files.

**TL;DR:** It depends on what your javascript file does.

### Why is there a choice in the first place?

The first question most people ask is why we don't just put all our javascript in one place, whether it be the head or the body? That question isn't so complicated to answer, but it takes a little bit of history.

In the dawn of ECMAscript and the HTML spec, developers included javascript in the head just like css files, as they were sort of like dependencies of the page, and needed to be included before the page rendered.

As the complexity of the web increased though, javascript files were getting bigger and bigger, webpages needed more and more of them, and each coming from a different place. And javascript files are *blocking*, meaning that browsers don't do anything else while they're downloading\*. Which means that, if one of your javascript files takes an unusally long time to download for whatever reason (maybe a server is down), it can block the rendering of the page and the user won't be happy.

OK, so let's just put everything at the end of the body then, right? Putting your script files at the end of the document means they won't download until the page content is rendered first. But that can lead to two problems. For one, if the javascript is changing the way things look on the page (hiding/showing elements for example), your user might 