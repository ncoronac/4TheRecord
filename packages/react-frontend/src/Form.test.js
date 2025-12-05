// testing the Form component in Form.jsx

import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Form from "./Form.jsx";

import { test, expect, describe } from "@jest/globals";

describe("Form Component", () => {
    test("Form renders with inputs", () => {
        render(<Form />);

        // Test for specific input fields
        expect(
            screen.getByLabelText(/first name/i) ||
                screen.getByPlaceholderText(/first name/i)
        ).toBeInTheDocument();
        expect(
            screen.getByLabelText(/last name/i) ||
                screen.getByPlaceholderText(/last name/i)
        ).toBeInTheDocument();
        expect(
            screen.getByLabelText(/username/i) ||
                screen.getByPlaceholderText(/username/i)
        ).toBeInTheDocument();
        expect(
            screen.getByLabelText(/password/i) ||
                screen.getByPlaceholderText(/password/i)
        ).toBeInTheDocument();
        expect(
            screen.getByLabelText(/email/i) ||
                screen.getByPlaceholderText(/email/i)
        ).toBeInTheDocument();
    });

    test("Form has at least 3 inputs", () => {
        render(<Form />);
        const inputs = screen.getAllByRole("textbox");
        const passwordInput = screen.getByLabelText(/password/i);
        const allInputs = [...inputs, passwordInput].filter(Boolean);

        expect(allInputs.length).toBeGreaterThanOrEqual(3);
    });

    test("Form has buttons", () => {
        render(<Form />);
        const buttons = screen.getAllByRole("button");
        expect(buttons.length).toBeGreaterThan(0);
    });

    test("Form state updates on input", async () => {
        render(<Form />);
        const user = userEvent.setup();

        const firstNameInput =
            screen.getByLabelText(/first name/i) ||
            screen.getByPlaceholderText(/first name/i);

        if (firstNameInput) {
            await user.type(firstNameInput, "John");
            expect(firstNameInput.value).toBe("John");
        }
    });

    test("Form submission", async () => {
        render(<Form />);
        const user = userEvent.setup();

        // Fill out form
        const firstNameInput =
            screen.getByLabelText(/first name/i) ||
            screen.getByPlaceholderText(/first name/i);
        const submitButton = screen.getByRole("button", { name: /sign up/i });

        if (firstNameInput && submitButton) {
            await user.type(firstNameInput, "John");
            await user.click(submitButton);

            // need to add expectations for submission behavior
        }
    });
});
