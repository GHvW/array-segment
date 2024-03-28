
class ArraySegment<A> {

    array: Array<A>;
    from: number;
    to: number;

    constructor(array: Array<A>, from: number, to: number) {
        this.array = array;
        this.from = from;
        this.to = to;
    }

    slice(from: number, to: number | null = null) {
        if (to === null) {
            return new ArraySegment(this.array, )
        }
    }

    sliceEnd(to: number) {
        // todo bounds check
        return new ArraySegment(this.array, this.from, to);
    }

    sliceFront(from: number) {
        // todo bounds check
        return new ArraySegment(this.array, from, this.to);
    }
}

export function segmentOf<A>(
    array: Array<A>, 
    from: number = 0, 
    to: number | null = null
): ArraySegment<A> {
    return new ArraySegment(
        array, 
        from, 
        to === null 
            ? array.length - 1 
            : to);
}