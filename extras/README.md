# Extras
These are not currently used in the core project, but included as they fit the same common theme.

# bst.c
Binary Search Tree algorithms written in C. A tree data type is defined by a Node struct containing a key, value, and pointers to a left and right child Node struct. To demo all of the available methods:
```shell
$ gcc e2e.c
$ gcc ./a.out
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
Node @ 0x7fd813c02770
Key: 1
Value: 10
Left child @ 0x0
Right child @ 0x0

Node @ 0x7fd813c02730
Key: 2
Value: 20
Left child @ 0x7fd813c02770
Right child @ 0x7fd813c02790

Node @ 0x7fd813c02790
Key: 4
Value: 40
Left child @ 0x0
Right child @ 0x0

Node @ 0x7fd813c02710
Key: 6
Value: 60
Left child @ 0x7fd813c02730
Right child @ 0x7fd813c02750

Node @ 0x7fd813c027b0
Key: 8
Value: 80
Left child @ 0x0
Right child @ 0x0

Node @ 0x7fd813c02750
Key: 9
Value: 90
Left child @ 0x7fd813c027b0
Right child @ 0x7fd813c027d0

Node @ 0x7fd813c027d0
Key: 12
Value: 120
Left child @ 0x0
Right child @ 0x0

Search for the key 8:
Key was found with value: 80
```
Unit testing uses the [Min Unit test framework](http://www.jera.com/techinfo/jtns/jtn002.html). To run unit tests:
```shell
$ gcc test.c
$ ./a.out
```