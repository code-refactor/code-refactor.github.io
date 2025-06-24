// MiniCode CodeContests Cluster0 Filesystem Explorer - Pre-refactoring State
class FileSystemExplorerBefore {
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

            "library.py": `"""
Library file for cluster0.
This contains shared code that can be imported by problems in this cluster.
"""`,

            "580_c_kefa_and_park_5570": {
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

M=lambda:map(int,input().split())
n,m=M()
*c,=M()
t=[[]for i in range(n)]
v=[0]*n
for i in range(n-1):
    x,y=M()
    t[x-1].append(y-1)
    t[y-1].append(x-1)
a=i=0
q=[(0,0)]
while i<len(q):
    x,N=q[i]
    v[x]=1
    if c[x]+N<=m:
        L=1
        for y in t[x]:
            if not v[y]:
                L=0
                q.append((y,c[x]*(c[x]+N)))
        if L:
            a+=1
    i+=1
print(a)`,
                "run.sh": this.getRunShScript("580_c_kefa_and_park_5570"),
                "tags.txt": "dfs and similar\\ngraphs\\ntrees",
                "tests": {
                    "input_1.txt": "7 1\\n1 0 1 1 0 0 0\\n1 2\\n1 3\\n2 4\\n2 5\\n3 6\\n3 7",
                    "output_1.txt": "2",
                    "input_2.txt": "4 1\\n1 1 0 0\\n1 2\\n1 3\\n1 4",
                    "output_2.txt": "2",
                    "input_3.txt": "5 2\\n1 1 0 1 1\\n1 2\\n2 3\\n3 4\\n4 5",
                    "output_3.txt": "1",
                    "input_4.txt": "6 1\\n1 0 1 1 0 0\\n1 2\\n1 3\\n1 4\\n1 5\\n1 6",
                    "output_4.txt": "3",
                    "input_5.txt": "2 1\\n1 1\\n2 1",
                    "output_5.txt": "0",
                    "input_6.txt": "3 2\\n1 1 1\\n1 2\\n2 3",
                    "output_6.txt": "0",
                    "input_7.txt": "12 3\\n1 0 1 0 1 1 1 1 0 0 0 0\\n6 7\\n12 1\\n9 7\\n1 4\\n10 7\\n7 1\\n11 8\\n5 1\\n3 7\\n5 8\\n4 2",
                    "output_7.txt": "7",
                    "input_8.txt": "15 2\\n1 0 1 0 1 0 0 0 0 0 0 0 0 0 0\\n1 2\\n1 3\\n2 4\\n2 5\\n3 6\\n3 7\\n4 8\\n4 9\\n5 10\\n5 11\\n6 12\\n6 13\\n7 14\\n7 15",
                    "output_8.txt": "8",
                    "input_9.txt": "7 3\\n1 1 1 1 1 0 1\\n1 2\\n1 3\\n2 4\\n3 5\\n5 6\\n6 7",
                    "output_9.txt": "2",
                    "input_10.txt": "6 1\\n1 0 1 1 0 0\\n1 2\\n2 3\\n1 4\\n1 5\\n1 6",
                    "output_10.txt": "3"
                }
            },

            "116_c_party_7303": {
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

def findDepth(a, i):
    depth = 1
    nextLevel = a[i][:]

    while len(nextLevel) > 0:
        depth += 1

        children = nextLevel[:]

        nextLevel = []

        for child in children:
            nextLevel += a[child]

    return depth




n = int(input())


a = []
for i in range(n):
    a.append([])


roots = []

for i in range(n):
    
    x = int(input())

    if x > 0:
        a[x-1].append(i)

    else:
        roots.append(i)


print(max([findDepth(a, i) for i in roots]))`,
                "run.sh": this.getRunShScript("116_c_party_7303"),
                "tags.txt": "dfs and similar\\ngraphs\\ntrees",
                "tests": {
                    "input_1.txt": "5\\n-1\\n1\\n2\\n1\\n-1",
                    "output_1.txt": "3",
                    "input_2.txt": "12\\n-1\\n8\\n9\\n-1\\n4\\n2\\n11\\n1\\n-1\\n6\\n-1\\n10",
                    "output_2.txt": "6",
                    "input_3.txt": "5\\n4\\n5\\n1\\n-1\\n4",
                    "output_3.txt": "3",
                    "input_4.txt": "12\\n-1\\n9\\n11\\n6\\n6\\n-1\\n6\\n3\\n8\\n6\\n1\\n6",
                    "output_4.txt": "6",
                    "input_5.txt": "4\\n-1\\n1\\n2\\n3",
                    "output_5.txt": "4",
                    "input_6.txt": "12\\n3\\n8\\n9\\n12\\n2\\n8\\n11\\n12\\n2\\n9\\n-1\\n11",
                    "output_6.txt": "7",
                    "input_7.txt": "5\\n2\\n3\\n4\\n5\\n-1",
                    "output_7.txt": "5",
                    "input_8.txt": "12\\n-1\\n-1\\n-1\\n-1\\n-1\\n-1\\n-1\\n-1\\n-1\\n-1\\n-1\\n-1",
                    "output_8.txt": "1",
                    "input_9.txt": "12\\n-1\\n1\\n1\\n1\\n1\\n1\\n3\\n4\\n3\\n3\\n4\\n7",
                    "output_9.txt": "4",
                    "input_10.txt": "3\\n-1\\n1\\n1",
                    "output_10.txt": "2"
                }
            },

            "292_b_network_topology_9930": {
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

n,m=map(int,input().split())
arr=[0]*(n+1)
for w in range(m):
    a,b=map(int,input().split())
    arr[a]+=1
    arr[b]+=1
c1=0
c2=0
cs=0
for i in range(1,n+1):
    if arr[i]==1:
        c1+=1
    if arr[i]==2:
        c2+=1
    if arr[i]==n-1:
        cs+=1
if c1==2 and c2==n-2:
    print("bus topology")
elif c2==n:
    print("ring topology")
elif c1==n-1 and cs==1:
    print("star topology")
else:
    print("unknown topology")`,
                "run.sh": this.getRunShScript("292_b_network_topology_9930"),
                "tags.txt": "graphs\\nimplementation",
                "tests": {
                    "input_1.txt": "4 3\\n1 2\\n2 3\\n3 4",
                    "output_1.txt": "bus topology",
                    "input_2.txt": "4 4\\n1 2\\n2 3\\n3 4\\n4 1",
                    "output_2.txt": "ring topology",
                    "input_3.txt": "4 4\\n1 2\\n2 3\\n3 1\\n1 4",
                    "output_3.txt": "unknown topology",
                    "input_4.txt": "4 3\\n1 2\\n1 3\\n1 4",
                    "output_4.txt": "star topology",
                    "input_5.txt": "4 4\\n1 2\\n2 3\\n3 4\\n4 2",
                    "output_5.txt": "unknown topology",
                    "input_6.txt": "10 9\\n10 6\\n3 4\\n8 9\\n8 4\\n6 1\\n2 9\\n5 1\\n7 5\\n10 3",
                    "output_6.txt": "bus topology",
                    "input_7.txt": "10 14\\n3 2\\n7 2\\n6 4\\n8 1\\n3 9\\n5 6\\n6 3\\n4 1\\n2 5\\n7 10\\n9 5\\n7 1\\n8 10\\n3 4",
                    "output_7.txt": "unknown topology",
                    "input_8.txt": "6 6\\n1 2\\n2 3\\n3 1\\n4 5\\n5 6\\n6 1",
                    "output_8.txt": "unknown topology",
                    "input_9.txt": "4 3\\n2 4\\n1 3\\n4 1",
                    "output_9.txt": "bus topology",
                    "input_10.txt": "5 4\\n4 2\\n5 2\\n1 2\\n2 3",
                    "output_10.txt": "star topology"
                }
            },

            "913_b_christmas_spruce_7977": {
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

if __name__ == '__main__':
    n = int(input())
    nonleaf = [0 for i in range(1010)]
    child = [[] for i in range(1010)]
    leaf = [0 for i in range(1010)]

    def dfs(s):
        cnt = 0
        for chd in child[s]:
            cnt += dfs(chd)
        leaf[s] = cnt
        return 1 - nonleaf[s]

    for i in range(2, n + 1):
        node = int(input())
        child[node].append(i)
        nonleaf[node] = 1

    dfs(1)

    # print(nonleaf[1:n + 1])
    # print(child[1:n + 1])
    # print(leaf[1:n + 1])

    for i in range(1, n + 1):
        if nonleaf[i] and leaf[i] < 3:
            print("No")
            exit()

    print("Yes")`,
                "run.sh": this.getRunShScript("913_b_christmas_spruce_7977"),
                "tags.txt": "implementation\\ntrees",
                "tests": {
                    "input_1.txt": "4\\n1\\n1\\n1",
                    "output_1.txt": "Yes",
                    "input_2.txt": "8\\n1\\n1\\n1\\n1\\n3\\n3\\n3",
                    "output_2.txt": "Yes",
                    "input_3.txt": "7\\n1\\n1\\n1\\n2\\n2\\n2",
                    "output_3.txt": "No",
                    "input_4.txt": "7\\n1\\n1\\n1\\n3\\n3\\n3",
                    "output_4.txt": "No",
                    "input_5.txt": "3\\n1\\n1",
                    "output_5.txt": "No",
                    "input_6.txt": "12\\n1\\n1\\n1\\n2\\n5\\n5\\n5\\n5\\n1\\n2\\n2",
                    "output_6.txt": "No",
                    "input_7.txt": "13\\n1\\n2\\n2\\n2\\n1\\n6\\n6\\n6\\n1\\n10\\n10\\n10",
                    "output_7.txt": "No",
                    "input_8.txt": "9\\n1\\n1\\n1\\n1\\n2\\n6\\n6\\n6",
                    "output_8.txt": "No",
                    "input_9.txt": "20\\n1\\n1\\n1\\n1\\n2\\n2\\n2\\n3\\n3\\n3\\n4\\n4\\n4\\n5\\n5\\n5\\n1\\n1\\n1",
                    "output_9.txt": "Yes",
                    "input_10.txt": "8\\n1\\n1\\n1\\n1\\n5\\n5\\n5",
                    "output_10.txt": "Yes"
                }
            },

            "982_c_cut_em_all_5275": {
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

from collections import  defaultdict
import threading
from sys import stdin,setrecursionlimit
setrecursionlimit(300000)
input=stdin.readline

def dfs(node,g,par,sz):
	for i in g[node]:
		if i!=par:
			sz[node]+=dfs(i,g,node,sz)
	return sz[node]+1
def main():
	n=int(input())
	if n%2!=0:
		print(-1)
		exit(0)
	g=defaultdict(list)
	for i in range(n-1):
		x,y=map(int,input().strip().split())
		g[x-1].append(y-1)
		g[y-1].append(x-1)

	sz=[0]*(n)
	tt=[]
	dfs(0,g,-1,sz)
	res=0
	# print(sz)
	for i in range(1,n):
		if sz[i]%2!=0:
			res+=1
	print(res)

threading.stack_size(10 ** 8)
t = threading.Thread(target=main)
t.start()
t.join()`,
                "run.sh": this.getRunShScript("982_c_cut_em_all_5275"),
                "tags.txt": "dfs and similar\\ndp\\ngraphs\\ngreedy\\ntrees",
                "tests": {
                    "input_1.txt": "4\\n2 4\\n4 1\\n3 1",
                    "output_1.txt": "1",
                    "input_2.txt": "2\\n1 2",
                    "output_2.txt": "0",
                    "input_3.txt": "10\\n7 1\\n8 4\\n8 10\\n4 7\\n6 5\\n9 3\\n3 5\\n2 10\\n2 5",
                    "output_3.txt": "4",
                    "input_4.txt": "3\\n1 2\\n1 3",
                    "output_4.txt": "-1",
                    "input_5.txt": "1",
                    "output_5.txt": "-1",
                    "input_6.txt": "4\\n1 2\\n1 3\\n1 4",
                    "output_6.txt": "0",
                    "input_7.txt": "10\\n7 1\\n8 4\\n8 10\\n4 7\\n6 10\\n9 3\\n3 5\\n2 10\\n2 5",
                    "output_7.txt": "4",
                    "input_8.txt": "4\\n2 4\\n2 1\\n3 1",
                    "output_8.txt": "1",
                    "input_9.txt": "4\\n2 4\\n2 1\\n3 2",
                    "output_9.txt": "0",
                    "input_10.txt": "3\\n1 2\\n2 3",
                    "output_10.txt": "-1"
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
                    <h3>🗂️ MiniCode CodeContests Collection (Before Refactoring)</h3>
                    <div class="filesystem-path">
                        <span class="path-segment" data-path="">📁 cluster0</span>
                        ${this.currentPath.map((segment, index) => {
                            const pathToHere = this.currentPath.slice(0, index + 1).join('/');
                            // Check if this is a valid navigation target (not the final file)
                            const isValidNavTarget = index < this.currentPath.length - 1 || typeof this.getCurrentDirectory() === 'object';
                            const clickHandler = isValidNavTarget ? `data-path="${pathToHere}"` : '';
                            const className = isValidNavTarget ? 'path-segment' : 'path-segment path-segment-file';
                            return `<span class="path-separator">/</span>
                                   <span class="${className}" ${clickHandler}>${segment}</span>`;
                        }).join('')}
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
                            <button class="btn-back" onclick="fsExplorerBefore.navigateBack()">← Back</button>
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
                ${this.currentPath.length > 0 ? '<div class="directory-item directory-back" onclick="fsExplorerBefore.navigateBack()">📁 ..</div>' : ''}
                ${directories.map(([name, content]) => `
                    <div class="directory-item directory" onclick="fsExplorerBefore.navigate('${name}')">
                        📁 ${name}
                    </div>
                `).join('')}
                ${files.map(([name, content]) => `
                    <div class="directory-item file" onclick="fsExplorerBefore.openFile('${name}')">
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
            const segments = path.split('/').filter(p => p);
            // For the filesystem structure, problems are at root level
            // So we just need to validate that the full path exists
            let current = this.filesystem;
            let validPath = [];
            
            for (const segment of segments) {
                if (current && typeof current === 'object' && current[segment] !== undefined) {
                    current = current[segment];
                    validPath.push(segment);
                } else {
                    break;
                }
            }
            
            // Only navigate if we found a valid directory path
            if (validPath.length === segments.length && typeof current === 'object') {
                this.currentPath = validPath;
            } else if (validPath.length > 0) {
                // Navigate to the deepest valid directory
                this.currentPath = validPath;
            }
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

    getRunShScript(problemId) {
        return `#!/bin/bash
# Test script for ${problemId}

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
fi`;
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

// Initialize the before filesystem explorer
const fsExplorerBefore = new FileSystemExplorerBefore();

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('filesystem-explorer');
    if (container) {
        fsExplorerBefore.init('filesystem-explorer');
    }
});