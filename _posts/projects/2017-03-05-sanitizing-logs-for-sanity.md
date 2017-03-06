---
layout: post
title:  "Sanitizing logs, for sanity!"
category: projects
tags:
  - projects
  - problem solving
  - devnull-tools
  - log analysis
  - sherlog holmes
---

"Hey, here's the log file, the error is in there!" - He told me. How fool I was when I lend him my pendrive, hoping to find the cause for that error in a couple of minutes. When I got my pendrive, I realize why he asked me for it: the log file was 5GB lengthy.

"Ok, Ataxexe! Just run a `grep` and everything will be fine" - I thought. But it happens that a single `grep` command didn't solve my problem. It was a lot of entries, a lot of dirty outputs (seriously, why people insist to use `System.out.println` instead of a real logger?) and my sanity was being tested.

I was running out of time to solve that issue, but I managed to do it. It was awful, my head was about to explode. Suddenly, my cellphone rang. It was my friend, JP, asking me for some script that could filter a log file and remove stacktraces so he could analyze it. Then I realized that I should go for some code.

The process is kinda simple: map each entry in the log, apply a filter and output only the filtered entries. I ran for regular expressions because it's a good way to map a log entry. I choose Ruby because I love how it deals with regular expressions and the code could be really simple to test and maintain. At the end, I was publishing a gem that really helped me, the [sherlog-holmes](https://rubygems.org/gems/sherlog-holmes).

Since I'm constantly working with middleware products that uses JBoss EAP as the foundation, I only needed to write an expression to cover the default JBoss EAP log output but the tool is flexible enough to allows other expressions.

Now I'm able to do something like this:

`sherlog server.log --level ERROR --exception java.net.SocketException --print `

This will filter just log entries of the `ERROR` level containing a `java.net.SocketException` and print them in the output, then I can reduce the log by using the `>` redirection operator:

`sherlog server.log --level ERROR --exception java.net.SocketException --print > sanitized.log`

I can also remove those `System.out` entries from log files:

`sherlog server.log --not --category stdout --print > sanitized.log`

The `--print` option is to... print the entries. That's because I often need to tell people things like "you have 42 occurrences of NPE's so please try to fix that before saying that Java has a bug in the `for` loop" (seriously, I've been through something like this, and it was really hard to not pull off my left arm just to have something to throw at the guy). Because of that, I've introduced a `--count` option.

The great part is I've always had huge input files for testing. I'm using `sherlog-holmes` in the field for some time and it's always proving me that sanity logs are not that common. In case you want to use the tool, go check its [git repository](https://github.com/devnull-tools/sherlog-holmes) for more detailed instructions.

---

Of course I included the `--no-stacktrace` option to suppress stacktraces and make JP happy!