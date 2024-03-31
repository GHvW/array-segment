import { describe, test, expect } from "vitest";
import { segmentOf } from "../src/arraySegment";

describe("given a backing array", () => {
    const backingArray = [1, 2, 3, 4, 5];

    describe("and an array segment that uses the full backing array", () => {
        const segment = segmentOf(backingArray).full();

        test("when converted to an array is the same as the backing array", () => {
            expect([...segment]).toEqual(backingArray);           
        });

        test("when accessing the first element", () => {
            expect(segment.at(0)).toBe(1);
        });

        test("when accessing the last element", () => {
            expect(segment.at(backingArray.length - 1)).toBe(5);
        });
    });

    describe("and an array segment that skips the first item in the backingArray", () => {
        const segment = segmentOf(backingArray).from(1);

        test("when converted to an array, is the same as the backing array starting from the second element", () => {
            expect([...segment]).toEqual([2, 3, 4, 5]);
        });

        test("when accessing the first element", () => {
            expect(segment.at(0)).toBe(2);
        });

        test("when accessing the last element", () => {
            expect(segment.at(3)).toBe(5);
        });

        test("when using an index that is out of bounds", () => {
            expect(segment.at(4)).toBeUndefined();
        });

        test("when using a netgative index that is out of bounds", () => {
            expect(segment.at(-5)).toBeUndefined();
        });

        test("when using a netgative index to get the last item", () => {
            expect(segment.at(-1)).toBe(5);
        });

        test("when using a netgative index to get the first item", () => {
            expect(segment.at(-4)).toBe(2);
        });

        test("when getting the length", () => {
            expect(segment.length).toBe(4);
        });
    });

    describe("and an array segment that deosn't use the last item in the backingArray", () => {
        const segment = segmentOf(backingArray).to(backingArray.length - 2);

        test("when converted to an array, is the same as the backing array without the last element", () => {
            expect([...segment]).toEqual([1, 2, 3, 4]);
        });

        test("when accessing the first element, the result matches the first element of the backing array", () => {
            expect(segment.at(0)).toBe(1);
        });

        test("when accessing the last element", () => {
            expect(segment.at(3)).toBe(4);
        });

        test("when using an index that is out of bounds", () => {
            expect(segment.at(4)).toBeUndefined();
        });

        test("when using a netgative index that is out of bounds", () => {
            expect(segment.at(-5)).toBeUndefined();
        });

        test("when using a netgative index to get the last item", () => {
            expect(segment.at(-1)).toBe(4);
        });

        test("when using a netgative index to get the first item", () => {
            expect(segment.at(-4)).toBe(1);
        });

        test("when getting the length", () => {
            expect(segment.length).toBe(4);
        });
    });
});