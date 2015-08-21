The Problem: 

The abundance of public content has created two primary effects on our experience as consumers: 

On the one hand, social media has reduced the barriers to join in on public conversations, amplifying our ability to feel immediately connected and communicate across the globe after any event.

Conversely, this overflow of content continously competes for our attention, forcing individuals to ceaselessly struggle with queues of "to-dos", "to reads", and "to watch." 

Herein lies the rub: while content is discussed in real-time, we are inevitably caught in our own schedules and lag behind public conversations. 

With an abundance of content spawning throughout the internet these days, it's is unsurprisingly easy to feel left behind. This experience becomes especially poignant with TV shows, where streaming services (e.g. netflix, hulu) have suddenly enabled private marathons that rarely provide time for anything social.

The solution: 

**Still Trending** solves your timing and social woes by allowing you to relive the public conversation on your current binge-fest. Just watched Game of Throne's "Red Wedding" and are still roiling in "WTFz!?" Don't worry, you're not alone! Or how about that first episode of Parks and Recreation? Others thought it was awesome too! 

Use **Still Trending** to search for your current binge

After drilling down to the particular show of interest, **Still Trending** leverages Twitter's Advanced Search* to pull out tweets the day after the show has aired to ensure a retrospective response toward the episode (as opposed to anticipatory events). 

But don't go listening in on anything you havent seen though! That would be a pretty sad way to spoil the episode :(

Shows are all searched as described in the input box. however, search queries are transformed into hashtags to best  

Technical stuff: 

**Still Trending** leverages AngularJS on top of Rails and searches TV Maze's RESTful API provides the mostly-comprehensive catalog of TV shows and episode. 

*psst... sidebar: Note that we don't use Twitter's RESTful API. Twitter's streaming API service only provides an index of streaming days for up to seven ('7') days.  Instead, we use their advanced search feature which contains an index of the entire Twitter-world, and use Mechanize to scrape the search results. 

Future features:
- Query results for multiple episodes