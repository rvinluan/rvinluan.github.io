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

For the first part, "I just X", which we can call the X bit, I have to find just the operative part of the sentence, i.e. the action (I just farted...), and not any supplementary information (...and it smelled). To do this I put together a Regular Expression that would find the part of the tweet that signaled the end of a 'thought': conjunctions (and, but, therefore), punctuation (:, -), new line characters, and also things that I wanted to filter out, namely links and twitter handles (Can't have my bot spamming!).

The Y bit, "Y is fun", was harder because it was even more vague. My initial solution for dealing with these tweets is as follows: isolate the 3 words preceding the "is fun", and try to determine whether or not they make sense in the final sentence. To do this, I tested the parts of speech of the 3 words against a hard coded list of sequences I knew would generally work. For example, `vbg prp$ nn` (gerund verb, possessive, noun), which would cover things like `combing my hair`. 

Both methods are imperfect. But this got me off the ground and I ran the bot for a few days to see how it went, the whole time improving the algorithm by learning how to deal with more and more situations I had not been anticipating.


###v2

Using the RiTa library, which I found out about via Darius Kazemi's blog post about his Sorting Hat bot, I was able to generate random verbs in specific tenses, and improve my searches with a little more specificity. Now I could generate a random past tense verb and search twitter for 'I just [verbed]'. I also changed the method for searching for the Y bit: now that I could search specifically for a gerund, I could find tweets with '[verbing]' and get an operative with a similar approach to the X bit. 

This made the output a little better, but not much. I was still getting a lot of junk. But I guess garbage in, garbage out is what they say right?

During this phase I also made some more incremental improvements which I was able to do simply by monitoring a lot of input. For example:

- I started to throw out tweets with links, because they tended to be either spam or news, and headlines don't usually have the best grammar.

- I removed trailing prepositions, because sometimes sentences would get cut off in the middle, and also you're not suppopsed to end a sentence in a preposition, right?

- I changed all possessives to 'my', so tweets like '...if you were wondering how her day is going' would make more slightly sense.


###v3

The Y bit of the bot's version 1 could generate noun phrases ("my day", "the semester") as well as verb phrases ("having a puppy"), whereas version 2, because it was seeded with a random verb, always contained said verb. I liked both, so Version 3 picks randomly between the two (weighted for v2 70% of the time, just because it's more reliable).