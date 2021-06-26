Small library that brings Result and Option to JavaScript/TypeScript.

example:
```ts

function foo(n: number): Op<number> {
    if(n > 5) {
        return Some(n);
    } else {
        return None;
    }
}

const a = foo(11);
const b = foo(4);

if(a.is_some()){
    console.log(a.unwrap()); // 11
} else {
    console.log("Something went wrong");
}

const c = b.unwrap_or("Error");

console.log(c) // Error
```
