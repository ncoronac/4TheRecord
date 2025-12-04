// testing the Form component in Form.jsx
// call render
// import Form.jsx
// test form inputs to get 100% coverage
// test that inputs actually get to a destination

import { TextEncoder, TextDecoder } from "util";
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Form } from "./Form";
import "@testing-library/jest-dom";

// Mock useNavigate from react-router-dom
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}));

// Test user data
const testUser = {
    firstname: "John",
    lastname: "Doe",
    email: "john@example.com",
};

describe("Form component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders the form correctly", () => {
        render(<Form handleSubmitPerson={() => {}} />);

        expect(screen.getByLabelText("First Name*")).toBeInTheDocument();
        expect(screen.getByLabelText("Last Name*")).toBeInTheDocument();
        expect(screen.getByLabelText("Email*")).toBeInTheDocument();
        expect(screen.getByText("Sign Up")).toBeInTheDocument();
        expect(screen.getByText("Already a User?")).toBeInTheDocument();
    });

    test("inputs accept values", () => {
        render(<Form handleSubmitPerson={() => {}} />);
        fireEvent.change(screen.getByLabelText("First Name*"), { target: { value: testUser.firstname } });
        fireEvent.change(screen.getByLabelText("Last Name*"), { target: { value: testUser.lastname } });
        fireEvent.change(screen.getByLabelText("Email*"), { target: { value: testUser.email } });

        expect(screen.getByLabelText("First Name*")).toHaveValue(testUser.firstname);
        expect(screen.getByLabelText("Last Name*")).toHaveValue(testUser.lastname);
        expect(screen.getByLabelText("Email*")).toHaveValue(testUser.email);
    });

    test("handles form submission and resets fields", () => {
        const mockHandleSubmit = jest.fn();
        const localStorageMock = { setItem: jest.fn() };
        Object.defineProperty(window, "localStorage", { value: localStorageMock });

        render(<Form handleSubmitPerson={mockHandleSubmit} />);

        // Fill form
        fireEvent.change(screen.getByLabelText("First Name*"), { target: { value: testUser.firstname } });
        fireEvent.change(screen.getByLabelText("Last Name*"), { target: { value: testUser.lastname } });
        fireEvent.change(screen.getByLabelText("Email*"), { target: { value: testUser.email } });

        // Submit form
        fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

        // Check handleSubmitPerson called
        expect(mockHandleSubmit).toHaveBeenCalledWith(testUser);

        // Check localStorage called
        expect(localStorageMock.setItem).toHaveBeenCalledWith(
            "currentUser",
            JSON.stringify(testUser)
        );

        // Check fields reset
        expect(screen.getByLabelText("First Name*")).toHaveValue("");
        expect(screen.getByLabelText("Last Name*")).toHaveValue("");
        expect(screen.getByLabelText("Email*")).toHaveValue("");

        // Check navigation called
        expect(mockNavigate).toHaveBeenCalledWith("/DailyView");
    });

    test("Already a User button triggers navigation", () => {
        render(<Form handleSubmitPerson={() => {}} />);
        const button = screen.getByText("Already a User?");
        fireEvent.click(button);
        expect(mockNavigate).toHaveBeenCalledWith("/");
    });
});
