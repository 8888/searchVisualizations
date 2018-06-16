#include <stdio.h>
#include "minunit.h"
#include "bst.c"

int tests_run = 0;

/* utility */
static Node *create_tree_of_height_two() {
    /*
         6
       /   \
      2     9
     / \   / \
    1   4 8  12
    */
    struct Node *bst = new_node(6, 60);
    insert(bst, 2, 20);
    insert(bst, 9, 90);
    insert(bst, 1, 10);
    insert(bst, 4, 40);
    insert(bst, 8, 80);
    insert(bst, 12, 120);
    return bst;
}

/* test cases */
static char * test_new_node() {
    struct Node *bst = new_node(6, 60);
    mu_assert("X new_node(): Key should be set", bst->key == 6);
    mu_assert("X new_node(): Value should be set", bst->value == 60);
    mu_assert("X new_node(): Left inits as null pointer", bst->left == NULL);
    mu_assert("X new_node(): Right inits as null pointer", bst->right == NULL);
    return 0;
}

static char * test_insert() {
    struct Node *bst = new_node(6, 60);
    insert(bst, 2, 20);
    mu_assert("X insert(): Inserts into left", bst->left->key == 2);
    insert(bst, 9, 90);
    mu_assert("X insert(): Inserts into right", bst->right->key == 9);
    insert(bst, 1, 10);
    mu_assert("X insert(): Traverses down left, inserts into left", bst->left->left->key == 1);
    insert(bst, 4, 40);
    mu_assert("X insert(): Traverses down left, inserts into right", bst->left->right->key == 4);
    insert(bst, 8, 80);
    mu_assert("X insert(): Traverses down right, inserts into left", bst->right->left->key == 8);
    insert(bst, 12, 120);
    mu_assert("X insert(): Traverses down right, inserts into right", bst->right->right->key == 12);
    return 0;
}

static char * test_search() {
    struct Node *bst = create_tree_of_height_two();
    mu_assert("X search(): Returns pointer to value when key is found", *search(bst, 8) == 80);
    mu_assert("X search(): Returns null pointer when key is not found", search(bst, 5) == NULL);
    return 0;
}

static char * test_find_min() {
    struct Node *bst = create_tree_of_height_two();
    mu_assert("X find_min(): Returns a pointer to the left most node", find_min(bst)->key == 1);
    return 0;
}

static char * test_find_max() {
    struct Node *bst = create_tree_of_height_two();
    mu_assert("X find_max(): Returns a pointer to the right most node", find_max(bst)->key == 12);
    return 0;
}

/* runner */
static char * all_tests() {
    mu_run_test(test_new_node);
    mu_run_test(test_insert);
    mu_run_test(test_search);
    mu_run_test(test_find_min);
    mu_run_test(test_find_max);
    return 0;
}

int main(int argc, char **argv) {
    char *result = all_tests();
    if (result != 0) {
        printf("%s\n", result);
    } else {
        printf("All tests have passed!\n");
    }
    printf("Tests run: %d\n", tests_run);

    return result != 0;
}
