import HashMap from "./modules/hashmap.js";


const test = new HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

test.set("banana", "BLUEEEEEEE");
test.set("moon", "silver");

console.log(JSON.stringify(test, null, 2));

console.log(test.entries());
console.log(test.length());
console.log(test);
test.set("wefoh", "silver");
console.log(test.capacity);
console.log(test.length() / test.capacity);