import { Op, Some, None, Ok, Err, Result } from './mod.ts'

// Option

const default_val = 60;

function test(status: number): Op<number> {
    if(status == 202) {
        return Some(status);
    } else {
        return None;
    }
}


const is_ok = test(202);

const val = is_ok.unwrap_or(default_val);

console.log(val)

// Result

function testB(status: number): Result<number, string> {
    if(status == 100) {
        return Ok(status)
    } else {
        return Err("Unhandled number");
    }
}

const res = testB(100);

console.log(res.unwrap_or(5));

console.log(res.match({
    Ok: (n) => `It's ${n}`,
    Err: (e) => `F: ${e}`
}));

async function async_func(): Promise<Result<number, string>> {
    return Ok(1)
}

const async_val = await async_func()

if(async_val.is_ok()) {
    console.log(async_val.unwrap())
} else {
    console.log(async_val.err())
}



