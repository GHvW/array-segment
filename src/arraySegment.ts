
class ArraySegment<A> {

    #backingArray: Array<A>;
    #from: number;
    #to: number;
    length: number;

    // from and to are inclusive for now
    constructor(backingArray: Array<A>, from: number, to: number) {
        this.#backingArray = backingArray;
        this.#from = from;
        this.#to = to;
        this.length = to - from + 1;
    }

    slice(from: number, to: number) {
        // todo bounds check
        return new ArraySegment(this.#backingArray, from, to);
    }

    sliceUpTo(to: number) {
        // todo bounds check
        return new ArraySegment(this.#backingArray, this.#from, to);
    }

    sliceFrom(from: number) {
        // todo bounds check
        return new ArraySegment(this.#backingArray, from, this.#to);
    }

    *[Symbol.iterator]() {
        for (let i = this.#from; i < this.#to; i++) {
            yield this.#backingArray[i];
        }
    }

    values() {
        return this[Symbol.iterator]();
    }

    get(index: number): A | undefined {
        if (this.#from + index > this.#backingArray.length) {
            return undefined;
        }

        return this.#backingArray[this.#from + index];
    }
}

class SegmentBuilder<A> {
    array: Array<A>;

    constructor(array: Array<A>) {
        this.array = array;
    }

    full(): ArraySegment<A> {
        return new ArraySegment(this.array, 0, this.array.length - 1);
    }

    from(from: number): ArraySegment<A> {
        return new ArraySegment(this.array, from, this.array.length - 1);
    }

    to(to: number): ArraySegment<A> {
        return new ArraySegment(this.array, 0, to);
    }
}

export function segmentOf<A>(array: Array<A>): SegmentBuilder<A> {
    return new SegmentBuilder(array);
}