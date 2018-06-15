# Extras
These are not currently used in the core project, but included as they fit the same common theme.

# bst.c
Binary Search Tree algorithms written in C. A tree data type is defined by a Node struct containing a key, value, and pointers to a left and right child Node struct. 

Tree:
```shell
     6
   /   \
  2     9
 / \   / \
1   4 8  12
```
Output of above tree:
```shell
Node @ 0x7fcb30c02770
Key: 1
Value: 1
Left child @ 0x0
Right child @ 0x0

Node @ 0x7fcb30c02730
Key: 2
Value: 2
Left child @ 0x7fcb30c02770
Right child @ 0x7fcb30c02790

Node @ 0x7fcb30c02790
Key: 4
Value: 4
Left child @ 0x0
Right child @ 0x0

Node @ 0x7fcb30c02710
Key: 6
Value: 6
Left child @ 0x7fcb30c02730
Right child @ 0x7fcb30c02750

Node @ 0x7fcb30c027b0
Key: 8
Value: 8
Left child @ 0x0
Right child @ 0x0

Node @ 0x7fcb30c02750
Key: 9
Value: 9
Left child @ 0x7fcb30c027b0
Right child @ 0x7fcb30c027d0

Node @ 0x7fcb30c027d0
Key: 12
Value: 12
Left child @ 0x0
Right child @ 0x0
```