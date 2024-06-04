import * as d3 from 'd3';

// Define constants
const regFill = "green";
// const highlightFill = "lightblue";
const regFillText = "black";
// const highlightFillText = "white";

const xSpacing = 200;
const ySpacing = 100;
const radius = 35;

let treeContainer; // Define treeContainer variable
let arrayContainer; // Define arrayContainer variable
let start; // Define start variable

class Node {
  constructor(value, index, depth, cx, cy) {
    this.value = value;
    this.index = index;
    this.depth = depth;
    this.radius = radius;
    this.cx = cx;
    this.cy = cy;
    this.left = null;
    this.right = null;
    this.fill = regFill;
    this.highlighted = false;
  }
}

class Tree {
  constructor() {
    this.nodes = [];
    this.data = [];
    this.text = [];
  }

  addNode(node) {
    this.data.push(node);
    this.text = treeContainer.selectAll("text.circle")
      .data(this.data)
      .enter()
      .append("text")
      .attr("class", "circle")
      .attr("x", d => d.cx - (d.value.toString().length * 4))
      .attr("y", 0)
      .text(d => d.value)
      .transition()
      .duration(100)
      .attr("y", d => d.cy + 5)
      .call(textAttr, regFillText, "sans-serif", "1em");

    this.nodes = treeContainer.selectAll("circle")
      .data(this.data)
      .enter()
      .append("circle");
  }

  updateNodes() {
    this.nodes = treeContainer.selectAll("circle")
      .data(this.data)
      .enter()
      .append("circle");
  }

  swapNodeData(a, b) {
    const temp = this.data[a];
    this.data[a] = this.data[b];
    this.data[b] = temp;
  }

  findNode(index) {
    return this.nodes.filter((d) => d.index === index);
  }

  findText(index) {
    return this.text.filter((d) => d.index === index);
  }

  removeNode(index) {
    this.findNode(index).remove();
    this.findText(index).remove();

    this.data = this.data.filter((e, i) => i !== index);
    this.text = this.text.filter((e, i) => i !== index);

    this.nodes = treeContainer.selectAll("circle")
      .data(this.data)
      .exit().remove();
  }

  createBinaryTree(arr) {
    treeContainer = createContainer("binary-tree", arr); // Access createContainer function
    start = treeContainer.attr("width") / 2; // Calculate start position

    let i = 0;
    let node = {};

    while (i < arr.length) {
      const depth = Math.ceil(Math.log2(i + 2)) - 1;

      node = new Node(arr[i], i, depth);

      if (i === 0) {
        node.cx = start;
        node.cy = radius;
      } else {
        if (i === leftChild(parent(i))) {
          node.cx = this.data[parent(i)].cx - xSpacing / depth;
        } else {
          node.cx = this.data[parent(i)].cx + xSpacing / depth;
        }
        node.cy = this.data[parent(i)].cy + ySpacing;
        treeContainer.append("line").call(createLineAttr, "black", this.data[parent(i)].cx, this.data[parent(i)].cy, node.cx, node.cy);
      }
      this.addNode(node);
      ++i;
    }
    this.nodes = treeContainer
      .selectAll("circle")
      .raise()
      .on("click", addHighlight);
    this.text = treeContainer
      .selectAll("text.circle")
      .raise()
      .on("click", addHighlight);
    this.nodes.call(circleAttr);
  }

  createBinarySearchTree(inputArr) {
    treeContainer = createContainer("binary-tree", inputArr); // Access createContainer function
    start = treeContainer.attr("width") / 2; // Calculate start position

    let midPoint = Math.floor(inputArr.length / 2);
    let root = new Node(inputArr[midPoint], null, 1, start, radius);

    const insertNode = (arr, depth, cx) => {
      if (!arr.length) { return; }
      let mid = Math.floor(arr.length / 2);
      let node = new Node(arr[mid], null, depth, cx , radius + (depth * ySpacing));
      let nextDepth = depth + 1;

      node.left = insertNode(arr.slice(0, mid), nextDepth, cx - xSpacing/nextDepth);
      node.right = insertNode(arr.slice(mid + 1), nextDepth, cx + xSpacing/nextDepth);

      if (arr.slice(0, mid).length) {
        treeContainer.append("line").call(createLineAttr, "black", cx, radius+(depth * ySpacing), cx - xSpacing/nextDepth, radius + nextDepth * ySpacing);
      }
      if (arr.slice(mid + 1).length) {
        treeContainer.append("line").call(createLineAttr, "black", cx, radius+(depth * ySpacing), cx + xSpacing/nextDepth, radius + nextDepth * ySpacing);
      }

      this.addNode(node);
    }

    root.left = insertNode(inputArr.slice(0, midPoint), 1, start - xSpacing);
    root.right = insertNode(inputArr.slice(midPoint + 1), 1, start + xSpacing);

    if (inputArr.slice(0, midPoint).length) {
      treeContainer.append("line").call(createLineAttr, "black", start, radius, start - xSpacing, radius + ySpacing);
    }
    if (inputArr.slice(midPoint + 1).length) {
      treeContainer.append("line").call(createLineAttr, "black", start, radius, start + xSpacing, radius + ySpacing);
    }
    this.addNode(root)

    this.nodes = treeContainer
      .selectAll("circle")
      .raise()

    this.text = treeContainer
      .selectAll("text.circle")
      .raise()

    this.nodes.call(circleAttr);
  }
}

// Utility functions
const parent = (index) => Math.floor((index - 1) / 2);
const leftChild = (index) => index * 2 + 1;
const rightChild = (index) => index * 2 + 2;

const textAttr = (text, color, family, size) => {
  text
    .attr("fill", color)
    .style("font-family", family)
    .style("font-size", size);
};

const addHighlight = (d, i) => {
  // Logic to add highlight
};

const createLineAttr = (line, color, x1, y1, x2, y2) => {
  line
    .attr("stroke", color)
    .attr("x1", x1)
    .attr("y1", y1)
    .attr("x2", x2)
    .attr("y2", y2);
};

const reset = () => {
  d3.selectAll('svg').remove();
};

const createContainer = (id, arr, width, height) => {
  const box = calcDimensions(arr);
  const depth = Math.ceil(Math.log2((arr.length - 1) + 2)) - 1 || 1;

  const container = d3.select(`div#${id}`)
    .append('svg')
    .attr('width', width || box.width * 600 * (.8 / depth) * .75)
    .attr('height', height || box.height);

  return container;
};

const calcDimensions = (arr) => {
  const depth = Math.ceil(Math.log2((arr.length - 1) + 2)) - 1;
  return { width: Math.pow(2, depth), height: ySpacing + ySpacing * depth, depth: depth };
};


function circleAttr(selection) {
    selection
      .attr("cx", function(c) { return c.cx })
      .attr("cy", 0)
      .attr("r", function(c) { return c.radius })
      .attr("fill", function(c) { return c.fill }) // Set fill color based on the 'fill' property of each node
      .transition()
      .duration(100)
      .attr("cy", function(c) { return c.cy });
  }

  function createArray(arr, x, y, width, height) {
    const arrayData = arr.map((value, i) => {
      const xPos = x + i * (width + 10); // Adjust spacing as needed
      return {
        x: xPos,
        y: y,
        width: width,
        height: height,
        color: regFill,
        value: value
      };
    });
  
    const elementsArr = arrayContainer.selectAll("rect")
      .data(arrayData)
      .enter()
      .append("rect")
      .attr("x", d => d.x)
      .attr("y", d => d.y)
      .attr("width", d => d.width)
      .attr("height", d => d.height)
      .attr("fill", d => d.color)
      .attr("stroke", "black");
  
    arrayContainer.selectAll("text.rect")
      .data(arrayData)
      .enter()
      .append("text")
      .attr("x", d => d.x + (d.width / 2) - (d.value.toString().length * 4))
      .attr("y", d => d.y + 30)
      .text(d => d.value)
      .call(textAttr, regFillText, "sans-serif", "1em");
  
    arrayContainer.selectAll("text.index")
      .data(arrayData)
      .enter()
      .append("text")
      .text((d, i) => `[${i}]`)
      .attr("x", d => d.x + 15)
      .attr("y", d => d.y - 15)
      .call(textAttr, regFillText, "sans-serif", "15px");
  }
  

// Export Tree and Node classes, along with other utility functions
export { Tree, Node, parent, leftChild, rightChild, textAttr, addHighlight, reset, createContainer, calcDimensions, createArray, circleAttr, arrayContainer };
