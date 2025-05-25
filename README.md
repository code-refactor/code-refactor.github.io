# Refactoring Codebases through Library Design
This repo includes the official implementation of the **Librarian** method introduced in the paper `Refactoring Code through Library Design`, specifically applied to the CodeContests dataset.

[Žiga Kovačič](https://zzigak.github.io/)\* $^{1}$, [Justin T Chiu](https://justinchiu.netlify.app/)\* $^{2}$, [Celine Lee](https://celine-lee.github.io/)\* $^{1}$, [Wenting Zhao](https://wenting-zhao.github.io/) $^1$, [Kevin Ellis](https://www.cs.cornell.edu/~ellisk/) $^1$.<br>

$^1$ Cornell University, $^2$ Cohere


**Abstract:**
Maintainable and general software allows developers to build robust applications efficiently, yet achieving these qualities often requires refactoring specialized solutions into reusable components. This challenge becomes particularly relevant as code agents become increasingly accurate at solving isolated programming problems. We investigate code agents’ capacity to refactor code in ways supporting growth and reusability. We present both a method and a benchmark for refactoring: LIBRARIAN, a sample-and-rerank method for generating reusable libraries, and MINICODE, a benchmark where code agents must “minimize” and refactor multiple independent solutions into a joint library. Compared to state-of-the-art code agents, LIBRARIAN achieves strong results on both compression and correctness on MINICODE, obtaining compression rates 1.6-2x than coding agents while also improving correctness.
