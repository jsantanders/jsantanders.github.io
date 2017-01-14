---
layout: post
title: Installing GNURadio Using Pybombs
tags: [python, GNURadio]
comments: true
category: programming
---
GNU Radio is a free & open-source software development toolkit that provides signal processing blocks to implement software radios. It can be used with readily-available low-cost external RF hardware to create software-defined radios <!--break--> , or without hardware in a simulation-like environment [1, cited]. There are several means to install the GNU Radio toolset, from the repositories using `apt-get` (Ubuntu), to the installation from the project source code in the terminal, with the help of a script or a package manager. The advantage of installing GNU Radio from the source code with respect to the repositories is that you get the newest version, since the repositories may be slow to update with respect to the progress of the project.

PyBOMBS (Python Build Overlay Managed Bundle System) is the new GNU Radio install management system for resolving dependencies and pulling in out-of-tree projects. One of the main purposes of PyBOMBS is to aggregate out-of-tree projects, which means that PyBOMBS needs to have new recipes for any new project [2, cited]. 

## Instalations steps

First, you need to install the Python pip manager, from a terminal. Or you can install [Anaconda](https://www.continuum.io/downloads)

{% highlight bash %}
$ sudo apt-get install python-pip python-dev build-essential git
$ sudo pip install --upgrade pip 
$ sudo pip install --upgrade virtualenv 
$ sudo pip install setuptools
{% endhighlight %}

if you decide to install Anaconda you can skip this first step. Once the Python application manager is installed, we need to install PyBombs.

{% highlight bash %}
$ sudo pip install PyBOMBS
{% endhighlight %}

Having once installed the PyBombs project, we need to download the recipes (Recipes are the projects locations, that need be indicated for downloading its content).

{% highlight bash %}
$ pybombs recipes add gr-recipes git+https://github.com/gnuradio/gr-recipes.git
$ pybombs recipes add gr-etcetera git+https://github.com/gnuradio/gr-etcetera.git
{% endhighlight %}

In order for GNU Radio to be run from any location, you must indicate where the project will be installed.

{% highlight bash %}
$ sudo pybombs prefix init /PATH/TO/PREFIX -a myprefix
{% endhighlight %}

please, don't forget change `/PATH/TO/PREFIX` by root folder that you want to use for the GNURadio installation. Once the prefix is initialized, we'll be going to install GNURadio from PyBombs.

{% highlight bash %}
$ sudo pybombs -p myprefix install gnuradio gr-osmosdr
{% endhighlight %}

And voila, we already have GNURadio ready to use. To use the GNURadio GUI only is needed running the next command.

{% highlight bash %}
$ sudo gnuradio-companion
{% endhighlight %}

## Installing missing icons

to install the GNURadio icons set is necessary run the next command:

{% highlight bash %}
$ sudo /PATH/TO/PREFIX/libexec/gnuradio/grc_setup_freedesktop install
{% endhighlight %}

## USRP firmarware

In order to use the USRP boards in them GNURadio environment, it's necessary to download the firmware images, this is done with the following command:

{% highlight bash %}
$ sudo /PATH/TO/PREFIX/lib/uhd/utils/uhd_images_downloader.py
{% endhighlight %}

To update the environment or one of the elements of GNURadio the command is used:

{% highlight bash %}
$ sudo pybombs -p myprefix update gnuradio
{% endhighlight %}

If you want to know the list of installed applications,

{% highlight bash %}
$ sudo pybombs -p myprefix update inv
{% endhighlight %}

And finally, the GNURadio environment can be updated with the PyBombs update command

{% highlight bash %}
$ sudo pybombs -p myprefix update gnuradio
$ sudo pybombs -p myprefix rebuild gnuradio
{% endhighlight %}

#### References

<ul class="special-list">
<small>
<li> [1] <a href="http://gnuradio.org/">The GNU Radio Foundation, Inc website</a>.</li>
<li> [2] <a href="https://github.com/gnuradio/pybombs">PyBombs GitHub repository, The GNU Radio Foundation</a>.</li>
</small>
</ul>
