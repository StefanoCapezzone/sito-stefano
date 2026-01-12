---
title: "Linux Day 2025: From Cybersecurity to Extreme LLM Self-Hosting"
description: "A story from Linux Day 2025 in Rome, where I presented an extreme self-hosting experiment: running an LLM on a Raspberry Pi 5."
pubDate: 2025-10-25
image: "/images/blog/linux-day-llm.webp"
imageAlt: "Raspberry Pi 5 with cooler and M.2 HAT for SSD"
lang: en
tags: ["linux", "llm", "raspberry-pi", "self-hosting", "artificial-intelligence"]
---

The last Saturday of October is the date when Italy typically hosts **Linux Day**, the celebration dedicated to the operating system that now powers virtually all major enterprise systems.

The origins of this exemplary system, which definitively demonstrated to the world the power of the *open source* model, are characterized by a mix of myths and legends, more or less urban, as befits a project of such great success.

According to the prevailing media narrative, in 1991, a young student at the University of Helsinki, typically dressed with the ever-present backpack, the iconic student look of the era, named Linus Torvalds, began developing as a hobby a new operating system, Linux-type, for PC Intel 386 architectures, the top-of-the-line processor of the time.

After publishing his famous post on August 25, 1991 on the Internet (usually without specifying what "Internet" meant, leaving the impression it was the web), the project achieved tremendous success, gaining immediate approval from the People of the Net, and grew enormously to steamroll the proprietary Unix systems of giants like IBM, HP, and Sun Microsystems, becoming the unique and standard system that exists today.

## My Version of the Story

The story I remember is a bit different, partly because I was there at the time, and as a young recent graduate, I had just been employed at a very high-tech Roman company, heavily involved in European-scale technological innovation projects.

In the Esprit project environment of the '90s, Internet connection was almost mandatory, partly because companies and organizations in that network were in the habit of communicating via email rather than fax (does anyone still remember what a fax was?).

The Internet as we know it today was born only in 1996, with the advent of ISP providers. Five years earlier, if you wanted to be connected to the Internet, you went in person to CNR, specifically to GARR, the Research Network Harmonization Group, where you had to convince a zealous researcher that you and your company were doing serious research, and above all, you had to negotiate the assignment of a domain, obviously Class C, trying to get the least penalizing subnetting possible.

We, for example, obtained after stressful and lengthy negotiations a domain with subnet mask 255.255.255.240 and managed to connect all 12 PCs we had in the office.

You read that right: back then, every PC on a LAN was directly connected to the Internet, raw and exposed, without a firewall, with your development server absurdly also acting as a router, being the only computer always on and capable of dial-in on demand.

## The Era of Newsgroups

Well, in '91 there was no web as we know it today, and especially no social networks. Researchers like me fought virtually on newsgroups. The newsgroups of that time were like the university bar or cafeteria, standing in relation to academic and industrial research as the sports bar stands to the world of football matches. Basically, they were the social media of the time.

Unix was the favorite operating system of researchers and somewhat hippie independent developers of the era. The industrial alternatives were monsters like IBM CICS Cobol DB2, PDP 11, VAX, and shortly after Windows NT server for SMEs.

Unix was an entire ecosystem, based on the open source project from the University of Berkeley, but already declined in a myriad of dialects and distributions burdened by intellectual property rights.

In the research sector, we virtually squabbled over some new kernel projects, the heart of an operating system, to bring Unix to PC Intel architectures.

## The Minix vs Linux Debate

The most important dispute centered around a project called **Minix** based on the principle that a kernel should be as small as possible (mini-kernel) and everything else should be implemented as an optional add-on module.

And so in August 1991, right on the comp.os.minix newsgroup, a post appeared from this somewhat arrogant Nordic researcher (I remember him being already a researcher, not a student) announcing his "small operating system project".

It wasn't a modest announcement, despite what the title might suggest. It was a real provocation. On the official and sacred newsgroup of the Minix project, a true heresy was published: a monolithic kernel, and a big fat one at that.

The discussion remained heated for many years, but then reality brought everyone to agreement. The faction that wanted tiny kernels, which I supported with conviction, had to capitulate to the fact that making operating systems with monolithic kernels is much easier.

Aided by the undoubted value of the Unix model, given the strong need for a server operating system based on the ever-expanding Intel processor family, considering the power of the open source model, Linux, with its obese but working kernel, won, becoming the very emblem of open source.

In reality, the Minix model ultimately won in the long run. Today's Linux has a modular kernel (fancy that), and the only proprietary alternative to Microsoft Windows operating systems is MacOS, which is based precisely on the original Minix project (small world).

## My First Linux Day

All this long initial digression is to explain that when, unexpectedly, some years ago I received an invitation from Engineering students at the University of Rome Tor Vergata to propose a talk at the Rome Linux Day they were organizing, I could only accept enthusiastically.

Every year, Linux Day has a reference theme. That time the theme was Internet of Things.

Fastal had participated in several IoT projects and was a partner in the initiative born at Rome's Digital Innovation Hub to create the local The Things Network community.

Foolishly, forgetting my background as a student and researcher, I showed up with a talk about a real project, with a boringly corporate angle.

The result was that the two rooms next to where I was performing as a speaker were packed, while my audience consisted of about thirty participants, relatively elderly.

Although I consider this first experience a real flop, I was invited again as a speaker for the next edition.

## Linux Day 2024: Hacking with Flipper Zero

This time the theme was cybersecurity. I decided to remedy the previous year's flop and take a sort of revenge. I thought about it for a long time, no longer as an entrepreneur, but as a young nerd student.

At Linux Day 2024, I showed up armed with a small and fun device: the Flipper Zero, complete with Wi-Fi card. The title of my talk was a marketing masterpiece: "Wireless Network Hacking with Flipper Zero and Kali Linux".

Kali Linux was really thrown in to better contextualize the talk with the day's theme. It's a serious product we actually use for penetration testing and not something easy to show in 20 minutes, but the Flipper Zero is a not-so-dangerous but very fun and educational toy.

When I entered, the room was already full. During the 20 minutes of the show, the public Wi-Fi network of Room 1 had become a real carnival. Even the ethereal space where we see available network names on our devices had been rendered unusable. Instead of network SSIDs, the words of a famous song scrolled by, then the classroom network name appeared a thousand times, but connecting would land you on fake pages that looked like those of major streaming providers or e-commerce sites. Laughter and total success.

I believe that since then, no one present in that room has ever connected their device to an open or public network again.

## Linux Day 2025: Extreme LLM Self-Hosting

Therefore, once invited to Linux Day 2025, whose theme sounded less exciting: "self hosting", what could I bring?

After a long selection of discarded ideas, an original one emerged: extreme LLM self-hosting.

In the spring of 2025, open source (or open weight) LLM models were beginning to gain traction.

New optimization, quantization, and distillation techniques for LLMs and the use of new System 2 and Mixture of Experts architectures had enabled the release of particularly performant small-scale models.

Open Source LLMs represent a very interesting opportunity for companies typically in our target market, because they reduce operating costs, prevent vendor lock-in, and above all, can be deployed in conventional data centers with minimal GPU upgrades, even consumer-grade ones, guaranteeing 100% privacy and GDPR Compliance.

Running an Open LLM on a node with a 5090 GPU and 32 GB of conventional RAM is very easy, but how far can we push hosting downsizing?

### The Challenge: LLM on Raspberry Pi

Here's the challenge: running an LLM and implementing a generalist AI chatbot on a Raspberry Pi.

Obviously, some RAM is needed, so the bare minimum for the experiment is the new Raspberry Pi 5 with 16 GB of RAM, a little gem for about 100 Euros.

Said and done. At Linux Day 2025, I presented the experiment live.

The room was packed; I'm starting to have my own fan base.

On the table was a Raspberry Pi 5, packaged with the official fan cooler and expansion HAT to have a 512 GB SSD as mass storage.

On board was an installation of **Ollama** and **Open WebUI**, configured perfectly, with a nice collection of 4-bit quantized models, including the incredible Qwen2.5-vl and Qwen3 from Alibaba.

### The Secure Network

How to connect to the ChatBot? After the previous year's show, I could never have connected to the classroom network that we had hacked and mocked for being a total sieve.

The solution was a mini on-premise Wi-Fi network configuration, with an AP implemented on a small Samsung-made SoC device, obviously well protected and configured. A single point of vulnerability, attackable only with the one technique that knows no technological protections: social engineering.

The network had an apparently bizarre SSID: Wintermute_Mainframe. To connect, a password that I pretended to keep secret (otherwise 200 of you would connect), but I threw out a cryptic phrase, seemingly by chance: "I hope nobody catches the reference".

### The Result

The ChatBot really looked like ChatGPT, responded fluently, on point, and in a few seconds rattled off Python code to solve the Tower of Hanoi puzzle with a recursive algorithm.

An AI comparable to ChatGPT from 2023 was running without requiring a dedicated nuclear reactor, on a device connected via a USB-C charger to a regular power outlet, barely getting warm.

After a few minutes, someone caught my hook and understood. The CyberPunk culture is still alive. They got into the Raspberry Pi and issued the shutdown command. There are promising young people in our university classrooms.
