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

A lot of employees work basically on customers' sites and need to engage people every single day. Mobile Internet isn't something broadly reliable, which makes demonstrations of cloud products undoable, including OpenShift.

After some time thinking about it I finally got something good, which I'd like to share in this post with you.

## The Requirements

As stated, mobile connection isn't something pleasure to use for people always on move. This situation requires an entirely offline solution to engage people, thus requiring firepower. As a consequence, portability became a must have (because walking with a 2U server will probably broke your back... and your bank account too).

## The Solution

After some research, I got a nice Intel Nuc Skull Canyon with 32GB RAM and 1TB SSD. How big is it?

![Intel Nuc]({{ page.images }}/nuc.jpg)

It's so small that only fits 4 hex stickers on the left side! Inside this cute little box lives an OpenShift Origin 3.6 running mainly those services:

- Gogs
- Nexus 3
- SonarQube
- TeamCity
- 3x TeamCity Build Agents

Here is a screenshot of the project:

![OpenShift]({{ page.images }}/openshift.png)

Those services can support coding endeavors without any troubles. And there is enough room to test and demonstrate a bunch of stuff.

This little thing is helping me not only to work on my Open Source projects but also to impress people. When someone sees all my environment in such a tiny piece of hardware I can get the attention I need. Of course it's a capable machine, but it's like a great laptop without the screen and keyboard. A lot of engineers have more power in their environments, so isn't that much for my customers. The thing is to show something in a different way. It's like how magic is done!

## The Impact

I love card tricks. You can engage and audience easily with a good trick and that's how I can engage people with my Nuc: they don't expect me to come with a little device and throw up an entire environment ready to rock.

It doesn't matter how you ask people to pick a card, or how good you are scrambling the deck. At the end, it's all about how you reveal the card. The revealing process might be unforgettable if done right, and I can use that to engage people. The Nuc shell is how I "reveal" OpenShift.