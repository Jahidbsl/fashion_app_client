"use client";

import React, { useState } from "react";
import { Check } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const SignupPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";
    const image = formData.get("image")?.toString() || "";

    try {
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        image,
        callbackURL: "/",
      });

      if (error) {
        setErrorMessage(error.message || "Failed to sign up");
        return;
      }

      console.log("Signed up successfully:", data);
      setSuccessMessage("Account created successfully! Redirecting...");
      setTimeout(() => {
        router.push("/"); 
      }, 1000);
    } catch (err) {
      console.log("Signup error:", err);
      setErrorMessage("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-10 bg-content1 border border-divider rounded-2xl shadow-xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Create an Account</h2>
        <p className="text-sm text-default-500 mt-1">
          Enter your details to get started.
        </p>
      </div>

      <Form className="flex w-full flex-col gap-5" onSubmit={onSubmit}>
        <TextField isRequired name="name" type="text" maxLength={50}>
          <Label>Name</Label>
          <Input placeholder="John Doe" />
          <FieldError />
        </TextField>

        <TextField isRequired name="image" type="text" maxLength={250}>
          <Label>Image URL</Label>
          <Input placeholder="https://example.com/avatar.png" />
          <FieldError />
        </TextField>

        <TextField
          isRequired
          name="email"
          type="email"
          validate={(value) => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
              return "Please enter a valid email address";
            }
            return null;
          }}
        >
          <Label>Email</Label>
          <Input placeholder="john@example.com" />
          <FieldError />
        </TextField>

        <TextField
          isRequired
          minLength={8}
          name="password"
          type="password"
          validate={(value) => {
            if (value.length < 8) {
              return "Password must be at least 8 characters";
            }
            if (!/[A-Z]/.test(value)) {
              return "Password must contain at least one uppercase letter";
            }
            if (!/[0-9]/.test(value)) {
              return "Password must contain at least one number";
            }
            return null;
          }}
        >
          <Label>Password</Label>
          <Input placeholder="Enter your password" />
          <Description>
            Must be at least 8 characters with 1 uppercase and 1 number
          </Description>
          <FieldError />
        </TextField>

        {errorMessage && (
          <div className="text-sm font-medium bg-danger-50 text-danger p-3 rounded-lg border border-danger-200">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="text-sm font-medium bg-success-50 text-success p-3 rounded-lg border border-success-200">
            {successMessage}
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <Button
            type="submit"
            color="primary"
            isDisabled={isLoading}
            className="flex-1 font-medium py-2.5 rounded-xl"
          >
            <Check className="w-4 h-4 mr-1" />
            {isLoading ? "Signing up..." : "Submit"}
          </Button>
          <Button
            type="reset"
            variant="secondary"
            className="font-medium py-2.5 px-6 rounded-xl"
          >
            Reset
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SignupPage;
