---
title: 'Versioning is a solved problem. Stop doing it by hand!'
description: "release-please is a must-have for every project I start. This is how I set up my projects and repositories so my versioning is always an accurate reflection of the current application state."
date: '2026-11-13'
tags: ['dx', 'agentic development', 'release-please', 'versioning']
---

When I was building [PrintLyrics](https://printlyrics.app), I wanted a version number displayed at the bottom of the page. For the most part, this was a sanity check for myself to ensure that my deployments were making it to production. It got me thinking: how do people do this? They *might* have a version file, and the chances of that version being updated consistently and accurately reflecting the state of the application are quite low. When it's time to create a new release, they look at the commit history, make an educated guess about which part of the [semantic version](https://semver.org/) to bump, then create a tag and release based on that number. I'm here to make a proclamation: you don't have to do this manually!

I talked to a whole bunch of people this past week at [SF Ruby Conference](https://sfruby.com/), and I was surprised to hear that nobody else had even heard of [release-please](https://github.com/googleapis/release-please). Here's how I use it in my projects. I use Rails, but this tool works across frameworks and project types. It works everywhere.

### At a high level, the steps are simple

1. [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) are the input—specifically, PR titles. I'll get to that.
2. `release-please` reads the history of my `main` branch.
3. A release PR is generated or updated based on that history.
4. A tag and release are created when that release PR is merged.

In the age of development with AI agents, how do we ensure they commit consistently? There are two main components to making this work effectively.

### Bootstrapping the repository

Here's a [bootstrap template](https://gist.github.com/body-clock/5818611fc6a040f488c7087518f9a53b) that you can send your agent. It does the following:

1. Turns on squash-only merges, so every PR hits `main` as a single commit.
2. Sets the squash commit title to the PR title, so a Conventional Commit title becomes the commit message that `release-please` will read.
3. Requires every PR targeting `main` to pass the checks and policy status checks.
4. Blocks force pushes and deletion of `main`.
5. Locks `v*` release tags so they can't be changed or deleted.
6. Requires all review threads to be resolved before merging.
7. Shows exactly what it will change before changing anything. Nothing happens without `--apply`.

I've made some opinionated choices in this script based on my workflows. It's a starting point, so adapt it to your workflow.

### Tell your agent how to commit

If you explicitly tell your agent how to write commits and title PRs, you give it clear guidance for passing the policy check. I do this with two simple components:

1. A [docs/git_conventions.md](https://gist.github.com/body-clock/dfeadbc2bfde6fbefb2d2f62b6b59eb5) file that outlines general Git practices. Again, this is a template—adjust it to your workflow.
2. A [very simple AGENTS file](https://www.philschmid.de/writing-good-agents) that tells your agent to look at those Git conventions when performing Git operations.

### Working on a team

I've found these patterns and practices to be particularly useful when working on a team. The policy checks and repository settings enforce the guidelines. The documentation is referenced from `AGENTS.md` using a progressive disclosure strategy, so agents that follow `AGENTS.md` can find the relevant guidance when they need it. If you're using Claude, do the same with your `CLAUDE.md`.
