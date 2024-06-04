import React, { useState, useEffect } from 'react';
import './style.css';
// import * as d3 from 'd3';
import { useTreeAndArray, useHeapify, useBinarySearchTree } from './treeHooks';

const App = () => {
  const [input, setInput] = useState('10, 20, 60, 30, 70, 40, 50');
  const { treeAndArray } = useTreeAndArray();
  const { heapify } = useHeapify();
  const { createBinarySearchTree } = useBinarySearchTree();

  useEffect(() => {
    treeAndArray([10, 20, 60, 30, 70, 40, 50]);
  }, []);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleBinaryTreeClick = () => {
    treeAndArray(input.trim().split(/\s+|\,+/g).map((num) => parseInt(num)));
  };

  const handleHeapClick = () => {
    heapify(input.trim().split(/\s+|\,+/g).map((num) => parseInt(num)));
  };

  const handleBinarySearchTreeClick = () => {
    createBinarySearchTree(input.trim().split(/\s+|\,+/g).map((num) => parseInt(num)));
  };

  return (
    <div>
      <header>
        <div id="title">Tree Visualizer</div>
        <label>Array:</label><br />
        <input 
          type="text" 
          id="array-input" 
          name="array" 
          value={input} 
          onChange={handleInputChange} 
        />
        <div id="options">
          <button onClick={handleBinaryTreeClick}>Binary Tree Visualization</button>
          <button onClick={handleHeapClick}>Max-Heap Visualization</button>
          <button onClick={handleBinarySearchTreeClick}>Binary Search Tree Visualization</button>
        </div>
      </header>
      <div id="blurb">
        <div id="visual-title"></div>
        <div id="instructions"></div>
      </div>
      <div id="binary-tree"></div>
      <div id="array-visual"></div>
    </div>
  );
};

export default App;
