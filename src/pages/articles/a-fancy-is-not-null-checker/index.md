---
title: "A fancy 'is not null' checker for C#"
date: '2021-01-23'
layout: post
draft: false
category: "Development"
tags:
  - "C#"
description: "Checking if a reference is not null is never going to be the same."
---

The classic way of check if an reference is not null is the following:

```csharp
if (thing != null)
```

But, what happens if someone overload the `!=` operator? We cannot guarantee that is an object. But, using the following pattern, that wouldn't matter:

```csharp
if (thing is object)
```

Also, we can use it to check if a reference is null:

```csharp
if (thing is null)
```

There are developers who can argue that in this way (first case) the intention of checking if the variable has a non-null instance is being obfuscated. But I think it's more idiomatic, at least once you get used to it. What do you think?
