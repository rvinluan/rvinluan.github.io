---
published: true
layout: post
title: I Just Did A Thing
subtitle: The Making and Explanation of @justdidathing (aka Status Updates)
---



<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">just plugged in my headphones so I could hear Netflix over the sound of me eating crunchy cereal, if you were wondering how my day was going</p>&mdash; Robert Vinluan (@RobertVinluan) <a href="https://twitter.com/RobertVinluan/status/561603474492641280">January 31, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

I see Tweets like this sometimes, and they're always pretty funny, so I wanted to see if I could build a bot that generates phrases of the same form. I figured it'd be a good opportunity for some funny juxtapositions as well as a good exercise working with structured grammars. Also I haven't built a Twitter bot in a while, so last weekend I sat down and coded it up.*

I went through a bunch of iterations, so this blog post is a documentation of how the bot works but also how I made it and what I improved to get it to where it is.

###v1

The first version of the bot, at its simplest, searches Twitter for tweets in the form of "I just X" and "Y is fun" and then combined the two, into "I just X, in case you were wondering how Y is going". 

"I just X" is pretty straightfoward, but for Y, I was specifically looking for things that could perhaps be classified as 'activities': driving the car, attending school, watching Breaking Bad, things like that. But Y should also have the ability to be a noun phrase, e.g. my school, or the concert. 

For the first part, "I just X", I have to find just the operative part of the sentence, i.e. the action (I just farted...), and not any supplementary information (...and it smelled). To do this I put together a Regular Expression that would find the part of the tweet that signaled the end of a 'thought': conjunctions (and, but, therefore), punctuation (:, -), new line characters, etc. This also included things that I wanted to filter out, namely links and twitter handles (Can't have my bot spamming people!).

The Y part, "Y is fun", was harder because it was more vague. The solution I came up with for dealing with these tweets is as follows: isolate the 4 words (or fewer) preceding the "is fun", and try to determine whether or not they make sense in the final sentence. To do this, I tested the parts of speech of the 4 words against a hard coded list of sequences I knew would generally work. For example, `vbg prp$ nn` (verb gerund, possessive, noun), which would cover things like "combing my hair". 

The thing about using Tweets as a corpus though, is that X and Y can be *anything*. Often things that don't make sense when recontextualized: links, twitter handles, emoji. And often, it's grammatically incorrect, in ways that are frustratingly difficult to programatically address: misspellings, run-on sentences, proper nouns, abbreviations, and lots and lots of slang (smdh). 

Both the X and the Y part were imperfect and lots of things still tripped them up. But this got me off the ground and I ran the bot for a few days to see how it went, the whole time improving the algorithm by learning how to deal with more and more situations I had not been anticipating.

![](http://i.imgur.com/bOpcCxA.png)

In the screenshot above you can see it testing different tweets for verb phrase combinations. The only ones it finds are 'the ramp' and 'using body parts'.

###v2

Using the [RiTa library](https://rednoise.org/rita/), which I found out about via [Darius Kazemi's blog post about his Sorting Hat bot](http://tinysubversions.com/notes/sorting-bot/), I was able to generate random verbs in specific tenses, and improve my searches with a little more specificity. For the X part, I could now generate a random past tense verb and search twitter for 'I just [verbed]'. For the Y, now that I could search specifically for the present participle, I could find tweets containing '[verbing]' and go from there. 

This made the output a little better, but not by much. I was still getting a lot of junk. But I guess garbage in, garbage out is what they say right?

During this phase I also made some more incremental improvements which I was able to do simply by monitoring a lot of input and adjusting to it. For example:

- I started to throw out tweets with links, because they tended to be either spam or news, and headlines don't usually have the best grammar.

- I removed trailing prepositions, because sometimes sentences would get cut off in the middle, and you're not supposed to end a sentence in a preposition, right?

- I changed all possessives to 'my', to make the tweets more consistent.


###v3

Version 1 of the bot could generate noun phrases in the Y part ("my day", "the semester") as well as verb phrases ("having a puppy"), whereas version 2, because it was seeded with a random verb, always contained said verb. I liked both, so Version 3 picks randomly between the two, each about 50% of the time.

I also made the change at this point to pick random emotions (from a hard coded list) so that instead of searching for "Y is fun", it could also sometimes search for "Y is perfect" or "Y is lame", etc.

###v4

In v3, The Y part would search for a present participle verb phrase (to find things like "driving at night") and try and find the relevant snippet by working backwards from the end of the tweet to wherever the noun was ("night", in the aforementioned example). This was optimized to produce long phrases: I wanted to disregard the tweets that simply said "driving" and nothing more.

But what I found was that the longer phrases were too specific. The humour was lost because it was impossible to reconcile the two halves of the tweet. Vague short phrases always worked the best because they could have different interpretations applied to them.

To solve this I wrote a function that would choose phrases with a bias for 3-4 words, followed by 5+ words, followed by 1-2 words (which are too boring). 

Here I also introduced other phrases into the mix, so instead of just "I just X, in case you were wondering how Y is going", the bot can say "I just X. All because of Y", or "I just X, so Y is going to be fun".

###v5 (current)

At this point it was performing acceptably but not great. I'd say it had a batting average of about a hundred, which I strived to get to at least .300: excellent for baseball players, but probably par for the course for bots (apologies for mixing my sports metaphors).

More often than not it was nonsensical and grammatically incorrect, so I had to make the decision to essentially hard code what kind of phrases it would allow, n the form of parts of speech sequences (`vbg prp$ nn`). Previously I was using a system that allowed me to specify catch-alls (`vbg * nn`, which in this case would mean a gerund verb, followed by anything, followed by a noun). I got rid of this system (though not completely) and instead made it explicit about what it allowed. You can see the full list in the [source code here](https://github.com/rvinluan/status_updates/blob/master/index.js#L371).

After this change, I'd say the bot produces understandable sentences about 90% of the time. Whether or not they're funny or interesting or good is another discussion.

###Future Improvements

I'd love to be able to detect run-on sentences, but for now my proxy for them is another first person term like "I'm" or "I'll", which usually signal the start of a run-on.

Right now the bot's biggest weakness is when people use verbs as adjectives, which I can't detect properly. For example, it thinks "living room floor" is a verb phrase, which doesn't make sense. I partially solved the above example by not allowing phrases in the form of `vbg nn nn`, but sometimes things still slip through. Also, my use of "I just" is presumptuous because it assumes the start of the sentence or phrase, but often the bot will get tripped up by sentences like "The rug I just bought", which has an implied "that". If anyone knows how to figure out how to account for this stuff, let me know.

If you're interested, you can see the full source code [here](https://github.com/rvinluan/status_updates).

I also made a diagram/flow chart to explain how it works, [if you're into that kind of stuff.](http://i.imgur.com/V1SEAZs.png)



* I did code v1 in a weekend, but after all the iterations (plus the time it took me to write this blog post), it's been more like three weeks.
