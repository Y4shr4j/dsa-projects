import React from 'react';
import { Link } from 'react-router-dom';



const AboutPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-8">About Me</h1>
      <div className="text-lg text-center max-w-2xl leading-relaxed">
        <p>Hello, I'm Yash Raj, a passionate developer with a strong interest in Data Structures and Algorithms (DSA). I've created several projects that visualize and solve complex algorithms, including:</p>
        <ul className="list-disc list-inside mt-4 text-left">
          <li><strong>Tic Tac Toe Game:</strong> A classic game implemented with an algorithm to play against a computer opponent.</li>
          <li><strong>Sudoku Solver:</strong> A visualizer that solves Sudoku puzzles using backtracking algorithms.</li>
          <li><strong>N Queen Visualizer:</strong> A visualization of the N-Queen problem, demonstrating how the algorithm finds solutions.</li>
          <li><strong>Path Finder (Dijkstra's Algorithm):</strong> A visual implementation of Dijkstra's algorithm to find the shortest path in a graph.</li>
          <li><strong>Binary Tree Visualizer:</strong> A tool to visualize binary tree operations like traversal, insertion, and deletion.</li>
          <li><strong>Sorting Algorithms:</strong> Visualizations of various sorting algorithms like Quick Sort, Merge Sort, and Bubble Sort.</li>
        </ul>
        <p className="mt-4">These projects demonstrate my ability to solve complex problems and present them in an intuitive and visual manner.</p>
      </div>
      <h1>
      <Link 
          to="/" 
          className="inline-block mt-6 text-blue-500 text-lg font-bold hover:underline"
        >
          Back to Home
        </Link>
      </h1>
    </div>
  );
};

export default AboutPage;
