#include <stdio.h>
#include <stdlib.h>

typedef struct Node Node;

struct Node {
    int key;
    int value;
    Node *left;
    Node *right;
};

struct Node *new_node(int key, int value) {
    struct Node *new = (struct Node *)malloc(sizeof(struct Node));
    new->key = key;
    new->value = value;
    new->left = NULL;
    new->right = NULL;
    return new;
}

void print_node(Node *node) {
    // utility to print a single node
    printf("Node @ %p\n", node);
    printf("Key: %d\nValue: %d\n", node->key, node->value);
    printf("Left child @ %p\n", node->left);
    printf("Right child @ %p\n\n", node->right);
}

void print_tree(Node *node) {
    // recursively print node and all of its children
    // this will traverse the tree in order
    // output will be ordered, not start with root
    // left, node, right recursively
    if (node->left) {
        print_tree(node->left);
    }
    print_node(node);
    if (node->right) {
        print_tree(node->right);
    }
}

void insert(Node *node, int key, int value) {
    // insert a new node into a binary search tree
    if (key == node->key) {
        // key exists
        // replace value
        node->value = value;
        return;
    } else if (key < node->key) {
        // move down the tree to the left
        if (node->left) {
            // left node exists
            // use recurssion on left node
            insert(node->left, key, value);
            return;
        } else {
            // left node does not exists
            struct Node *new = new_node(key, value);
            node->left = new;
            return;
        }
    } else {
        // move down the tree to the right
        if (node->right) {
            // right node exists
            // use recussion on the right node
            insert(node->right, key, value);
            return;
        } else {
            // right node does not exist
            struct Node *new = new_node(key, value);
            node->right = new;
            return;
        }
    }
}

int main() {
    struct Node *bst = new_node(6, 6);
    
    /*
         6
       /   \
      2     9
     / \   / \
    1   4 8  12
    */
    insert(bst, 2, 2);
    insert(bst, 9, 9);
    insert(bst, 1, 1);
    insert(bst, 4, 4);
    insert(bst, 8, 8);
    insert(bst, 12, 12);

    print_tree(bst);

    return 0;
}