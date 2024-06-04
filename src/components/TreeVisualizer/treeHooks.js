import { useCallback } from 'react';
import * as d3 from 'd3';
import { Tree, createContainer, reset, calcDimensions, parent, leftChild, rightChild, textAttr, addHighlight } from './nodes';
import { makeHeap } from './heap';
import './style.css';

// Define constants
const ySpacing = 100;

const createBinaryTreeAndArr = (arr) => {
  createContainer("array-visual", arr, arr.length * 60, 100);
  const tree = new Tree();
  tree.createBinaryTree(arr);
  createArray(arr, 2, 30, 50, 50); // Ensure createArray function is defined
};

const useTreeAndArray = () => {
  const treeAndArray = useCallback((arr) => {
    reset();
    document.querySelector('#visual-title').innerHTML = "Binary Tree And Array";
    document.querySelector('#instructions').innerHTML = "Click a value in the binary tree or array to highlight its corresponding location in the data structure.";
    createBinaryTreeAndArr(arr);
  }, []);

  return { treeAndArray };
};

const useHeapify = () => {
  const heapify = useCallback((arr) => {
    reset();
    makeHeap(arr);
    createBinaryTreeAndArr(arr);
    document.getElementById('instructions').innerHTML = "<p> Parent's value is always greater than or equal to the values of its children.</p>";
    document.getElementById('visual-title').innerHTML = "Max-Heap Binary Tree And Array";
  }, []);

  return { heapify };
};

const useBinarySearchTree = () => {
  const createBinarySearchTree = useCallback((arr) => {
    reset();
    arr.sort((a, b) => a - b);
    document.querySelector('#visual-title').innerHTML = "Binary Search Tree";
    document.querySelector('#instructions').innerHTML = "The input data sorted and arranged into a Binary Search Tree.";
    const tree = new Tree();
    tree.createBinarySearchTree(arr);
  }, []);

  return { createBinarySearchTree };
};


// Define the createArray function if it doesn't exist
const createArray = (arr) => {
    const arrayContainer = d3.select("#array-visual");
  
    // Remove existing non-styled array elements
    arrayContainer.selectAll(".non-styled-array").remove();
  
    // Create array elements with styling
    const elementsArr = arrayContainer.selectAll(".array-element")
      .data(arr)
      .enter()
      .append("div")
      .attr("class", "array-element")
      .text(d => d);
  
    // Add index labels
    arrayContainer.selectAll(".array-index")
      .data(arr)
      .enter()
      .append("div")
      .attr("class", "array-index")
      .text((d, i) => `[${i}]`)
      .classed("non-styled-array", true); // Add a class to mark the array as non-styled
  };
  
  
  
  

export { useTreeAndArray, useHeapify, useBinarySearchTree };
