// SortingVisualizer.jsx

import React, { Component } from 'react';
import { bubbleSort, mergeSort, quickSort, insertionSort } from '../algorithms/sortingAlgorithms';
import './SortingVisualizer.css';

export default class SortingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.generateArray();
  }

  generateArray() {
    const array = [];
    const arraySize = 100; // Adjust the size of the array as needed
    for (let i = 0; i < arraySize; i++) {
      array.push(randomIntFromInterval(5, 500)); // Generate random numbers within a range
    }
    this.setState({ array });
  }

  visualizeSort(algorithm) {
    const { array } = this.state;
    let animations;
    switch (algorithm) {
      case 'bubbleSort':
        animations = bubbleSort(array);
        break;
      case 'mergeSort':
        animations = mergeSort(array);
        break;
      case 'quickSort':
        animations = quickSort(array);
        break;
      case 'insertionSort':
        animations = insertionSort(array);
        break;
      default:
        break;
    }
    // Implement animation logic here
  }

  render() {
    const { array } = this.state;

    return (
      <div className="sorting-visualizer">
        <div className="array-container">
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{ height: `${value}px` }}
            ></div>
          ))}
        </div>
        <div className="button-container">
          <button onClick={() => this.generateArray()}>Generate New Array</button>
          <button onClick={() => this.visualizeSort('bubbleSort')}>Bubble Sort</button>
          <button onClick={() => this.visualizeSort('mergeSort')}>Merge Sort</button>
          <button onClick={() => this.visualizeSort('quickSort')}>Quick Sort</button>
          <button onClick={() => this.visualizeSort('insertionSort')}>Insertion Sort</button>
        </div>
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
