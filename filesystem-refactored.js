// MiniCode CodeContests Cluster0 Filesystem Explorer
class FileSystemExplorer {
    constructor() {
        this.filesystem = {
            "INSTRUCTIONS.md": `# Instructions for Code Compression Task

This document provides instructions for agents to complete the code compression benchmark task.

## Objective

Your task is to minimize the total amount of code needed to solve all problems by:
1. Identifying common patterns across solutions
2. Creating a shared library of reusable components
3. Refactoring EVERY problem solution to use this library

## Rules and Constraints
You are free to use any bash commands to navigate the repo, such as grep or find.
You are allowed to edit \`library.py\`, to be used in \`{problem}/main.py\`.
However, those are the only files you can edit.

IMPORTANT:
- The import path is taken care of for you while running tests via \`bash {problem}/run.sh\`.
- ATTEMPT TO REFACTOR EVERY \`{problem}/main.py\`.

### What You Can Modify
- **Library file (\`library.py\`)**: You can create, modify, or delete any files in this directory.
- **Problem Solutions (\`{problem}/main.py\`)**: You can modify the main.py file in each problem directory to utilize your library. Note that the initial solutions may be incorrect and not pass all tests.

### What You Cannot Modify
- **Problem Descriptions (\`{problem}/PROBLEM.md\`)**: These files describe the problems and must not be changed.
- **Test Files (\`{problem}/tests/\`)**: All test files are considered ground truth and must not be modified.
- **Test Scripts (\`{problem}/run.sh\`)**: These scripts are used to test solutions and must not be changed.
- **Problem Tags (\`{problem}/tags.txt\`)**: These files contain problem categorization and must not be changed.`,

            "PLAN.md": `# Code Compression Plan for Cluster0

## Analysis Summary

**Total Problems:** 30
**Major Categories:**
- Graphs: 12 problems
- Trees + DFS: 8 problems  
- Greedy: 8 problems
- DFS: 7 problems
- Data Structures: 5 problems

## Library Design Strategy

### Core Modules

#### 1. Input/Output Utilities (\`IO\`)
- Fast input setup for competitive programming
- Common input parsing patterns (edges, arrays, etc.)
- Output formatting utilities

#### 2. Graph & Tree Infrastructure (\`GRAPH\`)
- Adjacency list construction from edges
- Graph/tree building with index conversion
- Degree counting and basic properties

#### 3. Tree/Graph Traversal (\`TRAVERSAL\`)
- DFS implementations (recursive & iterative)
- BFS implementations
- Tree property calculations (subtree sizes, depths, etc.)

#### 4. Tree Algorithms (\`TREE_ALGO\`)
- Tree diameter calculation
- Tree center finding
- Leaf identification
- Parent-child relationship handling

#### 5. System Setup (\`SETUP\`)
- Recursion limit configuration
- Threading setup for deep recursion
- Performance optimizations`,

            "library.py": `"""
Library file for collection 0.
This contains shared code that can be imported by problems in this cluster.
"""

import sys
import threading
from collections import defaultdict, deque


# ============================================================================
# SYSTEM SETUP
# ============================================================================

def setup_fast_io():
    sys.stdin = sys.stdin
    input = sys.stdin.readline
    return input

def setup_recursion(limit=300000, stack_size=10**8):
    sys.setrecursionlimit(limit)
    threading.stack_size(stack_size)

def setup_performance():
    setup_recursion()
    return setup_fast_io()


# ============================================================================
# INPUT/OUTPUT UTILITIES  
# ============================================================================

def read_ints():
    return map(int, input().split())

def read_int():
    return int(input())

def read_edges(m, zero_indexed=False):
    edges = []
    for _ in range(m):
        u, v = map(int, input().split())
        if not zero_indexed:
            u -= 1
            v -= 1
        edges.append((u, v))
    return edges

def read_tree_edges(n, zero_indexed=False):
    return read_edges(n - 1, zero_indexed)


# ============================================================================
# GRAPH CONSTRUCTION
# ============================================================================

def build_graph(n, edges, directed=False):
    g = [[] for _ in range(n)]
    for u, v in edges:
        g[u].append(v)
        if not directed:
            g[v].append(u)
    return g

def build_graph_from_input(n, m, zero_indexed=False, directed=False):
    edges = read_edges(m, zero_indexed)
    return build_graph(n, edges, directed)

def build_tree_from_input(n, zero_indexed=False):
    edges = read_tree_edges(n, zero_indexed)
    return build_graph(n, edges, directed=False)


# ============================================================================
# GRAPH PROPERTIES
# ============================================================================

def count_degrees(graph):
    return [len(neighbors) for neighbors in graph]

def find_leaves(graph):
    return [i for i, neighbors in enumerate(graph) if len(neighbors) == 1]

def graph_size(graph):
    return len(graph)


# ============================================================================
# TREE/GRAPH TRAVERSAL
# ============================================================================

def dfs_recursive(graph, start, visited=None, callback=None):
    if visited is None:
        visited = [False] * len(graph)
    
    visited[start] = True
    if callback:
        callback(start)
    
    for neighbor in graph[start]:
        if not visited[neighbor]:
            dfs_recursive(graph, neighbor, visited, callback)
    
    return visited

def dfs_iterative(graph, start, callback=None):
    visited = [False] * len(graph)
    stack = [start]
    visited[start] = True
    
    while stack:
        node = stack.pop()
        if callback:
            callback(node)
        
        for neighbor in graph[node]:
            if not visited[neighbor]:
                visited[neighbor] = True
                stack.append(neighbor)
    
    return visited

def bfs(graph, start, callback=None):
    visited = [False] * len(graph)
    queue = deque([start])
    visited[start] = True
    
    while queue:
        node = queue.popleft()
        if callback:
            callback(node)
        
        for neighbor in graph[node]:
            if not visited[neighbor]:
                visited[neighbor] = True
                queue.append(neighbor)
    
    return visited`,

            "580_c_kefa_and_park_5570/": {
                "PROBLEM.md": `# 580_C. Kefa and Park

**ID:** 580_c_kefa_and_park_5570
**Difficulty:** 9

## Description

Kefa decided to celebrate his first big salary by going to the restaurant. 

He lives by an unusual park. The park is a rooted tree consisting of n vertices with the root at vertex 1. Vertex 1 also contains Kefa's house. Unfortunaely for our hero, the park also contains cats. Kefa has already found out what are the vertices with cats in them.

The leaf vertices of the park contain restaurants. Kefa wants to choose a restaurant where he will go, but unfortunately he is very afraid of cats, so there is no way he will go to the restaurant if the path from the restaurant to his house contains more than m consecutive vertices with cats. 

Your task is to help Kefa count the number of restaurants where he can go.

## Categories

- dfs and similar
- graphs
- trees`,
                "main.py": `#!/usr/bin/env python3

from library import read_ints, build_tree_from_input

n, m = read_ints()
cats = list(read_ints())
graph = build_tree_from_input(n)

def count_reachable_restaurants():
    result = 0
    
    def dfs(node, parent, consecutive_cats):
        nonlocal result
        
        if cats[node]:
            consecutive_cats += 1
            if consecutive_cats > m:
                return
        else:
            consecutive_cats = 0
        
        is_leaf = True
        for neighbor in graph[node]:
            if neighbor != parent:
                is_leaf = False
                dfs(neighbor, node, consecutive_cats)
        
        if is_leaf and node != 0:
            result += 1
    
    dfs(0, -1, 0)
    return result

print(count_reachable_restaurants())`,
                "run.sh": `#!/bin/bash
# Test script for 580_c_kefa_and_park_5570

# Get the absolute path to the problem directory
PROBLEM_DIR="\$(cd "\$(dirname "\\\${BASH_SOURCE[0]}")" && pwd)"
CLUSTER_DIR="\$(cd "\\\$PROBLEM_DIR/.." && pwd)"

# Import paths - include both repo root and cluster directory
# This allows importing from problems/cluster{i}/library.py with: from library import *
export PYTHONPATH="\\\$CLUSTER_DIR:\\\$PYTHONPATH"

# Default to main.py if no specific file is provided
SOLUTION_FILE=\\\${1:-"\\\$PROBLEM_DIR/main.py"}

# Function to run a test case
run_test() {
    local test_num=\$1
    local input_file="\$PROBLEM_DIR/tests/input_\${test_num}.txt"
    local expected_file="\$PROBLEM_DIR/tests/output_\${test_num}.txt"

    if [ ! -f "\$input_file" ]; then
        echo "Test #\$test_num: Input file not found!"
        return 1
    fi

    if [ ! -f "\$expected_file" ]; then
        echo "Test #\$test_num: Expected output file not found!"
        return 1
    fi

    echo "Running test #\$test_num..."

    # Run the solution with the test input using python
    OUTPUT=\$(python "\$SOLUTION_FILE" < "\$input_file")
    EXIT_CODE=\$?

    if [ \$EXIT_CODE -ne 0 ]; then
        echo "Test #\$test_num: Error running solution! Exit code: \$EXIT_CODE"
        return 1
    fi

    # Read expected output
    EXPECTED=\$(cat "\$expected_file")

    # Compare outputs (ignoring trailing whitespace)
    if [ "\$(echo "\$OUTPUT" | sed -e 's/[ \\t]*\$//')" = "\$(echo "\$EXPECTED" | sed -e 's/[ \\t]*\$//')" ]; then
        echo "Test #\$test_num: PASSED ✅"
        return 0
    else
        echo "Test #\$test_num: FAILED ❌"
        echo "Expected:"
        echo "\$EXPECTED"
        echo "Got:"
        echo "\$OUTPUT"
        return 1
    fi
}

# Count test files
NUM_TESTS=\$(ls "\$PROBLEM_DIR/tests/input_"*.txt 2>/dev/null | wc -l)

if [ \$NUM_TESTS -eq 0 ]; then
    echo "No test cases found!"
    exit 1
fi

# Run all tests
PASSED=0
TOTAL=\$NUM_TESTS

for ((i=1; i<=\$NUM_TESTS; i++)); do
    if run_test \$i; then
        PASSED=\$((PASSED+1))
    fi
done

echo "Results: \$PASSED/\$TOTAL tests passed"
echo "\$PASSED/\$TOTAL" > \$PROBLEM_DIR/results.txt

if [ \$PASSED -eq \$TOTAL ]; then
    exit 0
else
    exit 1
fi`,
                "tags.txt": "dfs and similar\\ngraphs\\ntrees",
                "tests/": {
                    "input_1.txt": "7 1\\n1 0 1 1 0 0 0\\n1 2\\n1 3\\n2 4\\n2 5\\n3 6\\n3 7",
                    "output_1.txt": "2",
                    "input_2.txt": "4 1\\n1 1 0 0\\n1 2\\n1 3\\n1 4",
                    "output_2.txt": "2",
                    "input_3.txt": "5 2\\n1 1 0 1 1\\n1 2\\n2 3\\n3 4\\n4 5",
                    "output_3.txt": "1"
                }
            },

            "116_c_party_7303/": {
                "PROBLEM.md": `# 116_C. Party

**ID:** 116_c_party_7303
**Difficulty:** 9

## Description

A company has n employees numbered from 1 to n. Each employee either has no immediate manager or exactly one immediate manager, who is another employee with a different number. An employee A is said to be the superior of another employee B if at least one of the following is true:

  * Employee A is the immediate manager of employee B
  * Employee B has an immediate manager employee C such that employee A is the superior of employee C. 

The company will not have a managerial cycle. That is, there will not exist an employee who is the superior of his/her own immediate manager.

Today the company is going to arrange a party. This involves dividing all n employees into several groups: every employee must belong to exactly one group. Furthermore, within any single group, there must not be two employees A and B such that A is the superior of B.

What is the minimum number of groups that must be formed?

## Categories

- dfs and similar
- graphs
- trees`,
                "main.py": `#!/usr/bin/env python3

from library import read_int, calculate_depths

n = read_int()
children = [[] for _ in range(n)]
roots = []

for i in range(n):
    x = read_int()
    if x > 0:
        children[x-1].append(i)
    else:
        roots.append(i)

max_depth = 0
for root in roots:
    depths = calculate_depths(children, root)
    max_depth = max(max_depth, max(depths) + 1)

print(max_depth)`,
                "run.sh": `#!/bin/bash
# Test script for 116_c_party_7303

# Get the absolute path to the problem directory
PROBLEM_DIR="\$(cd "\$(dirname "\\\${BASH_SOURCE[0]}")" && pwd)"
CLUSTER_DIR="\$(cd "\\\$PROBLEM_DIR/.." && pwd)"

# Import paths - include both repo root and cluster directory
# This allows importing from problems/cluster{i}/library.py with: from library import *
export PYTHONPATH="\\\$CLUSTER_DIR:\\\$PYTHONPATH"

# Default to main.py if no specific file is provided
SOLUTION_FILE=\\\${1:-"\\\$PROBLEM_DIR/main.py"}

# Function to run a test case
run_test() {
    local test_num=\$1
    local input_file="\$PROBLEM_DIR/tests/input_\${test_num}.txt"
    local expected_file="\$PROBLEM_DIR/tests/output_\${test_num}.txt"

    if [ ! -f "\$input_file" ]; then
        echo "Test #\$test_num: Input file not found!"
        return 1
    fi

    if [ ! -f "\$expected_file" ]; then
        echo "Test #\$test_num: Expected output file not found!"
        return 1
    fi

    echo "Running test #\$test_num..."

    # Run the solution with the test input using python
    OUTPUT=\$(python "\$SOLUTION_FILE" < "\$input_file")
    EXIT_CODE=\$?

    if [ \$EXIT_CODE -ne 0 ]; then
        echo "Test #\$test_num: Error running solution! Exit code: \$EXIT_CODE"
        return 1
    fi

    # Read expected output
    EXPECTED=\$(cat "\$expected_file")

    # Compare outputs (ignoring trailing whitespace)
    if [ "\$(echo "\$OUTPUT" | sed -e 's/[ \\t]*\$//')" = "\$(echo "\$EXPECTED" | sed -e 's/[ \\t]*\$//')" ]; then
        echo "Test #\$test_num: PASSED ✅"
        return 0
    else
        echo "Test #\$test_num: FAILED ❌"
        echo "Expected:"
        echo "\$EXPECTED"
        echo "Got:"
        echo "\$OUTPUT"
        return 1
    fi
}

# Count test files
NUM_TESTS=\$(ls "\$PROBLEM_DIR/tests/input_"*.txt 2>/dev/null | wc -l)

if [ \$NUM_TESTS -eq 0 ]; then
    echo "No test cases found!"
    exit 1
fi

# Run all tests
PASSED=0
TOTAL=\$NUM_TESTS

for ((i=1; i<=\$NUM_TESTS; i++)); do
    if run_test \$i; then
        PASSED=\$((PASSED+1))
    fi
done

echo "Results: \$PASSED/\$TOTAL tests passed"
echo "\$PASSED/\$TOTAL" > \$PROBLEM_DIR/results.txt

if [ \$PASSED -eq \$TOTAL ]; then
    exit 0
else
    exit 1
fi`,
                "tags.txt": "dfs and similar\\ngraphs\\ntrees",
                "tests/": {
                    "input_1.txt": "5\\n-1\\n1\\n2\\n1\\n-1",
                    "output_1.txt": "3",
                    "input_2.txt": "3\\n-1\\n1\\n1",
                    "output_2.txt": "2"
                }
            },

            "292_b_network_topology_9930/": {
                "PROBLEM.md": `# 292_B. Network Topology

**ID:** 292_b_network_topology_9930
**Difficulty:** 8

## Description

This problem uses a simplified network topology model, please read the problem statement carefully and use it as a formal document as you develop the solution.

Polycarpus continues working as a system administrator in a large corporation. The computer network of this corporation consists of n computers, some of them are connected by a cable. The computers are indexed by integers from 1 to n. It's known that any two computers connected by cable directly or through other computers

Polycarpus decided to find out the network's topology. A network topology is the way of describing the network configuration, the scheme that shows the location and the connections of network devices.

Polycarpus knows three main network topologies: bus, ring and star. A bus is the topology that represents a shared cable with all computers connected with it. In the ring topology the cable connects each computer only with two other ones. A star is the topology where all computers of a network are connected to the single central node.

## Categories

- graphs
- implementation`,
                "main.py": `#!/usr/bin/env python3

from library import read_ints

n, m = read_ints()
degrees = [0] * (n + 1)

for _ in range(m):
    a, b = read_ints()
    degrees[a] += 1
    degrees[b] += 1

count_1 = sum(1 for i in range(1, n+1) if degrees[i] == 1)
count_2 = sum(1 for i in range(1, n+1) if degrees[i] == 2)
count_star = sum(1 for i in range(1, n+1) if degrees[i] == n-1)

if count_1 == 2 and count_2 == n-2:
    print("bus topology")
elif count_2 == n:
    print("ring topology")
elif count_1 == n-1 and count_star == 1:
    print("star topology")
else:
    print("unknown topology")`,
                "run.sh": `#!/bin/bash
# Test script for 292_b_network_topology_9930

# Get the absolute path to the problem directory
PROBLEM_DIR="\$(cd "\$(dirname "\\\${BASH_SOURCE[0]}")" && pwd)"
CLUSTER_DIR="\$(cd "\\\$PROBLEM_DIR/.." && pwd)"

# Import paths - include both repo root and cluster directory
export PYTHONPATH="\\\$CLUSTER_DIR:\\\$PYTHONPATH"

# Default to main.py if no specific file is provided
SOLUTION_FILE=\\\${1:-"\\\$PROBLEM_DIR/main.py"}

# Function to run a test case
run_test() {
    local test_num=\$1
    local input_file="\$PROBLEM_DIR/tests/input_\${test_num}.txt"
    local expected_file="\$PROBLEM_DIR/tests/output_\${test_num}.txt"

    if [ ! -f "\$input_file" ]; then
        echo "Test #\$test_num: Input file not found!"
        return 1
    fi

    if [ ! -f "\$expected_file" ]; then
        echo "Test #\$test_num: Expected output file not found!"
        return 1
    fi

    echo "Running test #\$test_num..."

    # Run the solution with the test input using python
    OUTPUT=\$(python "\$SOLUTION_FILE" < "\$input_file")
    EXIT_CODE=\$?

    if [ \$EXIT_CODE -ne 0 ]; then
        echo "Test #\$test_num: Error running solution! Exit code: \$EXIT_CODE"
        return 1
    fi

    # Read expected output
    EXPECTED=\$(cat "\$expected_file")

    # Compare outputs (ignoring trailing whitespace)
    if [ "\$(echo "\$OUTPUT" | sed -e 's/[ \\t]*\$//')" = "\$(echo "\$EXPECTED" | sed -e 's/[ \\t]*\$//')" ]; then
        echo "Test #\$test_num: PASSED ✅"
        return 0
    else
        echo "Test #\$test_num: FAILED ❌"
        echo "Expected:"
        echo "\$EXPECTED"
        echo "Got:"
        echo "\$OUTPUT"
        return 1
    fi
}

# Count test files
NUM_TESTS=\$(ls "\$PROBLEM_DIR/tests/input_"*.txt 2>/dev/null | wc -l)

if [ \$NUM_TESTS -eq 0 ]; then
    echo "No test cases found!"
    exit 1
fi

# Run all tests
PASSED=0
TOTAL=\$NUM_TESTS

for ((i=1; i<=\$NUM_TESTS; i++)); do
    if run_test \$i; then
        PASSED=\$((PASSED+1))
    fi
done

echo "Results: \$PASSED/\$TOTAL tests passed"
echo "\$PASSED/\$TOTAL" > \$PROBLEM_DIR/results.txt

if [ \$PASSED -eq \$TOTAL ]; then
    exit 0
else
    exit 1
fi`,
                "tags.txt": "graphs\\nimplementation",
                "tests/": {
                    "input_1.txt": "4 3\\n1 2\\n2 3\\n3 4",
                    "output_1.txt": "bus topology",
                    "input_2.txt": "4 4\\n1 2\\n2 3\\n3 4\\n4 1",
                    "output_2.txt": "ring topology",
                    "input_3.txt": "4 3\\n1 2\\n1 3\\n1 4",
                    "output_3.txt": "star topology"
                }
            },

            "913_b_christmas_spruce_7977/": {
                "PROBLEM.md": `# 913_B. Christmas Spruce

**ID:** 913_b_christmas_spruce_7977
**Difficulty:** 8

## Description

Consider a rooted tree. A rooted tree has one special vertex called the root. All edges are directed from the root. Vertex u is called a child of vertex v and vertex v is called a parent of vertex u if there exists a directed edge from v to u. A vertex is called a leaf if it doesn't have children and has a parent.

Let's call a rooted tree a spruce if its every non-leaf vertex has at least 3 leaf children. You are given a rooted tree, check whether it's a spruce.

## Categories

- implementation
- trees`,
                "main.py": `#!/usr/bin/env python3

from library import read_int

if __name__ == '__main__':
    n = read_int()
    children = [[] for _ in range(n + 1)]
    
    for i in range(2, n + 1):
        parent = read_int()
        children[parent].append(i)
    
    def count_direct_leaf_children(node):
        leaf_count = 0
        for child in children[node]:
            if not children[child]:
                leaf_count += 1
        return leaf_count
    
    def is_spruce():
        for node in range(1, n + 1):
            if children[node]:
                if count_direct_leaf_children(node) < 3:
                    return False
        return True
    
    print("Yes" if is_spruce() else "No")`,
                "run.sh": `#!/bin/bash
# Test script for 913_b_christmas_spruce_7977

# Get the absolute path to the problem directory
PROBLEM_DIR="\$(cd "\$(dirname "\\\${BASH_SOURCE[0]}")" && pwd)"
CLUSTER_DIR="\$(cd "\\\$PROBLEM_DIR/.." && pwd)"

# Import paths - include both repo root and cluster directory
export PYTHONPATH="\\\$CLUSTER_DIR:\\\$PYTHONPATH"

# Default to main.py if no specific file is provided
SOLUTION_FILE=\\\${1:-"\\\$PROBLEM_DIR/main.py"}

# Function to run a test case
run_test() {
    local test_num=\$1
    local input_file="\$PROBLEM_DIR/tests/input_\${test_num}.txt"
    local expected_file="\$PROBLEM_DIR/tests/output_\${test_num}.txt"

    if [ ! -f "\$input_file" ]; then
        echo "Test #\$test_num: Input file not found!"
        return 1
    fi

    if [ ! -f "\$expected_file" ]; then
        echo "Test #\$test_num: Expected output file not found!"
        return 1
    fi

    echo "Running test #\$test_num..."

    # Run the solution with the test input using python
    OUTPUT=\$(python "\$SOLUTION_FILE" < "\$input_file")
    EXIT_CODE=\$?

    if [ \$EXIT_CODE -ne 0 ]; then
        echo "Test #\$test_num: Error running solution! Exit code: \$EXIT_CODE"
        return 1
    fi

    # Read expected output
    EXPECTED=\$(cat "\$expected_file")

    # Compare outputs (ignoring trailing whitespace)
    if [ "\$(echo "\$OUTPUT" | sed -e 's/[ \\t]*\$//')" = "\$(echo "\$EXPECTED" | sed -e 's/[ \\t]*\$//')" ]; then
        echo "Test #\$test_num: PASSED ✅"
        return 0
    else
        echo "Test #\$test_num: FAILED ❌"
        echo "Expected:"
        echo "\$EXPECTED"
        echo "Got:"
        echo "\$OUTPUT"
        return 1
    fi
}

# Count test files
NUM_TESTS=\$(ls "\$PROBLEM_DIR/tests/input_"*.txt 2>/dev/null | wc -l)

if [ \$NUM_TESTS -eq 0 ]; then
    echo "No test cases found!"
    exit 1
fi

# Run all tests
PASSED=0
TOTAL=\$NUM_TESTS

for ((i=1; i<=\$NUM_TESTS; i++)); do
    if run_test \$i; then
        PASSED=\$((PASSED+1))
    fi
done

echo "Results: \$PASSED/\$TOTAL tests passed"
echo "\$PASSED/\$TOTAL" > \$PROBLEM_DIR/results.txt

if [ \$PASSED -eq \$TOTAL ]; then
    exit 0
else
    exit 1
fi`,
                "tags.txt": "implementation\\ntrees",
                "tests/": {
                    "input_1.txt": "4\\n1\\n1\\n1",
                    "output_1.txt": "Yes",
                    "input_2.txt": "8\\n1\\n1\\n1\\n1\\n3\\n3\\n3",
                    "output_2.txt": "Yes",
                    "input_3.txt": "7\\n1\\n1\\n1\\n2\\n2\\n2",
                    "output_3.txt": "No"
                }
            },

            "982_c_cut_em_all_5275/": {
                "PROBLEM.md": `# 982_C. Cut 'em all!

**ID:** 982_c_cut_em_all_5275
**Difficulty:** 9

## Description

You're given a tree with n vertices.

Your task is to determine the maximum possible number of edges that can be removed in such a way that all the remaining connected components will have even size.

## Categories

- dfs and similar
- dp
- graphs
- greedy
- trees`,
                "main.py": `#!/usr/bin/env python3

from library import setup_performance, read_int, build_tree_from_input

setup_performance()

n = read_int()
if n % 2 != 0:
    print(-1)
else:
    graph = build_tree_from_input(n)
    
    def calculate_children_sizes(node, parent):
        children_sum = 0
        for neighbor in graph[node]:
            if neighbor != parent:
                children_sum += calculate_children_sizes(neighbor, node)
        return children_sum + 1
    
    children_sums = [0] * n
    
    def dfs(node, parent):
        for neighbor in graph[node]:
            if neighbor != parent:
                children_sums[node] += dfs(neighbor, node)
        return children_sums[node] + 1
    
    dfs(0, -1)
    
    result = sum(1 for i in range(1, n) if children_sums[i] % 2 != 0)
    print(result)`,
                "run.sh": `#!/bin/bash
# Test script for 982_c_cut_em_all_5275

# Get the absolute path to the problem directory
PROBLEM_DIR="\$(cd "\$(dirname "\\\${BASH_SOURCE[0]}")" && pwd)"
CLUSTER_DIR="\$(cd "\\\$PROBLEM_DIR/.." && pwd)"

# Import paths - include both repo root and cluster directory
export PYTHONPATH="\\\$CLUSTER_DIR:\\\$PYTHONPATH"

# Default to main.py if no specific file is provided
SOLUTION_FILE=\\\${1:-"\\\$PROBLEM_DIR/main.py"}

# Function to run a test case
run_test() {
    local test_num=\$1
    local input_file="\$PROBLEM_DIR/tests/input_\${test_num}.txt"
    local expected_file="\$PROBLEM_DIR/tests/output_\${test_num}.txt"

    if [ ! -f "\$input_file" ]; then
        echo "Test #\$test_num: Input file not found!"
        return 1
    fi

    if [ ! -f "\$expected_file" ]; then
        echo "Test #\$test_num: Expected output file not found!"
        return 1
    fi

    echo "Running test #\$test_num..."

    # Run the solution with the test input using python
    OUTPUT=\$(python "\$SOLUTION_FILE" < "\$input_file")
    EXIT_CODE=\$?

    if [ \$EXIT_CODE -ne 0 ]; then
        echo "Test #\$test_num: Error running solution! Exit code: \$EXIT_CODE"
        return 1
    fi

    # Read expected output
    EXPECTED=\$(cat "\$expected_file")

    # Compare outputs (ignoring trailing whitespace)
    if [ "\$(echo "\$OUTPUT" | sed -e 's/[ \\t]*\$//')" = "\$(echo "\$EXPECTED" | sed -e 's/[ \\t]*\$//')" ]; then
        echo "Test #\$test_num: PASSED ✅"
        return 0
    else
        echo "Test #\$test_num: FAILED ❌"
        echo "Expected:"
        echo "\$EXPECTED"
        echo "Got:"
        echo "\$OUTPUT"
        return 1
    fi
}

# Count test files
NUM_TESTS=\$(ls "\$PROBLEM_DIR/tests/input_"*.txt 2>/dev/null | wc -l)

if [ \$NUM_TESTS -eq 0 ]; then
    echo "No test cases found!"
    exit 1
fi

# Run all tests
PASSED=0
TOTAL=\$NUM_TESTS

for ((i=1; i<=\$NUM_TESTS; i++)); do
    if run_test \$i; then
        PASSED=\$((PASSED+1))
    fi
done

echo "Results: \$PASSED/\$TOTAL tests passed"
echo "\$PASSED/\$TOTAL" > \$PROBLEM_DIR/results.txt

if [ \$PASSED -eq \$TOTAL ]; then
    exit 0
else
    exit 1
fi`,
                "tags.txt": "dfs and similar\\ndp\\ngraphs\\ngreedy\\ntrees",
                "tests/": {
                    "input_1.txt": "4\\n2 4\\n4 1\\n3 1",
                    "output_1.txt": "1",
                    "input_2.txt": "3\\n1 2\\n1 3",
                    "output_2.txt": "-1",
                    "input_3.txt": "2\\n1 2",
                    "output_3.txt": "0"
                }
            }
        };

        this.currentPath = [];
        this.container = null;
    }

    init(containerId) {
        this.container = document.getElementById(containerId);
        this.render();
    }

    render() {
        if (!this.container) return;

        this.container.innerHTML = `
            <div class="filesystem-explorer">
                <div class="filesystem-header">
                    <h3>🗂️ MiniCode CodeContests Collection (After Refactoring)</h3>
                    <div class="filesystem-path">
                        <span class="path-segment" data-path="">📁 cluster0</span>
                        ${this.currentPath.map((segment, index) => 
                            `<span class="path-separator">/</span>
                             <span class="path-segment" data-path="${this.currentPath.slice(0, index + 1).join('/')}">${segment}</span>`
                        ).join('')}
                    </div>
                </div>
                <div class="filesystem-content">
                    ${this.renderCurrentDirectory()}
                </div>
            </div>
        `;

        this.attachEventListeners();
    }

    renderCurrentDirectory() {
        const current = this.getCurrentDirectory();
        
        if (typeof current === 'string') {
            return `
                <div class="file-content">
                    <div class="file-header">
                        <div class="file-actions">
                            <button class="btn-back" onclick="fsExplorer.navigateBack()">← Back</button>
                        </div>
                    </div>
                    <pre><code class="language-${this.getFileLanguage()}">${this.escapeHtml(current)}</code></pre>
                </div>
            `;
        }

        const entries = Object.entries(current || {});
        const directories = entries.filter(([key, value]) => typeof value === 'object' && !key.includes('.'));
        const files = entries.filter(([key, value]) => typeof value === 'string' || key.includes('.'));

        return `
            <div class="directory-listing">
                ${this.currentPath.length > 0 ? '<div class="directory-item directory-back" onclick="fsExplorer.navigateBack()">📁 ..</div>' : ''}
                ${directories.map(([name, content]) => `
                    <div class="directory-item directory" onclick="fsExplorer.navigate('${name}')">
                        📁 ${name}
                    </div>
                `).join('')}
                ${files.map(([name, content]) => `
                    <div class="directory-item file" onclick="fsExplorer.openFile('${name}')">
                        ${this.getFileIcon(name)} ${name}
                    </div>
                `).join('')}
            </div>
        `;
    }

    getCurrentDirectory() {
        let current = this.filesystem;
        for (const segment of this.currentPath) {
            current = current[segment];
        }
        return current;
    }

    navigate(path) {
        this.currentPath.push(path);
        this.render();
    }

    navigateBack() {
        if (this.currentPath.length > 0) {
            this.currentPath.pop();
            this.render();
        }
    }

    openFile(filename) {
        this.currentPath.push(filename);
        this.render();
    }

    navigateToPath(path) {
        if (path === '') {
            this.currentPath = [];
        } else {
            this.currentPath = path.split('/').filter(p => p);
        }
        this.render();
    }

    getFileIcon(filename) {
        if (filename.endsWith('.py')) return '🐍';
        if (filename.endsWith('.md')) return '📝';
        if (filename.endsWith('.txt')) return '📄';
        if (filename.endsWith('.sh')) return '🔧';
        return '📄';
    }

    getFileLanguage() {
        const filename = this.currentPath[this.currentPath.length - 1];
        if (filename.endsWith('.py')) return 'python';
        if (filename.endsWith('.md')) return 'markdown';
        if (filename.endsWith('.sh')) return 'bash';
        return 'text';
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    attachEventListeners() {
        const pathSegments = this.container.querySelectorAll('.path-segment');
        pathSegments.forEach(segment => {
            segment.addEventListener('click', (e) => {
                const path = e.target.dataset.path;
                this.navigateToPath(path);
            });
        });
    }
}

// Initialize the filesystem explorer
const fsExplorer = new FileSystemExplorer();

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('filesystem-refactored');
    if (container) {
        fsExplorer.init('filesystem-refactored');
    }
});
