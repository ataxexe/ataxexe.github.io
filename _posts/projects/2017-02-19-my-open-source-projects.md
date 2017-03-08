---
layout: post
title:  My Open Source Projects
category: projects
tags:
  - projects
  - programming
  - devnull-tools
---

I'm not in favor of reinventing the wheel, but sometimes the wheel needs to be polished or rethought. Bellow is a couple of projects I coded to solve my problems, maybe they can solve yours too.

## [Trugger](https://github.com/devnull-tools/trugger)

This is a couple of DSLs for doing reflection black magic in Java without compromising code readability. I've seen a lot of reflection DSL's but I really wanted to go a little further (like doing method invoke validations like a Bean Validation). This is my oldest project (about 9-10 years), I started it when I didn't have Internet access at work (but I needed to solve problems as if Google was personified and sitting on the next chair).

## [Kodo](https://github.com/devnull-tools/kodo)

This is a simple DSL for writing Specs for test scenarios in Java. I used to use JBehave but I didn't like its approach, so I designed my own.

## [Asciinurse](https://github.com/devnull-tools/asciinurse)

This is a plugin for Asciidoctor. I was searching about how to add charts to Asciidoctor files but I couldn't find something really useful and, since I was designing an automated tool to produce reports for my customers, I coded something to get the job done.

## [Sherlog Holmes](https://github.com/devnull-tools/sherlog-holmes)

This is a command line tool written in Ruby to map and reduce log files. I was tired of receiving 5GB of logs from my customers with a note saying "the error is in the log". This little guy helped me A LOT in my troubleshooting sessions.

## [Boteco](https://github.com/devnull-tools/boteco)

This is a bot platform that allows you to code a message processor without being aware of the source of the message. You can write a "ping" message processor and it will work in an IRC chat, Telegram chat, etc.

## [Jenkins Notifier](https://github.com/devnull-tools/jenkins-notifier)

This is a simple plugin for sending push notifications regarding build status. It can even send notifications to boteco so users can subscribe to notifications using boteco's platform (the same way as the support case notifications).

---- 

Feel free to check out my babies and to contribute as well.