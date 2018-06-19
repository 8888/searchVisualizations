#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int *array;
    size_t height;
    size_t used;
    size_t size;
} BstArray;

int nodes_for_height(size_t height) {
    // returns the number of nodes in a complete tree of a given height
    // total nodes on the deepest row = 2^height
    int total = 0;
    for (int i = 0; i <= height; i++) {
        // <= becuase we need to accumulate on each height
        total += (1 << i);
    }
    return total;
}

void init_array(BstArray *array, size_t height) {
    // the size is based on number of nodes in a complete tree at a given height
    // example height:nodes -> 0:1 1:3 2:7 3:15
    int nodes = nodes_for_height(height);
    array->array = (int *)malloc(nodes * sizeof(int));
    array->height = height;
    array->used = 0;
    array->size = nodes;
}
/*
TODO: write tests and then update this function
void insert_into_array(BstArray *array, int value) {
    if (array->used == array->size) {
        // array space is full
        // currently just double the space
        // need to change to adjust based on height
        array->size *= 2;
        array->array = (int *)realloc(array->array, array->size * sizeof(int));
    }
    array->array[array->used++] = value;
}
*/