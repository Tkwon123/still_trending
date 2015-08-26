#Still Trending

![](https://raw.githubusercontent.com/Tkwon123/still_trending/master/app/assets/images/sample_page.png)

**Still Trending** is retro-active social media platform that helps you keep involved with public conversation days, weeks, or years after the initial TV airing of any show!


##The Problem: 

The abundance of publicly available content has created two primary effects on our experience as consumers: 

On the one hand, social media has reduced the barriers to join in on public conversations, thereby amplifying our ability to immediately connect and communicate across the globe after any event.

Somewhat conversely, this overflow of content continously competes for our attention, forcing individuals to ceaselessly struggle with endless "to-dos", "to reads", and "to watch" lists.

Herein lies the problem: while content is discussed in real-time, we are inevitably caught in our own schedules and lag behind public conversations. 

With an abundance of content spawning throughout the internet these days, it's is unsurprisingly easy to feel left behind. This experience becomes especially poignant with TV shows, where streaming services (e.g. netflix, hulu) have suddenly enabled users to re-watch shows on their own schedule, thereby rarely providing time for anything social.

##The solution: 

**Still Trending** solves your social woes by allowing you to relive the public conversation on your favorite TV shows. 

Just watched Game of Throne's "Red Wedding" and are still roiling in "WTFs!?" Don't worry, you're not alone! Or how about that first episode of Parks and Recreation? Others thought it was awesome too! 

After drilling down to the particular show of interest, **Still Trending** leverages Twitter's Advanced Search (see sidenote bellow) to pull out tweets the day after the show has aired to ensure a retrospective response toward the episode (as opposed to anticipatory events). 

But don't go listening in on anything you havent seen though! That would be a pretty sad way to spoil the episode :(


##Usage: 

**Still Trending** leverages AngularJS on top of Rails and searches [TV Maze's RESTful API](http://www.tvmaze.com/api) provides the mostly-comprehensive catalog of TV shows and episode. 

Use the search bar in the upper right to find your favorite show and drill down to the episodes. Select "listen into" when you're ready to hear the conversation and voila! there you are, whenever that may be.

A bunch of handy features are already built into the app:
	- Modern styling and wizz bang effects from [Materialze](http://materializecss.com/)
	- Lazy search to automatically detect completion of search results
	- Mobile optimization to resize on small devices

Note that we *don't* use [Twitter's RESTful API](https://twitter.com/search-advanced?lang=en). Twitter's streaming API service only provides an index of streaming days for up to seven ('7') days. Instead, we use their advanced search feature which contains an index of the entire Twitter-world, and use [Mechanize](https://github.com/sparklemotion/mechanize) to scrape the search results. 

Running locally is easy. In the console:

```
git clone https://github.com/Tkwon123/still_trending/
cd still_trending
bundle update
bundle install
rails server
```

Navigate to localhost:3000 to find the homepage and use the search bar to find your desired show. 

##Noted Issues and Future Features:
- Query results for multiple shows with the same name (i.e. the office) are not supported in this current release although TV maze does offer a multi-search endpoint
- The app is not configured for shows that release multiple episodes or full seasons on one day. This is by design and as Twitter searches cannot distinguish comments between episodes 
