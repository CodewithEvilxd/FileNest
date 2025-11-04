"use client";

import { useSignUp } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { getErrorMessage } from "@/lib/formUtils";
import { signUpSchema } from "@/schemas/signUpSchema";
import { Button } from "./ui/button";
import { ErrorAlert } from "./ui/error-alert";
import { Input } from "./ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "./ui/input-otp";
import { Label } from "./ui/label";
import { LoadingSpinner } from "./ui/loading-spinner";
import { PasswordToggle } from "./ui/password-toggle";

type SignUpFormData = z.infer<typeof signUpSchema>;

// Custom hook for form state management
const useSignUpFormState = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const clearErrors = useCallback(() => {
    setAuthError(null);
    setVerificationError(null);
  }, []);

  const resetVerification = useCallback(() => {
    setVerificationCode("");
    setVerificationError(null);
  }, []);

  return {
    isSubmitting,
    setIsSubmitting,
    authError,
    setAuthError,
    verifying,
    setVerifying,
    verificationCode,
    setVerificationCode,
    verificationError,
    setVerificationError,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    clearErrors,
    resetVerification,
  };
};

export default function SignUpForm() {
  const router = useRouter();
  const { signUp, isLoaded, setActive } = useSignUp();
  const state = useSignUpFormState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  // Enhanced submit handler with better error handling
  const onSubmit = useCallback(async (data: SignUpFormData) => {
    if (!isLoaded || !signUp) return;

    state.setIsSubmitting(true);
    state.clearErrors();

    try {
      // Create the user
      await signUp.create({
        emailAddress: data.email,
        password: data.password,
      });

      // Prepare email verification
      await signUp.prepareEmailAddressVerification({ 
        strategy: "email_code" 
      });
      
      state.setVerifying(true);
    } catch (error: any) {
      const errorMessage = getErrorMessage(error);
      state.setAuthError(errorMessage);
    } finally {
      state.setIsSubmitting(false);
    }
  }, [isLoaded, signUp, state]);

  // Enhanced verification handler
  const handleVerificationSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoaded || !signUp) return;

    state.setIsSubmitting(true);
    state.setVerificationError(null);

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code: state.verificationCode,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/dashboard");
      } else {
        state.setVerificationError(
          "Verification could not be completed. Please try again."
        );
      }
    } catch (error: any) {
      const errorMessage = getErrorMessage(error);
      state.setVerificationError(errorMessage);
    } finally {
      state.setIsSubmitting(false);
    }
  }, [isLoaded, signUp, setActive, router, state]);

  // OTP change handler with auto-submit
  const handleOTPChange = useCallback((value: string) => {
    state.setVerificationCode(value);
    
    // Auto-submit when 6 digits are entered
    if (value.length === 6 && !state.isSubmitting) {
      setTimeout(() => {
        const form = document.getElementById('verification-form') as HTMLFormElement;
        form?.requestSubmit();
      }, 100);
    }
  }, [state]);

  // Resend verification code
  const handleResendCode = useCallback(async () => {
    if (!signUp) return;
    
    try {
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });
      state.resetVerification();
    } catch (error: any) {
      const errorMessage = getErrorMessage(error);
      state.setVerificationError(errorMessage);
    }
  }, [signUp, state]);

  // Password toggle handlers
  const togglePassword = useCallback(() => {
    state.setShowPassword(prev => !prev);
  }, [state]);

  const toggleConfirmPassword = useCallback(() => {
    state.setShowConfirmPassword(prev => !prev);
  }, [state]);

  // Verification form JSX
  if (state.verifying) {
    return (
      <div className="mx-auto flex flex-col justify-center space-y-8 w-[420px] p-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-2xl rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl">
        <div className="flex flex-col space-y-4 text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 via-blue-600 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-green-600 via-blue-600 to-purple-500 bg-clip-text text-transparent">
              Verify Your Email
            </h1>
            <p className="text-gray-600 dark:text-gray-300 font-medium">
              We've sent a verification code to your email
            </p>
          </div>
        </div>

        <ErrorAlert error={state.verificationError} />

        <div className="grid gap-6">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Verify Your Email
          </h1>
          <p className="text-sm text-muted-foreground">
            We've sent a verification code to your email
          </p>
        </div>

        <ErrorAlert error={state.verificationError} />

        <div className="grid gap-6">
          <form 
            id="verification-form" 
            onSubmit={handleVerificationSubmit} 
            className="grid gap-4"
          >
            <div className="grid gap-4">
              <Label htmlFor="verificationCode" className="text-center">
                Verification Code
              </Label>
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={state.verificationCode}
                  onChange={handleOTPChange}
                  disabled={state.isSubmitting}
                  autoFocus
                >
                  <InputOTPGroup>
                    {Array.from({ length: 6 }, (_, i) => (
                      <InputOTPSlot key={i} index={i} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Enter the 6-digit code sent to your email
              </p>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={state.isSubmitting || state.verificationCode.length !== 6}
            >
              {state.isSubmitting && <LoadingSpinner className="mr-2" />}
              {state.isSubmitting ? "Verifying..." : "Verify Email"}
            </Button>
          </form>
        </div>

          <p className="px-8 text-center text-sm text-muted-foreground">
            Didn't receive a code?{" "}
            <button
              onClick={handleResendCode}
              className="hover:text-brand underline underline-offset-4"
              disabled={state.isSubmitting}
            >
              Resend code
            </button>
          </p>
        </div>
      </div>
    );
  }

  // Main signup form JSX
  return (
    <div className="mx-auto flex flex-col justify-center space-y-8 w-[420px] p-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-2xl rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl hover:shadow-3xl transition-all duration-500">
      <div className="flex flex-col space-y-4 text-center">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 via-blue-600 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
          </svg>
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-green-600 via-blue-600 to-purple-500 bg-clip-text text-transparent mb-2">
            Create your account
          </h1>
          <p className="text-gray-600 dark:text-gray-300 font-medium text-lg">
            Join FileNest and start storing securely
          </p>
        </div>
      </div>

      <ErrorAlert error={state.authError} />

      <div className="grid gap-8">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create your account
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your details to create your account
        </p>
      </div>

      <ErrorAlert error={state.authError} />

      <div className="grid gap-6">
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              {...register("email")}
              disabled={state.isSubmitting}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={state.showPassword ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete="new-password"
                {...register("password")}
                className="pr-10"
                disabled={state.isSubmitting}
              />
              <PasswordToggle
                show={state.showPassword}
                onToggle={togglePassword}
                disabled={state.isSubmitting}
              />
            </div>
            {errors.password && (
              <p className="text-sm text-destructive">{errors.password.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="passwordConfirmation">Confirm Password</Label>
            <div className="relative">
              <Input
                id="passwordConfirmation"
                type={state.showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                autoComplete="new-password"
                {...register("passwordConfirmation")}
                className="pr-10"
                disabled={state.isSubmitting}
              />
              <PasswordToggle
                show={state.showConfirmPassword}
                onToggle={toggleConfirmPassword}
                disabled={state.isSubmitting}
              />
            </div>
            {errors.passwordConfirmation && (
              <p className="text-sm text-destructive">{errors.passwordConfirmation.message}</p>
            )}
          </div>

          <div id="clerk-captcha" className="mx-auto"></div>
          
          <Button type="submit" className="w-full h-14 bg-gradient-to-r from-green-600 via-blue-600 to-purple-500 hover:from-green-700 hover:via-blue-700 hover:to-purple-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1" disabled={state.isSubmitting}>
            {state.isSubmitting && <LoadingSpinner className="mr-2" />}
            {state.isSubmitting ? "Creating account..." : "Create Account"}
          </Button>
        </form>
      </div>

        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/sign-in"
            className="hover:text-brand underline underline-offset-4"
          >
            Already have an account? Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}