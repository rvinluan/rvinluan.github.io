---
published: false
---



<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">just plugged in my headphones so I could hear Netflix over the sound of me eating crunchy cereal, if you were wondering how my day was going</p>&mdash; Robert Vinluan (@RobertVinluan) <a href="https://twitter.com/RobertVinluan/status/561603474492641280">January 31, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

I see Tweets like this sometimes, and they're always pretty funny, so I wanted to see if I could build a bot that generates phrases of the same form. I figured it'd be a good opportunity for some funny juxtapostions as well as a good exercise working with structured grammars and also I haven't built a Twitter bot in a while, so last weekend I sat down and coded it up.

I went through a bunch of iterations, so this blog post is a documentation of how the bot works but also how I made it and what I improved to get it to where it is.

###v1

The first version of the bot, at its simplest, searches Twitter for tweets in the form of "I just X" and "Y is fun" and then combined the two, into "I just X, in case you were wondering how Y is going". 

Here's the thing about using Tweets as a corpus: X and Y can be *anything*. Often it's bits that don't make sense when recontextualized: links, twitter handles, emoji. Even more often, it's grammatically incorrect. And frustratingly, a lot of it has content that is very hard to programatically address: misspellings, run-on sentences, proper nouns, abbreviations, and lots and lots of slang (smdh). 

For the first part, "I just X", which we can call the X part, I have to find just the operative part of the sentence, i.e. the action (I just farted...), and not any supplementary information (...and it smelled). To do this I put together a Regular Expression that would find the part of the tweet that signaled the end of a 'thought': conjunctions (and, but, therefore), punctuation (:, -), new line characters, and also things that I wanted to filter out, namely links and twitter handles (Can't have my bot spamming!).

The Y part, "Y is fun", was harder because it was more vague. The solution I came up with for dealing with these tweets is as follows: isolate the 3 words preceding the "is fun", and try to determine whether or not they make sense in the final sentence. To do this, I tested the parts of speech of the 3 words against a hard coded list of sequences I knew would generally work. For example, `vbg prp$ nn` (verb gerund, possessive, noun), which would cover things like "combing my hair". 

Both the X and the Y part were imperfect and lots of things still tripped them up. But this got me off the ground and I ran the bot for a few days to see how it went, the whole time improving the algorithm by learning how to deal with more and more situations I had not been anticipating.


###v2

Using the [RiTa library](https://rednoise.org/rita/), which I found out about via [Darius Kazemi's blog post about his Sorting Hat bot](http://tinysubversions.com/notes/sorting-bot/), I was able to generate random verbs in specific tenses, and improve my searches with a little more specificity. Now I could generate a random past tense verb and search twitter for 'I just [verbed]'. I also changed the method for searching for the Y part: now that I could search specifically for the present participle, I could find tweets with '[verbing]' and get an operative by finding the 'thought endings', with a similar approach as the X part. 

This made the output a little better, but not by much. I was still getting a lot of junk. But I guess garbage in, garbage out is what they say right?

During this phase I also made some more incremental improvements which I was able to do simply by monitoring a lot of input and adjusting ot it. For example:

- I started to throw out tweets with links, because they tended to be either spam or news, and headlines don't usually have the best grammar.

- I removed trailing prepositions, because sometimes sentences would get cut off in the middle, and also you're not suppopsed to end a sentence in a preposition, right?

- I changed all possessives to 'my', so tweets like '...if you were wondering how her day is going' would make more slightly sense.


###v3

The Y part of the bot's version 1 could generate noun phrases ("my day", "the semester") as well as verb phrases ("having a puppy"), whereas version 2, because it was seeded with a random verb, always contained said verb. I liked both, so Version 3 picks randomly between the two (weighted for v2 70% of the time, just because it's more reliable).

I also made the change at this point to pick random emotions (from a hard coded list) so that instead of searching for "Y is fun", it could also sometimes search for "Y is perfect" or "Y is lame", etc.

###v4 (current)

In v3, The Y part would search for a present participle verb phrase (to find things like "driving at night") and try and find the relevant snippet by working backwards from the end of the tweet to wherever the noun was ("night", in the aforementioned example). This was optimized to produce long phrases: I wanted to disregard the tweets that simply said "driving is fun" and nothing more.

But what I found was that the longer phrases were too specific. The humour was lost because it was impossible to reconcile the two halves of the tweet. Thus, vague short phrases worked the best because they could have different interperetations applied to them.

To solve this I wrote a function that would choose phrases with a bias for 3-4 words, followed by 5+ words, followed by 1-2 words (which are too boring). 

The current version also introduces other phrases into the mix, so instead of just "I just X, in case you were wondering how Y is going", the bot can say "I just X. All because of Y", or "I just X, so Y is going to be fun".

###Future Improvements

I'd love to be able to detect run-on sentences, but for now my proxy for them is another first person term like "I'm" or "I'll", which usually signal the start of a run-on.

Right now the bot's biggest weakness is when people use verbs as adjectives, which I can't detect properly. For example, it thinks "living room floor" is a verb phrase, which doesn't make sense. Also, my use of "I just" is presumptuous because it assumes the start of the sentence, but often the bot will get tripped up by sentences like "The rug I just bought", which has an implied "that", but I haven't figured out how to solve that just yet.

If you're interested, you can see the full source code [here](https://github.com/rvinluan/status_updates).