"use strict";

/**
 * flatten array using Depth-first search / Breadth-first search
 * assuming elements in array are numbers and arrays only
 * the order of output array doesn't matter
 */
function dfsFlatten(arr) {
  // Implement here
  let result = [];
  let stack = Array.from(arr);

  while (stack.length !== 0) {
    let next = stack.pop(); // get the last element from the stack

    if (Array.isArray(next)) {
      stack.push(...next); // push the element into the stack and expand it if it's an array
    } else {
      result.push(next);
    }
  }
  return result.reverse();
}

function bfsFlatten(arr) {
  // Implement here
  let result = [];

  arr.forEach((element) => {
    if (Array.isArray(element)) {
      result = [...result, ...bfsFlatten(element)];
    } else {
      result.push(element);
    }
  });
  return result;
}

const rawArr = [1, 2, [3, 4, [5, 6], 7], 8, [9, 0]];
console.log("DFS:", dfsFlatten(rawArr));
console.log("BFS:", bfsFlatten(rawArr));

// Leetcode Problem Solving
/**
 * Leetcode #1
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum = function (nums, target) {
  // brute force solution
  // let arr = [];
  // for (let i = 0; i < nums.length; i++) {
  //   for (let j = 0; j < i; j++) {
  //     if (nums[i] + nums[j] === target) {
  //       arr.push([nums[i], nums[j]]);
  //     }
  //   }
  // }
  // return arr;

  // hashtable solution
  let arr = [];
  let hashTable = {};

  for (let i = 0; i < nums.length; i++) {
    let minusElement = target - nums[i];

    // if minusElement exists in hashtable, push the current nums element and minus element into the new array
    if (hashTable[minusElement.toString()] !== undefined) {
      arr.push([nums[i], minusElement]);
    }

    hashTable[nums[i].toString()] = nums[i];
  }
  return arr;
};
console.log(twoSum([7, 3, 4, 5, 6], 10));

/**
 * Leetcode #9
 * @param {number} x
 * @return {boolean}
 */
const isPalindrome = function (x) {
  if (x < 0) return false;

  let divider = 1;

  while (x >= 10 * divider) {
    divider *= 10;
  }

  while (x) {
    let firstNumber = Math.floor(x / divider);
    let lastNumber = x % 10;

    if (firstNumber !== lastNumber) return false;

    x = Math.floor((x % divider) / 10);

    divider /= 100;
  }
  return true;
};

console.log(isPalindrome(112));
console.log(isPalindrome(313));

/**
 * Leetcode #15
 * @param {number[]} nums
 * @return {number[][]}
 */
const threeSum = function (nums) {
  let result = [];
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length; i++) {
    // skip duplicates
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }

    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      let sum = nums[i] + nums[left] + nums[right];

      if (sum > 0) right--;
      else if (sum < 0) left++;
      else {
        result.push(nums[i], nums[left], nums[right]);
        left++;

        while (nums[left] == nums[right] && left < right) {
          left++;
        }
      }
    }
  }

  return result;
};
console.log(threeSum([-3, 3, 4, -3, 1, 2]));

// Array Prototype Methods Implementations
// pass given test cases (no need for perfect implementation involving specific thisArg)
// Example:
Array.prototype.forEach = function (fn) {
  typeof fn === "function" && fn.apply(null, this);
};
console.log("forEach: ", [1, 2, 3].forEach(console.log));

// ==== Native Filter ====
Array.prototype.filter = function (fn) {
  let arr = [];

  for (let i = 0; i < this.length; i++) {
    if (fn(this[i])) {
      arr.push(this[i]);
    }
  }
  return arr;
};

const filter_words = ["a", "ab", "bcd", "asdf", "asdfre", "qwerre"];
console.log(
  "filter: ",
  filter_words.filter((word) => word.length > 3)
);

// ==== Native Map ====
Array.prototype.map = function (fn) {
  // Implement here
  let arr = [];

  for (let i = 0; i < this.length; i++) {
    arr.push(fn(this[i]));
  }

  return arr;
};

const map_array = [1, 4, 9, 16];
console.log(
  "map:",
  map_array.map((x) => x * 2)
);

// ==== Native Reduce ====
Array.prototype.reduce = function (reducer) {
  // Implement here
  let result = 0;

  for (let i = 0; i < this.length; i++) {
    let currentValue = this[i];
    result = reducer(result, currentValue);
  }

  return result;
};

const reduce_array = [1, 2, 3, 4];
const reducer = (accumulator, currentValue) => accumulator + currentValue;
console.log("reduce:", reduce_array.reduce(reducer));

// ==== Native Bind ====
Function.prototype.bind = function (newThis) {
  // Implement here
  let fn = this;
  let boundArguments = Array.prototype.slice.call(arguments, 1);
  return function boundFunction() {
    let targetArguments = Array.prototype.slice.call(arguments);
    return fn.apply(newThis, [...boundArguments, ...targetArguments]);
  };
};

// test case 1
const test = {
  name: "Jesse",
  func: function () {
    console.log(this.name);
  },
};

test.func(); // Jesse
const newf = test.func.bind({ name: "Abby" });
newf(); // Abby

// test case 2
const func = (a, b) => a + b;
const boundFunc = func.bind(null, "foo");
console.log(boundFunc("bb", "cc")); // foobb
