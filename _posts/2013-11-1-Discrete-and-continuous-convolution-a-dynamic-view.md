---
layout: post
title: Discrete and Continuous Convolution, a Dynamic View
tags: [Matlab, Signal-Basics]
category: Signal-Processing
---

The convolution is a mathematical operator which takes two functions <span class="inlinecode">$f$</span>, <span class="inlinecode">$g$</span> and converts them into a third <span class="inlinecode">$f*g$</span> that represent the magnitude in which are overlapped: <span class="inlinecode">$f$</span> and an inverted version of <span class="inlinecode">$g$</span>.

 I remember that the first time I heard this, I thought that the concept was a little abstract to understand. So, why not create a program that makes the convolution between two signals step by step? First, let me introduce the math equations for discrete-time and continuos-time convolution.