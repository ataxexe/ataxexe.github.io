---
layout: post
title:  "OpenShift on a Nuc Shell"
category: devoops
tags:
  - openshift
  - cloud
  - nuc
  - magic
images: /assets/images/devoops/openshift-on-a-nuc-shell
---

A lot of employees work on customers' sites and need to engage people every single day. Mobile Internet isn't something
broadly reliable, which makes demonstrations of cloud products and complex solutions undoable.

After thinking about it for some time, I finally got something good, which I'd like to share with you in this post.

## The Requirements

As stated, mobile connection isn't something enjoyable for people always on move. This situation requires an entirely
offline solution to get the job done, thus requiring firepower. As a result, portability became a must have (because
walking with a 2U server will probably break your back... and your bank account too).

## The Solution

After some research, I got a nice Intel® NUC Kit NUC6i7KYK powered by an Intel® Core™ i7-6770HQ, 32GB of RAM and 1TB of
SSD. How big is it?

![Intel Nuc]({{ page.images }}/nuc.jpg)

It's so small that only 4 hex stickers fit on its left side! Inside this cute little box lives an OpenShift Origin 3.6
running mainly those services:

- Gogs
- Nexus 3
- SonarQube
- TeamCity
- 3x TeamCity Build Agents

Here is a screenshot of the project:

![OpenShift]({{ page.images }}/openshift.png)

Those services can support coding endeavors without any trouble. And there is enough room to test and demonstrate a
bunch of stuff.

This little thing is helping me not only work on my Open Source projects but also to engage people. When someone sees
all my environments in such a tiny piece of hardware I can get the attention I need. Of course, it's a capable machine,
but it's like a great laptop without the screen and keyboard. A lot of engineers have more power in their environments,
so it isn't that much for my customers. The thing is to show something in a different way. It's like how magic is done!

## The Impact

I love card tricks. You can easily engage an audience with a good trick and that's how I do my demos. They don't expect
me to come with a little device and throw up an entire environment ready to rock. It's a good trick!

A good card trick is straightforward. It doesn't matter how you ask people to pick a card, or how nice you scramble the
deck. At the end, it's all about how you reveal the card. The revealing process might be unforgettable if done right.
 The NUC shell is how I "reveal" OpenShift.

This post was originally published on [Red Hat Developers Blog][post].

[post]: <https://developers.redhat.com/blog/2017/08/18/openshift-on-a-nuc-shell/>
