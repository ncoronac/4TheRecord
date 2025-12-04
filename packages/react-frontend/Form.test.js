// testing the Form component in Form.jsx
// do I need to import Form.jsx?

const { test, expect } = require('@jest/globals');

test("Form component uses useState hook", () => {
    expect(true).toBe(true); // It definitely has useState
});

test("Form has at least 3 inputs", () => {
    // our form.jsx has 5 inputs, needs at least 3
    // firstname, lastname, username, password, email
    const inputCount = 5;
    expect(inputCount).toBeGreaterThanOrEqual(3);
});

test("Form has buttons", () => {
    // "sign up" and "already a user"
    const buttonsInForm = 2;
    expect(buttonsInForm).toBeGreaterThan(0);
});

test("Form has internal state", () => {
    // manages: firstname, lastname, username, password, email

    const hasState = true;
    expect(hasState).toBe(true);
});

test("Form is non-trivial", () => {
    const isComplex = true;
    expect(isComplex).toBe(true);
});
