[![GitHub release](https://img.shields.io/github/release/jsantanders/jsantanders.github.io.svg)](https://github.com/jsantanders/jsantanders.github.io) [![Code Climate](https://img.shields.io/codeclimate/maintainability/jsantanders/jsantanders.github.io.svg)](https://codeclimate.com/github/jsantanders/jsantanders.github.io) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/jsantanders/jsantanders.github.io/master/LICENSE) [![Twitter](https://img.shields.io/twitter/url/https/github.com/jsantanders/jsantanders.github.io.svg?style=social)](https://twitter.com/intent/tweet?text=Wow:&url=https://github.com/jsantanders/jsantanders.github.io)

# Lumen

Lumen is a minimal, lightweight and mobile-first starter for creating blogs uses
[Gatsby](https://github.com/gatsbyjs/gatsby).

This is a fork of
[gatsby-v2-starter-lumen](https://github.com/jsantanders/jsantanders.github.io/)

## Features
+ Lost Grid ([peterramsing/lost](https://github.com/peterramsing/lost)).
+ Beautiful typography inspired by [matejlatin/Gutenberg](https://github.com/matejlatin/Gutenberg).
+ [Mobile-First](https://medium.com/@mrmrs_/mobile-first-css-48bc4cc3f60f) approach in development.
+ Stylesheet built using SASS and [BEM](http://getbem.com/naming/)-Style naming.
+ Syntax highlighting in code blocks.
+ Sidebar menu built using a configuration block.
+ Archive organized by tags and categories.
+ Automatic RSS generation.
+ Automatic Sitemap generation.
+ Offline support.
+ Google Analytics support.
+ Disqus Comments support.
+ Dark/Light theme support
+ TypeScript support.

## Folder Structure

```
└── src
    ├── assets
    │   ├── fonts
    │   │   └── fontello-771c82e0
    │   │       ├── css
    │   │       └── font
    │   └── scss
    │       ├── base
    │       ├── mixins
    │       └── pages
    ├── components
    │   ├── CategoryTemplateDetails
    │   ├── Disqus
    │   ├── Layout
    │   ├── Links
    │   ├── Menu
    │   ├── PageTemplateDetails
    │   ├── Post
    │   ├── PostTemplateDetails
    │   ├── ScrollButton
    │   ├── Sidebar
    │   ├── ThemeToggle
    │   └── Translations
    ├── layouts
    ├── pages
    │   ├── articles
    │   └── about
    └── templates
```

## Getting Started
Install this starter (assuming Gatsby is installed) by running from your CLI:
`gatsby new lumen https://github.com/jsantanders/jsantanders.github.io`

#### Running in Development
`gatsby develop`

#### Building
`gatsby build`

#### Deploy with Netlify

Netlify CMS can run in any frontend web environment, but the quickest way to try it out is by running it on a pre-configured starter site with Netlify. Use the button below to build and deploy your own copy of the repository:

<a href="https://app.netlify.com/start/deploy?repository=https://github.com/jsantanders/jsantanders.github.io" target="_blank"><img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify"></a>

After clicking that button, you’ll authenticate with GitHub and choose a repository name. Netlify will then automatically create a repository in your GitHub account with a copy of the files from the template. Next, it will build and deploy the new site on Netlify, bringing you to the site dashboard when the build is complete. Next, you’ll need to set up Netlify’s Identity service to authorize users to log in to the CMS.

## Who This Repo is For
This repo is mostly for me. I, like many of you, host my code on GitHub for reasons of portability, ease of work, and peace of mind. Beyond my own needs, I have also open-sourced this repo for you, the reader (and most likely developer), to explore the things that you find interesting on my website.

**NOTE:** If you fork or clone this project, please be sure you:

* Edit `gatsby-plugin-google-analytics` and either
  * Replace the Google Analytics tracking code with your own, or
  * If you don't use Google Analytics, comment the block of code out entirely.
* Edit `disqusShortname` and either
  * Replace the `disqusShortname` with your own DISQUS username, or
  * If you don't want commenting, remove or comment out the block of code entirely.

Otherwise I will receive GA data and DISQUS comments from your website.
