# Extras
These are not currently used in the core project, but included as they fit the same common theme.

# bst.c
Binary Search Tree algorithms written in C. A tree data type is defined by a Node struct containing a key, value, pointers to a left and right child Node struct, and a pointer to its parent's pointer that is pointing at this node. To demo all of the available methods:
```shell
$ gcc e2e.c
$ ./a.out
```

Tree:
```shell
     6
   /   \
  2     9
 / \   / \
1   4 8  12
```
Output of e2e.c:
```shell
The tree struct is stored as:
Node @ 0x7ff7215000d0
Key: 1
Value: 10
Left child @ 0x0
Right child @ 0x0
Parents pointer to self: 0x7ff721500098

Node @ 0x7ff721500090
Key: 2
Value: 20
Left child @ 0x7ff7215000d0
Right child @ 0x7ff7215000f0
Parents pointer to self: 0x7ff721500078

Node @ 0x7ff7215000f0
Key: 4
Value: 40
Left child @ 0x0
Right child @ 0x0
Parents pointer to self: 0x7ff7215000a0

Node @ 0x7ff721500070
Key: 6
Value: 60
Left child @ 0x7ff721500090
Right child @ 0x7ff7215000b0
Parents pointer to self: 0x0

Node @ 0x7ff721500110
Key: 8
Value: 80
Left child @ 0x0
Right child @ 0x0
Parents pointer to self: 0x7ff7215000b8

Node @ 0x7ff7215000b0
Key: 9
Value: 90
Left child @ 0x7ff721500110
Right child @ 0x7ff721500130
Parents pointer to self: 0x7ff721500080

Node @ 0x7ff721500130
Key: 12
Value: 120
Left child @ 0x0
Right child @ 0x0
Parents pointer to self: 0x7ff7215000c0

Search for the key 8:
Key was found with value: 80

The min node is key: 1 value: 10
The max node is key: 12 value: 120

Traverse the values of the BST
[ {k: 1 v: 10} {k: 2 v: 20} {k: 4 v: 40} {k: 6 v: 60} {k: 8 v: 80} {k: 9 v: 90} {k: 12 v: 120} ]

Now remove some nodes
Remove 12, 9, 2, 1
The tree is now:
Node @ 0x7ff7215000f0
Key: 4
Value: 40
Left child @ 0x0
Right child @ 0x0
Parents pointer to self: 0x7ff7215000a0

Node @ 0x7ff721500070
Key: 6
Value: 60
Left child @ 0x7ff7215000f0
Right child @ 0x7ff721500110
Parents pointer to self: 0x0

Node @ 0x7ff721500110
Key: 8
Value: 80
Left child @ 0x0
Right child @ 0x0
Parents pointer to self: 0x7ff7215000b8
```
Unit testing uses the [Min Unit test framework](http://www.jera.com/techinfo/jtns/jtn002.html). To run unit tests:
```shell
bst.c
$ gcc test_bst.c -o test_bst.out && ./test_bst.out

bst_array.h
$ gcc test_bst_array.c -o test_bst_array.out && ./test_bst_array.out
```
