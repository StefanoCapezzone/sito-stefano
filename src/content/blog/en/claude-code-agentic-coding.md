---
title: "Claude Code: Welcome to the Era of Agentic Coding"
description: "With Claude Code 2.0, Anthropic has paved the way for a new era of software development. Not vibe coding, but true AI-powered software engineering."
pubDate: 2026-01-09
image: "/images/blog/claude-code.webp"
imageAlt: "Claude Code - Agentic Coding"
ogImage: "/images/blog/claude-code-og.webp"
lang: en
tags: ["artificial-intelligence", "llm", "claude-code", "software-engineering", "agentic-ai"]
---

In recent weeks, two seemingly opposite phenomena have occurred.

On the media narrative front regarding the wonders of Artificial Intelligence, skeptical voices about the real ability of new tools powered by Large Language Models to create value have become decidedly dominant.

Authoritative opinions from researchers with impressive credentials like Gary Marcus, who has always been convinced that hyper-scaling of models based exclusively on deep learning would not lead to the development of true Artificial Intelligence, have suddenly been re-evaluated and reconsidered by many analysts and observers who had previously strongly supported this trend.

On the more pop-oriented science journalism front, the usual tech experts and popularizers, always ready to catch the trend of the moment, have rushed to recover studies and research produced by prestigious institutions to support the new thesis of the imminent bursting of the AI bubble and comment on the evident failure of technologies described just days earlier as miraculous and destined to change the world (or at least destroy all of humanity, if not carefully governed).

Meanwhile, off the illuminated stages of mainstream media, Anthropic, one of the most important companies in the sector and the main competitor of the prima donna OpenAI, has released version 2.0 of its *deep agent* **Claude Code**.

The event, in the style of the sober and *nerdy* Anthropic, happened without fanfare. Too bad, because Claude Code release 2 is a true miracle.

Or rather, what this autonomous programming agent can do is truly miraculous.

For anyone engaged in developing agentic AI applications, Claude Code has always been a reference benchmark for what is possible to achieve using a state-of-the-art LLM as the backbone of a software agent.

Anthropic has literally paved the way and pointed the direction for an entire new generation of designers, pioneers of the new discipline called *agent engineering*.

## Claude Code and Other Coding Tools

Claude Code is not the only product of its kind on the market.

These are tools that automate software development, i.e., coding, and promise to drastically speed up the creation of systems and applications and automatically fix the inevitable *bugs* that are periodically found in any application.

GitHub Copilot (not to be confused with Microsoft 365's copilot, the AI version of the famous paperclip from early versions of Office), Cursor AI, Devin AI, Replit, and OpenAI's Codex are among the best known.

These are the same tools that excited early AI fans, leading them to coin one of the dumbest terms in the history of software engineering: *vibe coding*.

*Vibe coding* doesn't work! The expert popularizers will tell you from their high-tech columns in major newspapers, and they're right, because it never worked and never could have worked.

But here we're not talking about vibe coding.

## The Limits of LLMs

Current Artificial Intelligence is not intelligent, we all know this, it has never been intelligent and we have always known this too, just as we have always known that it is a technology that simulates human reasoning well, but simulates it because it writes, or rather generates text, sentences, answers that sound correct and meaningful in our natural language.

But AI is not able to truly understand, it lacks a real ability for internalization and relationship between sequences of words and symbols and a conceptual and purposeful model of the real physical world.

A modern LLM is not capable of performing tasks that require authentic creativity.

It is not possible to provide a textual description of desired features in a new software application that is on average more articulated, complete, and complex than a simple demo prototype or a *proof of concept* and expect a generative AI to autonomously produce a working software system ready to be used in a real scenario.

The problem is that modern computing is complex and articulated. There is not just one way to do things. There is not just one solution to a technical-functional specification.

For the same problems and the same application sectors, there exists a multitude of possible design *patterns* and none of them is the absolute best.

Designing a complex system is an art that is learned over time and with experience. Every solution is a careful compromise, the result of conscious choices between competing requirements.

## LLMs Excel at Code Generation

Programming languages are much more rigid and formal than natural languages. There can be no ambiguity in software code.

LLMs that manage to generate syntactically and semantically correct texts in natural language, all the more so, excel at code generation.

The code generated by a modern LLM is of high quality. The syntactic constructs typical of the specific programming language are used impeccably and canonically. The implemented design patterns are correct and used in accordance with best practices.

If I ask an LLM to generate software that solves a problem, implements a feature or set of features, whose solution can be provided within a few tens of thousands of lines of code, the result will certainly be excellent. In 99.9% of cases, I will get an elegant and well-implemented solution according to best practices.

Why 99.9% and not 100%?

Because LLMs are actually statistical prediction systems, so, however refined and sophisticated, there is always a non-zero probability that the generative process, which generates token from token, will sooner or later go off on a tangent and generate something that doesn't work. In industry jargon, it's said to have "hallucinated".

Hallucinations happen, they are intrinsic phenomena of this type of technology, they are ineliminable, but this is not the problem. One generation out of 100 or 1,000 doesn't come out well? Never mind, we'll test the software, find that it went wrong, launch a new round and (almost) certainly it will go better.

## The Real Problem: The Context Window

The real problem is another, and arises when we want to generate an entire enterprise-class system, that is, a system capable of going into production in a real business process automation context.

A modern software system is complex and articulated. The technology stack is composed of many different components and must interface with other systems according to different and not always standardized protocols.

A real application is implemented through millions of lines of code. With less than 100,000 lines of code, you cannot implement any complete application that is not a simple service utility.

These code sizes abundantly exceed the so-called "context window" of current LLMs.

The context window of an LLM represents the maximum size of its input.

For an LLM's output to maintain semantic quality and coherence with the initial input, the entire input prompt and all generated output must be within the context window.

When we interact with an LLM in the typical dialogue or chat, we actually cause the model to be invoked iteratively.

With each new prompt, the entire list of messages exchanged up to that point is fed into the LLM, i.e., all our prompts, plus all the texts generated in response, plus a series of texts we don't see, like the system prompt defined by the model provider.

GPT-5's context window is about 400,000 tokens, roughly 350,000 words. Anthropic's models generally have an even smaller window, 200,000 tokens, about 160,000 words.

A real software system is not easily describable with functional specifications in a few hundred thousand words, let alone if with each new prompt we also have to add all the code generated by the LLM in response to the first prompts. Hundreds of thousands of words followed by at least half a million code instructions have no chance of all fitting together in a single context window.

This means that to do vibe coding we will necessarily have to make the LLM work on limited portions of the entire context.

But if the LLM doesn't have the entire code base as input, it is no longer able to guarantee a correct and globally coherent response.

## The Failure of Vibe Coding

If we put a domain expert, without the support of a software developer who knows the programming language, to give instructions to an LLM-based ChatBot, as the session progresses, we will get portions, modules, of code, locally coherent and correct but globally uncorrelated with each other. In a short time, the integration of the different software components, generated in work sessions that only partially share each other's context, will start to give errors and show signs of incompatibility.

Debugging and correction requests will generate other portions of software that will fix some malfunctions while generating new ones.

In the end, the final result will be a ramshackle collection of components, often over-engineered, impossible to review and correct even by a team of expert developers.

The now rare, die-hard supporters of vibe coding are convinced it's just a matter of time. We all agree, it's a problem of limits in current context windows, but as soon as we have LLMs with context windows of 20-30 million tokens, the problem will be solved and vibe coding will become reality.

Unfortunately, in the words of Gary Marcus, deep learning and its hyper-scaling trend have hit a wall. The technology seems to have reached its limit, continuing to enlarge the already large Large Language Models no longer brings improvements, in fact, in some cases they get worse. Perhaps we will never have LLMs with such large context windows, they wouldn't work.

## Pair Programming: A Limited Use

For this reason, the typical and most frequent use case for LLMs in coding remains the mode called *pair programming*.

The LLM is used as an assistant to the work of a software developer. The programmer writes their code, assisted by an LLM that completes the code by suggesting the implementation of individual modules and analyzing the written code looking for errors or inconsistencies.

This is very little compared to the myth of code generated automatically and entirely by AI.

Personally, I don't even believe that *pair programming* really reduces development time. As a former hacker from the '90s, I never found it comfortable to use the IDE and mouse, accustomed to the stratospheric speed of *vi*, and I think that having an editor that while you're writing makes new lines of code appear in gray, unexpectedly moving the already written code up and down, has more or less the same effect as when you're driving at night on a mountain road and your passenger suddenly turns on their phone's flashlight to look for something they put on the seat.

But let's not digress and return to the miracle of Claude Code.

## Claude Code: Not Vibe Coding, but Software Engineering

If Claude Code is not vibe coding stuff, then what is it?

Claude Code is a software agent, based on Anthropic's LLMs, capable of working autonomously for very long times, tens of minutes, theoretically even several hours, capable of managing a real, complex code base, with dimensions even of several million lines of code.

But it's not a vibe coding tool.

Claude Code is a tool that replaces an entire team of programmers and manages to replace an entire team of programmers because it is a masterpiece of *agent engineering* created by software engineers who are clearly among the best software engineers on this planet, and it is a product intended for software engineers like them, but also less skilled than them.

The difference with vibe coding tools is all here, in this positioning.

A tool that promises vibe coding positions itself as a substitute for a software engineer. The user of the hypothetical vibe coding tool is the end user, or at least a *power user*, a user capable of doing *demand management* but always a user without operational software engineering skills.

The user of Claude Code, on the contrary, is precisely the software engineer. Claude Code in the hands of an end user is practically useless, it would end up being simply a ChatBot capable of generating the usual *slope content*, software included, of all existing AI ChatBots.

## How Does Claude Code Manage Large Codebases?

But how does Claude Code generate entire *code bases* of hundreds of thousands, if not millions, of lines of code, coherent, working, and high-quality, using models with 200,000 token *context windows*?

It does so by emulating, in the ways that LLMs emulate human intellectual work, the work of a team of developers.

In the organization of enterprise-class software projects, no programmer keeps the entire codebase in mind.

In a real team, developers have different experiences, different opinions on the best way to write software, differentiated skills and often limited to their own set of design patterns that they use repetitively in their work.

When several years ago I led large software projects, opening a source code file I would recognize the programmer who had created it simply by the style and solutions used.

If every programmer tends to produce code according to potentially different patterns, how can a complex project converge into a perfectly working system?

## The Role of Software Engineering

The secret lies in the capabilities of its team leaders, that is, the software engineers who oversee the project.

The natural entropy characteristic of development teams is contained and brought back to a productive flow through the preventive design of architectural frameworks, the choice of design patterns, technology stack, general project standards, and coding standards.

During the execution phase, constant project management activity is conducted, the process is constantly brought back within established boundaries.

The software is tested by specialized personnel not involved in development, the software undergoes code review sessions, any deviation from standards is corrected by refactoring the code.

Well, having available a sophisticated AI agent, capable of performing code generation sessions that do not exceed the context window of an LLM, capable of producing quality code by accessing up-to-date documentation on development frameworks and libraries, always correctly managing the context window, paraphrasing the title of the paper that started the LLM revolution, we can say that "all you need is software engineering".

## Claude Code as a Virtual Development Team

Considering that every time we start a new work session, practically a new chat, with an agent like Claude Code it's as if we had a different human developer in front of us, we can ask it to implement a specific module or make a specific change, specifying the architectural frameworks and implementation policies to follow to stay within the project boundaries and overall system coherence.

Just as a real developer will perform the assigned task, producing code that doesn't always work (after all, they're a human being) but nonetheless improvable, the session of a well-made AI agent will also generate code that doesn't always work, imperfect (after all, it's a statistical system) but improvable.

It will be the task of project management and the overall project organization to mitigate the effects of imperfection, this time no longer human (but what difference does it make?), through code review sessions, unit tests, and integration tests.

And here's the beauty: an AI agent is capable of performing code reviews and automating testing activities, and therefore, once again, all that's needed is a good software engineer with project leading capabilities.

Instead of organizing and orchestrating a team of human developers, testers, and reviewers, we can plan, organize the work, and orchestrate multiple execution sessions of a good AI agent.

## Claude Code 2.0: A Software Engineering Infrastructure

Here we come to the final point.

What exactly is Claude Code release 2? And, above all, in what way is it superior to other agentic products like GitHub's Copilot, Cursor AI, and Replit?

The power of Claude Code release 2 goes beyond being simply the best coding agent around; its power, in fact, consists of being a true software engineering infrastructure.

Claude Code is built on the model that determined the success and superiority of the Unix operating system: the craftsman's workbench.

Claude Code is an infrastructure, built around a backbone boasting the best LLMs on the market, composed of a multiplicity of specialized and well-designed tools. Each tool does one thing, but does it completely, effectively, and efficiently.

Software engineers can organize and configure their own projects, defining standards, methodologies, practices.

The project can be organized in cycles and phases: design, planning, execution, review, testing, deployment.

For each phase, parallel sessions can be launched. In an initial phase, we can use Claude Code to do research and analysis on specification documents, user requirements, on the Internet to acquire information and analyze market and competitor products. We can ask Claude Code to summarize and organize research results into documents, we can ask it to generate alternative project hypotheses.

In separate sessions, we can ask Claude Code to do a critical review of the results produced in brainstorming and market research sessions.

We can create a table of virtual experts and analyze alternative project hypotheses in parallel, obtaining consulting and review, and quickly reach a robust, reliable, and well-considered project plan.

Based on project documentation, we can then launch coding sessions orchestrated according to project management best practices.

Through the numerous tools offered by Claude Code, it's easy to keep the project within its boundaries. The working methodology is absolutely analogous to that employed with traditional development teams.

## Unprecedented Productivity

The productivity difference is abysmal. A Claude Code coding session manages to handle context, staying within the 200k token limits, through refined agent engineering techniques that include offloading information not pertinent to the current task to the file system and subsequent retrieval, managing short and long-term memory, using source file manipulation tools that don't consume context, and launching parallel sub-agents that work with their own context window, with the effect of being able to work for tens and tens of minutes, producing in an hour what a human developer is able to produce in a working day.

## Our Field Experience

Within the Communication and Tertiary Union of CNA Roma, we have been experimenting with the use of Claude Code since its release in Italy in early 2025, introducing it in specific contexts in ICT companies affiliated with Rome's Digital Innovation Hub.

Starting in June 2025, well before the release of version 2 that sanctioned its superiority over conventional coding agents, we managed to define best practices for its use, anticipating many automations and facilities that were subsequently incorporated as plugins in the current version, achieving full and total automation of coding activities.

Our associates, pioneers in the use of this type of agentic framework, are releasing these days their first software products, entirely created by Claude Code with pure supervision and software engineering activity.

The first effects on company organization have involved the requalification of many developers and their relocation to higher-level professional positions.

From my privileged vantage point, I feel confident in stating that the new era of software development has just begun.
