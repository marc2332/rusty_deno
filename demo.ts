import { Op, Some, None } from './mod.ts'

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