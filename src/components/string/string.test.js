import { reverseString } from "./utils";

describe('String algorithm tests', () => {
  it('Should reverse string with even number of letters', () => {
    expect(reverseString('letter')).toEqual(['r', 'e', 't', 't', 'e', 'l']);
  });

  it('Should reverse string with odd number of letters', () => {
    expect(reverseString('hello')).toEqual(['o', 'l', 'l', 'e', 'h']);
  });

  it('Should reverse string with one character', () => {
    expect(reverseString('a')).toEqual(['a']);
  });

  it('Should reverse empty string', () => {
    expect(reverseString('')).toEqual([]);
  });
});