
type matchCase = string | number;

type matchCases<T> = {
    [key in matchCase]: (arg: T) => any;
} & {
    Some?: (arg:T) => any
    None?: (arg: T) => any;
};

const canBeNumber = (e: any) => Number(e).toString() == e

export class Op<T> {
    val: T;
    constructor(val: T) {
        this.val = val;
    }

    public unwrap(): T | null {
        if(this.val != null){
            return this.val
        }else{
            // panic
            return null
        }
    }

    public unwrap_or<R>(val: R): T | null | R {
        const ret = this.unwrap();
        if(ret != null) return ret
        else return val;
    }

    public match(arg: any) {
        return match(this)(arg);
    }
}

function match<T = any>(val: T, prop?: string){
    return (cases: matchCases<T>) => {
        const casesKeys: any[] = Object.keys(cases);
        const matchVal = prop ? (val as any)[prop] : val;

        for(const key of casesKeys){
            if(key === (matchVal) || (canBeNumber(key) && Number(key) == Number(matchVal))) {
                return cases[key](val);
            }
        }

        if(val instanceof Op ){
            if(matchVal != null && cases.Some){
                return cases.Some(val.unwrap());
            }
        } else {
            if(cases.None) {
                return cases.None((val as unknown as None).unwrap());
            }
        }

    }
}

export function Some<T>(v: T){
    return new Op<T>(v)
}

export class None extends Op<any>{
    static val: any = null;
    public static unwrap(): null {
        return null
    }

    public static unwrap_or<R>(val: R): R {
        return val;
    }

    public static match(arg: any) {
        return match(this)(arg);
    }
}

















