---
layout: post
title:  "Packing My Cloud Lab"
category: devoops
tags:
  - openshift
  - openstack
  - cloud
  - nuc
  - magic
images: /assets/images/devoops/lab
---

Beep, beep! The alarm sounded. It's 4 a.m. and I can't even feel my thoughts. I gotta leave without making noise. Luckily the airport is not so far from home.

I'm often travelling around the country showing a lot of stuff about DevOps, focusing on the [OpenShift Container Platform](https://www.openshift.com). It's a great work, but it has its risks. Since I don't know exactly how is the environment I'll have to present, I'm constantly surrounded by networks full of policies and proxies, buildings without reliable mobile Internet access, mobile quota exceeded, poor hotel Internet access, and the list keeps growing. Having a lot of resources on the cloud can't solve my problem if I can't connect to the cloud. This is prone to disaster.

I just can't depend on cloud providers. I had to be my own cloud provider.

I have a great friend who happens to be a digital nomad like me. He is one of the best companions ever. There was a day we were browsing the Internet looking for a "Raspberry on steroids". After finding a lot of tiny and powerful devices, he spot our winner: the [Intel Nuc Skull Canyon](https://www.intel.com/content/www/us/en/nuc/nuc-kit-nuc6i7kyk-features-configurations.html).

"One day I'll have one of these. Imagine how great it will be to arrive at a customer's site showing off this cute piece of hardware." - I told him.

This wasn't the first time Claudio found a great hardware. I've been using a [GL.iNet](http://gl-inet.com) router recommended by him, the GL-AR300M model. But the Nuc was Claudio's biggest discover. It instantly became the highest priority item on my buying list. After months of savings, I was finally able to buy a Nuc with astonished 32GB of RAM plus 1TB of SSD. The next step was supposed to be simple: running the OpenShift on it.

In the beginning, I was using the classic `oc cluster up`. It spawns an unstoppable beast that runs really smooth on such hardware. It was fast, but not fun. Specially because metrics and logging didn't work. Some issues in the deployer pods prevent them to succeed. I ended up writing an Ansible playbook to fix those issues using the `oc debug` command. It was functional, but definitely not fun.

[OpenStack](https://www.redhat.com/en/technologies/linux-platforms/openstack-platform) sounded a lot of fun to me, but, installing it through OpenStack Director on the Nuc wasn't a feasible task. So, I went with the easy-peasy [Packstack](https://wiki.openstack.org/wiki/Packstack) (please, don't kill me).

Well... not so easy for a dev like me, who had near zero experience with network stuff.

After a lot of trial and error, I finally managed to configure OpenStack. Since shit happens, I wrote a playbook to bring it up with a lab project containing all the stuff I needed to play with it. Then I made the whole thing available on [GitHub](https://github.com/devnull-tools/pack-your-lab/tree/master/openstack). "The fun has begun."

Ok! I had a way to install OpenStack, but how about installing Red Hat Enterprise Linux? Some web pages later and I found the Anaconda's Kickstart. It's a way of automating the RHEL installation (and any other Linux distribution installed through Anaconda). Even better: RHEL writes a kickstart file after every installation. Then you just have to copy and paste the file to a drive named OEMDRV. Two flash drives, one with the RHEL image and the other with the Kickstart file, would trigger the automated install. But I didn't want to use flash drives, I had two unused Android devices. Even more fun.

I've been using Android devices since 2010, my first one was a Motorola Quench running Android 1.5 - Cupcake. When I rooted it and saw the endless possibilities, my mind opened and I became fascinated by using Android devices for everything.

I started to search for a way to use an Android device as a flash drive, which led me to the awesome [DriveDroid](https://play.google.com/store/apps/details?id=com.softwarebakery.drivedroid), it's an app that emulates both flash drives and CD-ROM drives. I took my phones and loaded one with the RHEL image, the other with the Kickstart image, then I plugged both into the rear USB ports. I didn't care about the battery because they were old phones.

"Now I have two phones, only for installing RHEL? Why I don't use them for something else?" - I thought. Two Android devices can make a difference in the setup. I installed the fantastic [Servers Ultimate](https://play.google.com/store/apps/details?id=com.icecoldapps.serversultimatepro) on both phones to reduce the workload on the Nuc. A smb sharing on both phones allowed me to upload any new image I wanted to install, which led me to put an HTTP server to serve installation files for my Docker images. A git server would do the rest of the trick by holding my inventory files for my open sourced Ansible playbooks.

To finish up, I plugged the router on the USB-C port. The router takes some time to boot up, more time than the Nuc. This causes a network issue with the Nuc because OpenStack needs Network Manager disabled, so the network needs to be available before the Nuc boots up. By attaching the router on the USB-C port, it can be powered without the Nuc itself being on. Then I've attached all cables and leaved the Nuc to be ready just by plugging the power supply. Hook and loop fasteners completed the design, holding the Android devices and the router on top of the Nuc. Then it's easy to put the package in a little hand bag, which I need to open every time I go to the airport because its image on the x-ray is similar to a bomb! I've discovered it by the worst way.

Installing RHEL with OpenStack plus a fully working project was only a matter of single steps:

1. Run DriveDroid on both phones
2. Turn on the Nuc
3. Wait until a push notification arrives at my main phone
4. Shutoff DriveDroid
5. Turn on the Nuc again
6. Run the Ansible playbook to install OpenStack
7. Wait until the second push notification arrives

My Kickstart script turns off the Nuc after writing my ssh public key into the authorized keys and sending a notification through [Pushover](https://pushover.net). I've been using Pushover for some time, it's a straightforward way to get notified. That second push notification means a lot to me, it tells me my cloud environment is ready.

![My portable cloud]({{ page.images }}/nuc.png)

I finally managed to be my own cloud provider. With a lot of fun, and no single drop of rum!

The next step, installing OpenShift, wasn't easy. After a lot of issues while running the playbook, I found the problem: the router. The GL-AR300M is a great router, but it's not a router for receiving the traffic of a PaaS. So I decided to create an internal DNS as an OpenStack instance.

From my laptop, I was using the external IP addresses, but, internally, the instances will be talking with each other using only internal IP addresses instead of the external ones. A classic mistake for a dev like me.

With everything settled, I ran the playbook again... and got another error. OpenShift wasn't being able to talk with OpenStack in order to create volumes in Cinder to attach them to the nodes running pods. The problem was solved upstream, a single line telling OpenShift to use the version `v2` of the OpenStack Block Storage API. So I wrote a little workaround to apply the fix to OCP 3.7, wrapped up everything in a playbook and pushed to [GitHub](https://github.com/devnull-tools/pack-your-lab/tree/master/openshift). With OCP 3.9 applying the fix from the upstream, I don't need my custom fix anymore, just the regular playbooks.

The playbook can create all the instances with the Docker Storage mapped to a Cinder volume, all pre reqs done and the Ansible inventory file created, neat! With a single step I was able to bring up an OpenShift cluster. I ran it a lot of times on a weekend just to see things going on. That was "gigafun"! 

With the cloud environment done, it was just a matter of installing the tools for my presentations. But the environment was so great that I've decided to bring my own working environment to it. My presentations became real case scenarios!

I don't like to put labels on devs. Backend, frontend, fullstack... sounds like different types of metal music. It's all about coding, but one can have more expertise on some areas.

I love coding, I try to learn a lot of programming languages. They're tools. If you have the right tool for the job, you can get the job done with pleasure (and fun). That's why I also love to code tools to better get my job done. So, my work environment is quite easy to reproduce: a [GitLab](https://gitlab.com/) instance and a [Nexus](https://www.sonatype.com/nexus-repository-sonatype) repository. But that doesn't mean I don't have a value stream to deliver my tools.

I was abducted by the GitLab Runner. It's fantastic! My [Gogs](https://gogs.io/) instance went down and I never looked back. Don't get me wrong, Gogs is a wonderful project, but the GitLab Runner provided me the best tool to get my job done (aka: fun).

The runner is a connection between your code and your value stream (the pipeline). Every step on the pipeline runs inside a container created by the runner on top of OpenShift. I created a set of build images to not only compile my code but also to release it. Pushover tells me everything about my pipeline. Everything now happens in a wonderful and powerful integration that helps me to engage people.

There are tons of ways to do something, but the way you show how it's done is what engages people. It’s how magic is done!

A good card trick is straightforward. It doesn’t matter how you ask people to pick a card, or how nice you scramble the deck. At the end, it’s all about how you reveal the card. If you do it right, it will be unforgettable.

I love card tricks! You can easily engage an audience with a good trick and that’s how I do my presentations nowadays. They don’t expect me to come up with a little device and throw up an entire environment ready to rock. It’s my best trick! The fun-o-meter blew off!

Oh! My cab is almost here, I should probably finish my coffee. I have a presentation to do... and the best environment on my side.
