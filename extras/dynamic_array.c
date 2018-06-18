#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int *array;
    size_t used;
    size_t size;
} DynamicArray;

void init_array(DynamicArray *array, size_t init_size) {
    // init_size should be based on common height
    // example a tree of height 2 has 7 nodes
    array->array = (int *)malloc(init_size * sizeof(int));
    array->used = 0;
    array->size = init_size;
}

void insert_into_array(DynamicArray *array, int value) {
    if (array->used == array->size) {
        // array space is full
        // currently just double the space
        // need to change to adjust based on height
        array->size *= 2;
        array->array = (int *)realloc(array->array, array->size * sizeof(int));
    }
    array->array[array->used++] = value;
}

int main() {
    DynamicArray *test;
    init_array(test, 2);
    insert_into_array(test, 1);
    insert_into_array(test, 2);
    printf("%d,%d\n", test->array[0], test->array[1]);
    printf("used: %zu size: %zu\n", test->used, test->size);
    insert_into_array(test, 3);
    printf("%d,%d,%d\n", test->array[0], test->array[1], test->array[2]);
    printf("used: %zu size: %zu\n", test->used, test->size);

    return 0;
}