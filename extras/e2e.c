#include <stdio.h>
#include "bst.c"

int main() {
    struct Node *bst = new_node(6, 60);
    
    /*
         6
       /   \
      2     9
     / \   / \
    1   4 8  12
    */
    insert(bst, 2, 20);
    insert(bst, 9, 90);
    insert(bst, 1, 10);
    insert(bst, 4, 40);
    insert(bst, 8, 80);
    insert(bst, 12, 120);

    printf("The tree struct is stored as:\n");
    print_tree(bst);

    printf("Search for the key 8:\n");
    int *value = search(bst, 8);
    if (value) {
        printf("Key was found with value: %d\n\n", *value);
    } else {
        printf("key not found!\n");
    }

    Node *min = find_min(bst);
    printf("The min node is key: %d value: %d\n", min->key, min->value);
    Node *max = find_max(bst);
    printf("The max node is key: %d value: %d\n\n", max->key, max->value);

    return 0;
}