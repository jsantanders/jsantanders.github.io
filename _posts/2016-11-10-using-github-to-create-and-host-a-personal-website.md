---
layout: post
title: Using GitHub to Create and Host a Personal Website
tags: [github, github-pages, jekyll]
comments: true
category: programming
---
This is an opinion note about my switch to using GitHub and Jekyll for this website. My switch largely centered around this rant that played itself out quite frequently in my head:<!--break-->  When you want something simple (just posting and sharing content), having a WordPress site often comes with a lot of other things: a web hosting plan, updating plugins, monitoring auto-updates so your site's template and functionality don't break, a MySQL database, dealing with being a target for hackers, a lot of clicking around and fussing with settings, hacking Thesis, and on and on. <!-- flesh the previous sentence out with links --> For a personal website that features just few pages, a CV, and maybe a place to write blog posts and link to your social media accounts and departmental web pages – or just experiment around with the awesomeness of HTML5 <!-- flesh this out with links to codepen stuff or --> and the amazing things you can do with client side scripting <!-- ahem, more links -->, WordPress is bloated. 

Do I really need to make a database call to serve an About page with less than 500 words on it? No. Do I want a bunch of third-party scripts from whatever plugin author(s) just to have social sharing tools? No. Do I want to have to hack PHP in an existing WordPress template to adjust the banner for my logo or to just simplify the user experience? No. I still want to be able to get up and running in less than five minutes, but can't it be a little lighter?

So I made a wishlist of the things I wanted for a personal website:

* Simplicity.
* Good performance and reliability.
* No databases.
* Hosting to be free or really cheap.
* A custom domain.
* The ability to work on my site from anywhere if needed.
* To use open source tools supported by an active development community.
* To get up and running quickly.
* To have version control on my website, preferably Git.
* To be able to share my code so others can easily re-use it.

<p></p>

[There are a lot of lightweight CMS options out there](http://staticgen.com/), but I fell for the GitHub + Jekyll = <i class="fa fa-heart"></i> toolchain. It's well known and now pretty established, and the partnership it has developed with Jekyll developers (it's based in Ruby) and its use of Markdown to separate content from markup just seemed to click with me as web developer. It may not be for everybody, but after an afternoon playing around with and getting over the learning curve, I think it can be for a lot more than developers.

Do not get me wrong, I like working with dynamic web applications, it's the funniest thing there is, but for my personal blog it's like killing flies to blows. And as Jekyll has no database (runs nothing on the server side). It just keeps files ready to be served. Jekyll is really simple once you understand the basic structure and functions. It supports markdown for posts and pages. It uses the famous Liquid Syntax by shopify for conditional logic and other functionalities which actually human readable coding! I think this way of coding is very comprehensive even to a non-coder. So, if you are thinking about to switch, from my experience I advise to you do, never will back use another thing for your personal website.
