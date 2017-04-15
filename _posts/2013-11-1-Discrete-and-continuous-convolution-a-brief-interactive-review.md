---
layout: post
title: Discrete and Continuous Convolution, a Brief Animate Review
comments: true
tags: [Matlab, Basics-Signals]
category: Signal-Processing
---

The convolution is a mathematical operator which takes two functions <span class="inlinecode">$$f$$</span>, <span class="inlinecode">$$g$$</span> and converts them into a third <span class="inlinecode">$$f*g$$</span> <!--break--> that represent the magnitude in which are overlapped: <span class="inlinecode">$$f$$</span> and an inverted version of <span class="inlinecode">$$g$$</span>.

 I remember that the first time I heard this, I thought that the concept was a little abstract to understand. But it turns out that in reality it's not complicated, it's only necessary to see it in action to understand its meaning. So, why not create a program that makes the convolution between two signals step by step? First, let me introduce the math equations for discrete-time and continuos-time convolution.
 
 Continuos version is an integral:
 
 $$ \tag{1} f*g=\int^{\infty}_{-\infty} f(\tau)g(t - \tau)d\tau $$
 
 And discrete version is a summation:
 
 $$\tag{2} f*g=\sum^{\infty}_{m=-\infty} f[m]g[n-m] $$
 
 We can see the convolution just a fancy word for the operation per se, like a matrix product or even simple, like a polynomials sum. But in this post we are interesting in understand how works this operation. And here we go:
 
 <div class="main_block">

 <div class="inner_block">
    <img src="/images/convpost/convrect.gif" alt="Convolution rect">
 </div>

 <div class="inner_block">
    <img src="/images/convpost/convgaus.gif" alt="Convolution gaus">
 </div>

</div>

The animations above graphically illustrate the convolution of two boxcar functions (left) and two Gaussians (right). In the plots, the green curve shows the convolution of the blue and red curves as a function of <span class="inlinecode">$$t$$</span> the position indicated by the vertical green line. The gray region indicates the product <span class="inlinecode">$$f(\tau)g(t-\tau)$$</span> as function of <span class="inlinecode">$$t$$</span> so its area as a function of <span class="inlinecode">$$t$$</span> is precisely the convolution.

<div class="main_block">
    <img src="/images/convpost/conv.gif" alt="convolution">
</div>

Code for do this animation is in my <a href="https://gist.github.com/rymnikski/454534def5f037ccc08b59a37d79a7b3">Github Gist</a> you can modify and play with it, works with Matlab and Octave, in case that you want view a continuos version, just change 'stem' by 'plot'.

<h4><b>References</b></h4>

* <a href="http://mathworld.wolfram.com/about/author.html"  target="_blank">Weisstein, Eric W</a>. "Convolution." From <a href="http://mathworld.wolfram.com/"  target="_blank">MathWorld</a>--A <a href="http://mathworld.wolfram.com/Convolution.html"  target="_blank">Wolfram Web Resource</a>.

* Convolution. (n.d.). In Wikipedia. Retrieved November 2013, From <a href="https://en.wikipedia.org/wiki/Convolution"  target="_blank">Wikipedia Resource</a>.

