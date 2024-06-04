// import { Tree, createBinaryTreeAndArr } from './nodes';

const makeHeap = (arr) => {
  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
    heapify(arr, i, arr.length);
  }
};

const heapify = (arr, i, max) => {
  let index, leftChild, rightChild;

  while (i < max) {
    index = i;
    leftChild = 2 * i + 1;
    rightChild = leftChild + 1;

    if (leftChild < max && arr[leftChild] > arr[index]) {
      index = leftChild;
    }

    if (rightChild < max && arr[rightChild] > arr[index]) {
      index = rightChild;
    }

    if (index === i) {
      return;
    }

    swap(arr, i, index);

    i = index;
  }
};

const swap = (arr, i, j) => {
  [arr[i], arr[j]] = [arr[j], arr[i]];
};

export { makeHeap, heapify, swap };
