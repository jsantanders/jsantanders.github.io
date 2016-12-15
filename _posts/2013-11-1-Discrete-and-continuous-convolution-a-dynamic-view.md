---
layout: post
title: Discrete and Continuous Convolution, a Dynamic View
tags: [Matlab, Basics-Signals]
category: Signal-Processing
---

The convolution is a mathematical operator which takes two functions <span class="inlinecode">$f$</span>, <span class="inlinecode">$g$</span> and converts them into a third <span class="inlinecode">$f*g$</span> <!--break--> that represent the magnitude in which are overlapped: <span class="inlinecode">$f$</span> and an inverted version of <span class="inlinecode">$g$</span>.

 I remember that the first time I heard this, I thought that the concept was a little abstract to understand. But it turns out that in reality it's not complicated, it's only necessary to see it in action to understand its meaning. So, why not create a program that makes the convolution between two signals step by step? First, let me introduce the math equations for discrete-time and continuos-time convolution.
 
 Continuos version is an integral:
 
 $$ \tag{1} f*g=\int^{\infty}_{-\infty} f(\tau)g(t - \tau)d\tau $$
 
 And discrete version is a summation:
 
 $$\tag{2} f*g=\sum^{\infty}_{m=-\infty} f[m]g[n-m] $$
 
 We can see the convolution just a fancy word for the operation per se, like a matrix product or even simple, like a polynomials division. But in this post we are interesting in understand how works this operation. And here we go:
 
 <div class="main_block">

 <div class="inner_block">
    <img src="/img/convpost/convrect.gif" alt="Convolution rect">
 </div>

 <div class="inner_block">
    <img src="/img/convpost/convgaus.gif" alt="Convolution gaus">
 </div>

</div>

The animations above graphically illustrate the convolution of two boxcar functions (left) and two Gaussians (right). In the plots, the green curve shows the convolution of the blue and red curves as a function of <span class="inlinecode">$t$</span> the position indicated by the vertical green line. The gray region indicates the product <span class="inlinecode">$f(\tau)g(t-\tau)$</span> as function of <span class="inlinecode">$t$</span> so its area as a function of <span class="inlinecode">$t$</span> is precisely the convolution.

<div class="main_block">
    <img src="/img/convpost/conv.gif" alt="convolution">
</div>