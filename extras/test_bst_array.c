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
    BstArray arr;
    init_array(&arr, 0);
    mu_assert("X init_array(): Height 0 (height)", arr.height == 0);
    mu_assert("X init_array(): Height 0 (size)", arr.size == 1);
    init_array(&arr, 1);
    mu_assert("X init_array(): Height 1 (height)", arr.height == 1);
    mu_assert("X init_array(): Height 1 (size)", arr.size == 3);
    return 0;
}

static char * test_insert_into_array() {
    /*
         6
       /   \
      2     9
     / \   / \
    1   4 8  12
               \
                15
    */
    BstArray arr;
    init_array(&arr, 0);
    insert_into_array(&arr, 6);
    mu_assert("X insert_into_array(): Height 0",
        arr.array[0] == 6 &&
        arr.height == 0 &&
        arr.used == 1 &&
        arr.size == 1
    );
    insert_into_array(&arr, 2);
    mu_assert("X insert_into_array(): Height 1",
        arr.array[1] == 2 &&
        arr.height == 1 &&
        arr.used == 2 &&
        arr.size == 3
    );
    insert_into_array(&arr, 9);
    insert_into_array(&arr, 1);
    mu_assert("X insert_into_array(): Height 2",
        arr.array[3] == 1 &&
        arr.height == 2 &&
        arr.used == 4 &&
        arr.size == 7
    );
    insert_into_array(&arr, 4);
    insert_into_array(&arr, 8);
    insert_into_array(&arr, 12);
    mu_assert("X insert_into_array(): Height 2 (full)",
        arr.array[6] == 12 &&
        arr.height == 2 &&
        arr.used == 7 &&
        arr.size == 7
    );
    insert_into_array(&arr, 15);
    mu_assert("X insert_into_array(): Height 3",
        arr.array[7] == 15 &&
        arr.height == 3 &&
        arr.used == 8 &&
        arr.size == 15
    );
    return 0;
}

/* runner */
static char * all_tests() {
    mu_run_test(test_nodes_for_height);
    mu_run_test(test_init_array);
    mu_run_test(test_insert_into_array);
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