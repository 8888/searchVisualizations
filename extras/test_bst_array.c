#include <stdio.h>
#include "minunit.h"
#include "bst_array.h"

int tests_run = 0;

/* test cases */
static char * test_nodes_for_height() {
    mu_assert("X nodes_for_height(): Height 0", nodes_for_height(0) == 1);
    mu_assert("X nodes_for_height(): Height 1", nodes_for_height(1) == 3);
    mu_assert("X nodes_for_height(): Height 2", nodes_for_height(2) == 7);
    mu_assert("X nodes_for_height(): Height 3", nodes_for_height(3) == 15);
    return 0;
}

static char * test_init_array() {
    BstArray *arr;
    init_array(arr, 0);
    mu_assert("X init_array(): Height 0 (height)", arr->height == 0);
    mu_assert("X init_array(): Height 0 (size)", arr->size == 1);
    init_array(arr, 1);
    mu_assert("X init_array(): Height 1 (height)", arr->height == 1);
    mu_assert("X init_array(): Height 1 (size)", arr->size == 3);
    return 0;
}

/* runner */
static char * all_tests() {
    mu_run_test(test_nodes_for_height);
    mu_run_test(test_init_array);
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