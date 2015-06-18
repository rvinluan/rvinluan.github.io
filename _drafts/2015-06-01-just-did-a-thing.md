---
published: false
---



<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">just plugged in my headphones so I could hear Netflix over the sound of me eating crunchy cereal, if you were wondering how my day was going</p>&mdash; Robert Vinluan (@RobertVinluan) <a href="https://twitter.com/RobertVinluan/status/561603474492641280">January 31, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

I see Tweets like this sometimes, and they're always pretty funny, so I wanted to see if I could build a bot that generates phrases of the same form. I figured it'd be a good opportunity for some funny juxtapostions as well as a good exercise working with structured grammars and also I haven't built a Twitter bot in a while, so last weekend I sat down and coded it up.

I went through a bunch of iterations, so this blog post is a documentation of how the bot works but also how I made it and what I improved to get it to where it is.

###v1

The first version of the bot, at its simplest, searches Twitter for tweets in the form of "I just X" and "Y is fun" and then combined the two, into "I just X, in case you were wondering how Y is going". 

Now the thing about searching Tweets is that X and Y can be anything. Often it's bits that don't make sense when recontextualized: links, twitter handles, emoji. Even more often, it's grammatically incorrect. And frustratingly, a lot of it has content that is very hard to programatically address: misspellings, run-on sentences, proper nouns, abbreviations (smdh), and lots and lots of slang. 

For the first bit, "I just X", let's call this the X bit, I have to find just the operative part of the sentence, i.e. the action (I just farted...), and not any supplementary information (...and it smelled). To do this I put together a Regular Expression that would find the part of the tweet that signaled the end of a 'thought': conjunctions (and, but, therefore), punctuation (:, -), new line characters, and also things that I wanted to filter out, namely links and twitter handles (Can't have my bot spamming!).