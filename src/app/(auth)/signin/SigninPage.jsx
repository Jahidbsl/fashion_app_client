"use client";

import React, { useState } from "react";
import { Check } from "@gravity-ui/icons";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const SigninPage = () => {
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
    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        setErrorMessage(error.message || "Failed to sign in");
        return;
      }

      console.log("Signed in successfully:", data);
      setSuccessMessage("Signed in successfully! Redirecting...");

      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (err) {
      console.error("Sign-in error:", err);
      setErrorMessage("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-10 bg-content1 border border-divider rounded-2xl shadow-xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Sign In</h2>
        <p className="text-sm text-default-500 mt-1">Enter your credentials to access your account.</p>
      </div>

      <Form className="flex w-full flex-col gap-5" onSubmit={onSubmit}>
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
        >
          <Label>Password</Label>
          <Input placeholder="Enter your password" />
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
            {isLoading ? "Signing in..." : "Sign In"}
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

export default SigninPage;