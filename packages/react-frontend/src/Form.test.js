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

// Mock useNavigate
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const testUser = {
  firstname: "John",
  lastname: "Doe",
  username: "johndoe",
  pwd: "password123",
  email: "john@example.com",
};

describe("Form component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the form correctly with all fields", () => {
    const mockHandleSubmit = jest.fn();
    render(<Form handleSubmit={mockHandleSubmit} />);

    // Check all form fields
    expect(screen.getByLabelText("First Name*")).toBeInTheDocument();
    expect(screen.getByLabelText("Last Name*")).toBeInTheDocument();
    expect(screen.getByLabelText("Username*")).toBeInTheDocument();
    expect(screen.getByLabelText("Password*")).toBeInTheDocument();
    expect(screen.getByLabelText("Email*")).toBeInTheDocument();
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
    expect(screen.getByText("Already a User?")).toBeInTheDocument();
  });

  test("inputs accept values", () => {
    const mockHandleSubmit = jest.fn();
    render(<Form handleSubmit={mockHandleSubmit} />);
    
    // Fill all form fields
    fireEvent.change(screen.getByLabelText("First Name*"), { 
      target: { value: testUser.firstname } 
    });
    fireEvent.change(screen.getByLabelText("Last Name*"), { 
      target: { value: testUser.lastname } 
    });
    fireEvent.change(screen.getByLabelText("Username*"), { 
      target: { value: testUser.username } 
    });
    fireEvent.change(screen.getByLabelText("Password*"), { 
      target: { value: testUser.pwd } 
    });
    fireEvent.change(screen.getByLabelText("Email*"), { 
      target: { value: testUser.email } 
    });

    // Verify all values
    expect(screen.getByLabelText("First Name*")).toHaveValue(testUser.firstname);
    expect(screen.getByLabelText("Last Name*")).toHaveValue(testUser.lastname);
    expect(screen.getByLabelText("Username*")).toHaveValue(testUser.username);
    expect(screen.getByLabelText("Password*")).toHaveValue(testUser.pwd);
    expect(screen.getByLabelText("Email*")).toHaveValue(testUser.email);
  });

  test("handles form submission and resets fields", () => {
    const mockHandleSubmit = jest.fn();
    console.log = jest.fn(); // Mock console.log
    
    render(<Form handleSubmit={mockHandleSubmit} />);

    // Fill form
    fireEvent.change(screen.getByLabelText("First Name*"), { 
      target: { value: testUser.firstname } 
    });
    fireEvent.change(screen.getByLabelText("Last Name*"), { 
      target: { value: testUser.lastname } 
    });
    fireEvent.change(screen.getByLabelText("Username*"), { 
      target: { value: testUser.username } 
    });
    fireEvent.change(screen.getByLabelText("Password*"), { 
      target: { value: testUser.pwd } 
    });
    fireEvent.change(screen.getByLabelText("Email*"), { 
      target: { value: testUser.email } 
    });

    // Submit form - find the first submit button (Sign Up)
    const submitButtons = screen.getAllByRole("button");
    fireEvent.click(submitButtons[0]); // Click "Sign Up" button

    // Check handleSubmit called with correct data
    expect(mockHandleSubmit).toHaveBeenCalledWith(testUser);
    
    // Check console.log was called
    expect(console.log).toHaveBeenCalledWith(testUser);

    // Check fields reset
    expect(screen.getByLabelText("First Name*")).toHaveValue("");
    expect(screen.getByLabelText("Last Name*")).toHaveValue("");
    expect(screen.getByLabelText("Username*")).toHaveValue("");
    expect(screen.getByLabelText("Password*")).toHaveValue("");
    expect(screen.getByLabelText("Email*")).toHaveValue("");

    // Check navigation called
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  test("handleChange updates correct field based on name", () => {
    const mockHandleSubmit = jest.fn();
    render(<Form handleSubmit={mockHandleSubmit} />);
    
    // Test each field individually
    const firstNameInput = screen.getByLabelText("First Name*");
    fireEvent.change(firstNameInput, { target: { name: "firstname", value: "John" } });
    expect(firstNameInput).toHaveValue("John");

    const usernameInput = screen.getByLabelText("Username*");
    fireEvent.change(usernameInput, { target: { name: "username", value: "johndoe" } });
    expect(usernameInput).toHaveValue("johndoe");

    const passwordInput = screen.getByLabelText("Password*");
    fireEvent.change(passwordInput, { target: { name: "password", value: "pass123" } });
    expect(passwordInput).toHaveValue("pass123");
  });

  test("Already a User button triggers navigation", () => {
    const mockHandleSubmit = jest.fn();
    render(<Form handleSubmit={mockHandleSubmit} />);
    
    // Find the "Already a User?" button (second button)
    const buttons = screen.getAllByRole("button");
    const alreadyUserButton = buttons[1]; // Second button
    
    fireEvent.click(alreadyUserButton);
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});