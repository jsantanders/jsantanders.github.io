---
title: "Battling with architecture erosion I: Prevention"
date: '2021-01-02'
layout: post
draft: false
category: "Software Sustainability"
tags:
  - "Software Architecture"
description: "A brief conversation about the importance of software architecture in modern applications"
---

More and more modern applications seek to reduce to a minimum or zero the amount of time that goes unavailable due to updates and deployments, however, this requires that the application be prepared for these processes, not only at the infrastructure level but the entire ecosystem that surrounds it. In this post, I explore how this goal can faces problems, and then lay out solutions that can help to prevent it.

**Context**: our daily life is highly dependent on complex, large-scale, software-intensive systems. Such as purchases and payments, power and water supplies, food production, and in these pandemic days remote jobs. These systems operate within an environment of continuous availability, which is challenging to maintain and evolve in response to the inevitable changes in stakeholder goals and system requirements. Software architecture is the foundation of all those software systems [1]. It has a profound effect on the quality of what is built on top of it. You could see software architecture as a series of decisions linked to each other [1]. Various factors wear down or pauperize the architecture of a system, which can end up in software that is tedious to maintain, and unable to evolve. We have a label for that kind of system, legacy software.

**Problem**: The design, development, and maintenance of high-quality software is still a very challenging problem, demanding synchronization and strong communication between engineers and stakeholders. A study concluded that approximately 50-70% of a system's lifecycle cost is spent on its evolution and maintenance [2]. This problem is not [new](https://en.wikipedia.org/wiki/Software_crisis) but is accentuated by this post-deployment era, where many systems are reconfigured several times on the client-side (mobile apps, SPAs, WPAs updated at any time), or on the server-side (continuous deployed services by third-party cloud providers). This continuous cycle of redeployment is affected by how well prepared the systems are for integrating new requirements that must be satisfied by hours or days. A system that is not prepared for continuous deployment cycles demands more and more time in fixing regression failures in a stable part instead of integrating new features. As a result, how to design more sustainable software systems that can endure is one of the biggest problems to solve in the field of software engineering.

## Software architecture erosion

Software systems are directly dependent on their architectural design to ensure their long-term use, efficient maintenance, and appropriate evolution. An eroded architecture arises when the source code becomes sub-optimal compared to the designed architecture [3]. This problem is produced by unsystematic, unintended addition, removal, or modification of architectural design decisions. Here are some assumptions around erosion that we may not be aware of and are worth knowing:

- Erosion only occurs during the maintenance phase: erosion can occur as soon as the architecture is chosen and before detailed design and implementation begin.
- Erosion is a slow and gradual effect over a long time: rapid erosion can occur during sprint periods where significant changes such as upgrades, platform changes, or user interface changes are taking place in short time intervals.
- Erosion is only by unintended effects associated with maintenance: erosion can be intentional and even planned. Some erosion takes place as incurring "technical debt," where short term erosion is accepted with the intent of "fixing" the architecture later, generally when the team will have more time.

**Solution:** Although it is not possible to list and detail all the requirements for a system to last and evolve over time, we can follow some general rules that will help us detect in time and prevent erosion in the architectures of our systems:

- Be aware of architectural smells better known as anti-patterns. Implement a clear strategy of code revisions and pair-review to validate any new block of code. You can use [Gerrit](https://www.gerritcodereview.com/) but there are a lot of options and many of them are excellent.
- Code and architecture metrics: Implement static analyzers with appropriate rules that estimate the complexity, coupling, cohesion, and dependencies between modules. They provide meaningful indicators on the quality of code and to estimate the technical debt ratios.
- Document every architectural decision. The documentation must be clear, follow documentation standards, and be within everyone's reach.
- Things like orphan elements, duplicate code or “clone elements”, increased coupling, decreased cohesion, and increased inheritance hierarchies are clear signals of architectural erosion.
- Adhering to established design principles enshrined in reference architectures, which embody the wisdom of reusable architectural knowledge of key design decisions and provide a common vocabulary and template solution for an architecture for specific domains or a family of software systems. As a consequence, significant benefits could be achieved, including a reduction in the cost and effort related to software maintenance and evolution.

Previous ones are prevention methods to avoid erosion, but when the code is already eroded we need to implement recovery methods. Recovery requires finding the elements of the software that has experienced erosion then employs methods to repair those elements Conventional recovery methods involve refactoring the software, component, or module.

I'll leave the detailed discussion of recovery methods for the next post in this saga. Thank you for reading, I hope you enjoyed it, and until next time.👋

## References

[1] Ingeno, J. (2018). Software Architect’s Handbook: Become a successful software architect by implementing effective architecture concepts. Packt Publishing Ltd.

[2] J. Garcia, I. Ivkovic and N. Medvidovic, "A comparative analysis of software architecture recovery techniques," 2013 28th IEEE/ACM International Conference on Automated Software Engineering (ASE), pp. 486-496, 2013.

[3] Andrews, S., & Sheppard, M. (2020). Software architecture erosion: Impacts, causes, and management. International Journal of Computer Science and Security, 14, 82-93.
