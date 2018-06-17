#include <stdio.h>
#include <stdlib.h>

typedef struct Node Node;

struct Node {
    int key;
    int value;
    Node *left;
    Node *right;
    Node **parent_to_self;
};

struct Node *new_node(int key, int value) {
    struct Node *new = (struct Node *)malloc(sizeof(struct Node));
    new->key = key;
    new->value = value;
    new->left = NULL;
    new->right = NULL;
    new->parent_to_self = NULL; // pointer to a parent's pointer
    return new;
}

void print_node(Node *node) {
    // utility to print a single node
    printf("Node @ %p\n", node);
    printf("Key: %d\nValue: %d\n", node->key, node->value);
    printf("Left child @ %p\n", node->left);
    printf("Right child @ %p\n", node->right);
    printf("Parents pointer to self: %p\n\n", node->parent_to_self);
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
            new->parent_to_self = &node->left;
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
            new->parent_to_self = &node->right;
            return;
        }
    }
}

Node *search(Node *tree, int key) {
    // returns a pointer to the node if the key is found
    // returns a NULL pointer if the key was not found
    if (key == tree->key) {
        return tree;
    } else if (key < tree->key) {
        // move down the tree to the left
        if (tree->left) {
            // recursively search left tree
            return search(tree->left, key);
        } else {
            // no left node
            Node *nptr = NULL;
            return nptr;
        }
    } else {
        // move down the tree to the right
        if (tree->right) {
            // recursively search right tree
            return search(tree->right, key);
        } else {
            // no right node
            Node *nptr = NULL;
            return nptr;
        }
    }
}

Node *find_min(Node *tree) {
    // returns a pointer to the node with the lowest key
    // this will be the left most node
    if (tree->left) {
        return find_min(tree->left);
    } else {
        return tree;
    }
}

Node *find_max(Node *tree) {
    // returns a pointer to the node with the highest key
    // this will be the right most node
    if (tree->right) {
        return find_max(tree->right);
    } else {
        return tree;
    }
}

void remove_node(Node *tree, int key) {
    // removes the node of provided key from the tree
    // removing nodes with two children follows in-order successor removal
    // that is the node will be replaced by its right subtree's left most child
    Node *found_node = search(tree, key);
    if (found_node) {
        if (found_node->left && found_node->right) {
            // node has two children
            // replace with in-order successor
            // this node's parent will point to this node's right subtree's left most child
            Node *replacement = find_min(found_node->right);
            *found_node->parent_to_self = replacement;
            free(found_node);
        } else if (found_node->left) {
            // node only has left child
            // this node's parent will point to this node's left child
            *found_node->parent_to_self = found_node->left;
            free(found_node);
        } else if (found_node->right) {
            // node only has right child
            // this node's parent will point to this node's right child
            *found_node->parent_to_self = found_node->right;
            free(found_node);
        } else {
            // node does not have any children
            // this node's parent will now have a null pointer
            *found_node->parent_to_self = NULL;
            free(found_node);
        }
    }
}