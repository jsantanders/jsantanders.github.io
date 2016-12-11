---
layout: post
title: Discrete and continuous convolution, a dynamic view.
---

The convolution is a mathematical operator which takes two functions $$f$$, $$g$$ and converts them into a third $$f * g$$ th represent the magnitude in which are overlapped: $$f$$ and an inverted version of $$g$$.

 I remember that the first time I heard this, I thought that the concept was a little abstract to understand. So, why not create a program that makes the convolution between two signals step by step? First, let me introduce the math equations for discrete-time convolution and continuos-time convolution.  

~ Equation { #euler }
e = \lim_{n\to\infty} \left( 1 + \frac{1}{n} \right)^n
~