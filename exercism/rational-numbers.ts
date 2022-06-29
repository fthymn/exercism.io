const commonDivisor = (numerator: number, denominator: number): number =>
  denominator ? commonDivisor(denominator, numerator % denominator) : numerator;

const avoidMinusZero = (x: number) => (x ? x : 0);

export class Rational {
  numerator: number;
  denominator: number;

  constructor(numerator: number, denominator: number) {
    const gcd = commonDivisor(numerator, denominator);
    this.numerator = avoidMinusZero(numerator / gcd);
    this.denominator = avoidMinusZero(denominator / gcd);
  }

  add(param: Rational) {
    let numerator =
      this.numerator * param.denominator + param.numerator * this.denominator;
    let denominator = this.denominator * param.denominator;

    return new Rational(numerator, denominator);
  }

  sub(param: Rational) {
    return this.add(new Rational(-param.numerator, param.denominator));
  }

  mul(param: Rational) {
    return new Rational(
      this.numerator * param.numerator,
      this.denominator * param.denominator
    );
  }

  div(param: Rational) {
    return new Rational(
      this.numerator * param.denominator,
      param.numerator * this.denominator
    );
  }

  abs() {
    return new Rational(Math.abs(this.numerator), Math.abs(this.denominator));
  }

  exprational(power: number) {
    return new Rational(this.numerator ** power, this.denominator ** power);
  }

  expreal(n: number) {
    return 10.0 ** (Math.log10(n ** this.numerator) / this.denominator);
  }

  reduce() {
    return this;
  }
}

/*
Instructions
A rational number is defined as the quotient of two integers a and b, called the numerator and denominator, respectively, where b != 0.

The absolute value |r| of the rational number r = a/b is equal to |a|/|b|.

The sum of two rational numbers r₁ = a₁/b₁ and r₂ = a₂/b₂ is r₁ + r₂ = a₁/b₁ + a₂/b₂ = (a₁ * b₂ + a₂ * b₁) / (b₁ * b₂).

The difference of two rational numbers r₁ = a₁/b₁ and r₂ = a₂/b₂ is r₁ - r₂ = a₁/b₁ - a₂/b₂ = (a₁ * b₂ - a₂ * b₁) / (b₁ * b₂).

The product (multiplication) of two rational numbers r₁ = a₁/b₁ and r₂ = a₂/b₂ is r₁ * r₂ = (a₁ * a₂) / (b₁ * b₂).

Dividing a rational number r₁ = a₁/b₁ by another r₂ = a₂/b₂ is r₁ / r₂ = (a₁ * b₂) / (a₂ * b₁) if a₂ is not zero.

Exponentiation of a rational number r = a/b to a non-negative integer power n is r^n = (a^n)/(b^n).

Exponentiation of a rational number r = a/b to a negative integer power n is r^n = (b^m)/(a^m), where m = |n|.

Exponentiation of a rational number r = a/b to a real (floating-point) number x is the quotient (a^x)/(b^x), which is a real number.

Exponentiation of a real number x to a rational number r = a/b is x^(a/b) = root(x^a, b), where root(p, q) is the qth root of p.

Implement the following operations:

addition, subtraction, multiplication and division of two rational numbers,
absolute value, exponentiation of a given rational number to an integer power, exponentiation of a given rational number to a real (floating-point) power, exponentiation of a real number to a rational number.
Your implementation of rational numbers should always be reduced to lowest terms. For example, 4/4 should reduce to 1/1, 30/60 should reduce to 1/2, 12/8 should reduce to 3/2, etc. To reduce a rational number r = a/b, divide a and b by the greatest common divisor (gcd) of a and b. So, for example, gcd(12, 8) = 4, so r = 12/8 can be reduced to (12/4)/(8/4) = 3/2.

Assume that the programming language you are using does not have an implementation of rational numbers.

tests

describe('Addition', () => {
  it('Add two positive rational numbers', () => {
    const expected = new Rational(7, 6)
    expect(new Rational(1, 2).add(new Rational(2, 3))).toEqual(expected)
  })
  xit('Add a positive rational number and a negative rational number', () => {
    const expected = new Rational(-1, 6)
    expect(new Rational(1, 2).add(new Rational(-2, 3))).toEqual(expected)
  })
  xit('Add two negative rational numbers', () => {
    const expected = new Rational(-7, 6)
    expect(new Rational(-1, 2).add(new Rational(-2, 3))).toEqual(expected)
  })
  xit('Add a rational number to its additive inverse', () => {
    const expected = new Rational(0, 1)
    expect(new Rational(1, 2).add(new Rational(-1, 2))).toEqual(expected)
  })
})
describe('Subtraction', () => {
  xit('Subtract two positive rational numbers', () => {
    const expected = new Rational(-1, 6)
    expect(new Rational(1, 2).sub(new Rational(2, 3))).toEqual(expected)
  })
  xit('Subtract a positive rational number and a negative rational number', () => {
    const expected = new Rational(7, 6)
    expect(new Rational(1, 2).sub(new Rational(-2, 3))).toEqual(expected)
  })
  xit('Subtract two negative rational numbers', () => {
    const expected = new Rational(1, 6)
    expect(new Rational(-1, 2).sub(new Rational(-2, 3))).toEqual(expected)
  })
  xit('Subtract a rational number from itself', () => {
    const expected = new Rational(0, 1)
    expect(new Rational(1, 2).sub(new Rational(1, 2))).toEqual(expected)
  })
})
describe('Multiplication', () => {
  xit('Multiply two positive rational numbers', () => {
    const expected = new Rational(1, 3)
    expect(new Rational(1, 2).mul(new Rational(2, 3))).toEqual(expected)
  })
  xit('Multiply a negative rational number by a positive rational number', () => {
    const expected = new Rational(-1, 3)
    expect(new Rational(-1, 2).mul(new Rational(2, 3))).toEqual(expected)
  })
  xit('Multiply two negative rational numbers', () => {
    const expected = new Rational(1, 3)
    expect(new Rational(-1, 2).mul(new Rational(-2, 3))).toEqual(expected)
  })
  xit('Multiply a rational number by its reciprocal', () => {
    const expected = new Rational(1, 1)
    expect(new Rational(1, 2).mul(new Rational(2, 1))).toEqual(expected)
  })
  xit('Multiply a rational number by 1', () => {
    const expected = new Rational(1, 2)
    expect(new Rational(1, 2).mul(new Rational(1, 1))).toEqual(expected)
  })
  xit('Multiply a rational number by 0', () => {
    const expected = new Rational(0, 1)
    expect(new Rational(1, 2).mul(new Rational(0, 1))).toEqual(expected)
  })
})
describe('Division', () => {
  xit('Divide two positive rational numbers', () => {
    const expected = new Rational(3, 4)
    expect(new Rational(1, 2).div(new Rational(2, 3))).toEqual(expected)
  })
  xit('Divide a positive rational number by a negative rational number', () => {
    const expected = new Rational(-3, 4)
    expect(new Rational(1, 2).div(new Rational(-2, 3))).toEqual(expected)
  })
  xit('Divide two negative rational numbers', () => {
    const expected = new Rational(3, 4)
    expect(new Rational(-1, 2).div(new Rational(-2, 3))).toEqual(expected)
  })
  xit('Divide a rational number by 1', () => {
    const expected = new Rational(1, 2)
    expect(new Rational(1, 2).div(new Rational(1, 1))).toEqual(expected)
  })
})
describe('Absolute value', () => {
  xit('Absolute value of a positive rational number', () => {
    const expected = new Rational(1, 2)
    expect(new Rational(1, 2).abs()).toEqual(expected)
  })
  xit('Absolute value of a negative rational number', () => {
    const expected = new Rational(1, 2)
    expect(new Rational(-1, 2).abs()).toEqual(expected)
  })
  xit('Absolute value of zero', () => {
    const expected = new Rational(0, 1)
    expect(new Rational(0, 1).abs()).toEqual(expected)
  })
})
describe('Exponentiation of a rational number', () => {
  xit('Raise a positive rational number to a positive integer power', () => {
    const expected = new Rational(1, 8)
    expect(new Rational(1, 2).exprational(3)).toEqual(expected)
  })
  xit('Raise a negative rational number to a positive integer power', () => {
    const expected = new Rational(-1, 8)
    expect(new Rational(-1, 2).exprational(3)).toEqual(expected)
  })
  xit('Raise zero to an integer power', () => {
    const expected = new Rational(0, 1)
    expect(new Rational(0, 1).exprational(5)).toEqual(expected)
  })
  xit('Raise one to an integer power', () => {
    const expected = new Rational(1, 1)
    expect(new Rational(1, 1).exprational(4)).toEqual(expected)
  })
  xit('Raise a positive rational number to the power of zero', () => {
    const expected = new Rational(1, 1)
    expect(new Rational(1, 2).exprational(0)).toEqual(expected)
  })
  xit('Raise a negative rational number to the power of zero', () => {
    const expected = new Rational(1, 1)
    expect(new Rational(-1, 2).exprational(0)).toEqual(expected)
  })
})
describe('Exponentiation of a real number to a rational number', () => {
  xit('Raise a real number to a positive rational number', () => {
    const expected = 16.0
    expect(new Rational(4, 3).expreal(8)).toEqual(expected)
  })
  xit('Raise a real number to a negative rational number', () => {
    const expected = 1.0 / 3.0
    expect(new Rational(-1, 2).expreal(9)).toBeCloseTo(expected, 15)
  })
  xit('Raise a real number to a zero rational number', () => {
    const expected = 1.0
    expect(new Rational(0, 1).expreal(2)).toEqual(expected)
  })
})
describe('Reduction to lowest terms', () => {
  xit('Reduce a positive rational number to lowest terms', () => {
    const expected = new Rational(1, 2)
    expect(new Rational(2, 4).reduce()).toEqual(expected)
  })
  xit('Reduce a negative rational number to lowest terms', () => {
    const expected = new Rational(-2, 3)
    expect(new Rational(-4, 6).reduce()).toEqual(expected)
  })
  xit('Reduce a rational number with a negative denominator to lowest terms', () => {
    const expected = new Rational(-1, 3)
    expect(new Rational(3, -9).reduce()).toEqual(expected)
  })
  xit('Reduce zero to lowest terms', () => {
    const expected = new Rational(0, 1)
    expect(new Rational(0, 6).reduce()).toEqual(expected)
  })
  xit('Reduce an integer to lowest terms', () => {
    const expected = new Rational(-2, 1)
    expect(new Rational(-14, 7).reduce()).toEqual(expected)
  })
  xit('Reduce one to lowest terms', () => {
    const expected = new Rational(1, 1)
    expect(new Rational(13, 13).reduce()).toEqual(expected)
  })
})

*/
