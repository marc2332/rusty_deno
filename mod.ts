
interface matchCases<V,E> {
    Some?: (arg:V) => any
    None?: () => any;
    Ok?: (arg: V) => any
    Err?: (arg: E) => any;
};

export class Op<T> {
    val: T;
    constructor(val: T) {
        this.val = val;
    }

    public unwrap(): T {
        return this.val
    }

    public unwrap_or<R>(val: R): T | R {
        const ret = this.unwrap();
        if(ret != null) return ret
        else return val;
    }

    public match(cases: matchCases<T, null>) {
        if(cases.Some && this.val != null){
            return cases.Some(this.unwrap());
        }
    }
}

export function Some<T>(v: T){
    return new Op<T>(v)
}

export class None extends Op<any>{
    static val: any = null;
    public static unwrap(): any {
        return null
    }

    public static unwrap_or<R>(val: R): R {
        return val;
    }

    public static match(cases: matchCases<any, any>) {
        if(cases.None){
            return cases.None();
        }
    }
}

export class Result<A,B>{
    private readonly val: A;
    private readonly error: B;
    constructor(val: A, error: B) {
        this.val = val;
        this.error = error;
    }

    public unwrap(): A {
        return this.val
    }

    public err(){
        return this.error
    }

    public match(cases: matchCases<A, B>){
        if(this.val != null){
            if(cases.Ok){
                return cases.Ok(this.unwrap());
            }
        } else if(cases.Err){
            return cases.Err(this.err());
        }

    }

    public unwrap_or(def: A): A {
        if(this.val != null) return this.val;
        else return def;
    }
}

export function Ok<T>(v: T){
    return new Result<T,any>(v, null);
}

export function Err<T>(e: T){
    return new Result<any,T>(null, e);
}















