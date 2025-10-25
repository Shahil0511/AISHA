"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, User as UserIcon, Shield } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginFormData, SignupFormData } from "@/types/auth";
import { useSignupMutation } from "@/features/auth/api/authApi";

interface AuthModalsProps {
  isLoginOpen: boolean;
  setIsLoginOpen: (open: boolean) => void;
  isSignupOpen: boolean;
  setIsSignupOpen: (open: boolean) => void;
  setIsLoggedIn: (loggedIn: boolean) => void;
}



export function AuthModals({ 
  isLoginOpen, 
  setIsLoginOpen, 
  isSignupOpen, 
  setIsSignupOpen, 
  setIsLoggedIn 
}: AuthModalsProps) {
  // const [currentStep, setCurrentStep] = useState<"credentials" | "otp">("credentials");

  const loginForm = useForm<LoginFormData>();
  const signupForm = useForm<SignupFormData>();

  const [signup] = useSignupMutation();

  const handleLogin = (data: LoginFormData) => {
    console.log("Login data:", data);
    setIsLoggedIn(true);
    setIsLoginOpen(false);
    loginForm.reset();
  };

const handleSignup = async (data: SignupFormData) => {
     console.log("Calling signup with:", data); 
  // if (currentStep === "credentials") {
  //   setCurrentStep("otp");
  // } else {
    try {
      const response = await signup({
        name: data.name,
        email: data.email,
        password: data.password,
      }).unwrap();
      console.log("Signup success:", response);
      setIsLoggedIn(true);
      setIsSignupOpen(false);
      // setCurrentStep("credentials");
      signupForm.reset();
    } catch (error: any) {
      console.error("Signup failed:", error.data?.message || error.message);
    }
  // }
};

  const switchToSignup = () => {
    setIsLoginOpen(false);
    // setCurrentStep("credentials");
    setIsSignupOpen(true);
    loginForm.reset();
  };

  const switchToLogin = () => {
    setIsSignupOpen(false);
    // setCurrentStep("credentials");
    setIsLoginOpen(true);
    signupForm.reset();
  };

  const handleCloseSignup = (open: boolean) => {
    setIsSignupOpen(open);
    if (!open) {
      // setCurrentStep("credentials");
      signupForm.reset();
    }
  };

  const handleCloseLogin = (open: boolean) => {
    setIsLoginOpen(open);
    if (!open) {
      loginForm.reset();
    }
  };

  return (
    <>
      {/* Login Modal */}
      <Dialog open={isLoginOpen} onOpenChange={handleCloseLogin}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">Login to AI SHA</DialogTitle>
            <DialogDescription className="text-gray-400">
              Enter your credentials to access your account
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login-email" className="text-gray-300">Email or Phone Number</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  id="login-email"
                  type="text" 
                  placeholder="Enter email or phone number"
                  className="pl-10 bg-gray-800 border-gray-600 text-white"
                  required
                  {...loginForm.register("email", { required: true })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="login-password" className="text-gray-300">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  id="login-password"
                  type="password" 
                  placeholder="Enter your password"
                  className="pl-10 bg-gray-800 border-gray-600 text-white"
                  required
                  {...loginForm.register("password", { required: true })}
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
              Login
            </Button>

            <div className="text-center">
              <Button variant="link" type="button" onClick={switchToSignup} className="text-blue-400">
                Don't have an account? Sign up
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Signup Modal */}
      <Dialog open={isSignupOpen} onOpenChange={handleCloseSignup}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">
              {/* {currentStep === "credentials" ? "Create Account" : "Verify Your Account"} */} Create account
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              {/* {currentStep === "credentials" 
                ? "Fill in your details to create a new account" 
                : "Enter the OTP sent to your email/phone"
              } */}Fill in your details to create a new account
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={signupForm.handleSubmit(handleSignup)} className="space-y-4">
            {/* {currentStep === "credentials" ? ( */}
              <>
                <div className="space-y-2">
                  <Label htmlFor="signup-name" className="text-gray-300">Full Name</Label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      id="signup-name"
                      type="text" 
                      placeholder="Enter your full name"
                      className="pl-10 bg-gray-800 border-gray-600 text-white"
                      required
                      {...signupForm.register("name", { required: true })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-gray-300">Email or Phone Number</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      id="signup-email"
                      type="text" 
                      placeholder="Enter email or phone number"
                      className="pl-10 bg-gray-800 border-gray-600 text-white"
                      required
                      {...signupForm.register("email", { required: true })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-gray-300">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      id="signup-password"
                      type="password" 
                      placeholder="Create a password"
                      className="pl-10 bg-gray-800 border-gray-600 text-white"
                      required
                      {...signupForm.register("password", { required: true })}
                    />
                  </div>
                </div>
              </>
            {/* ) : (
              <OtpStep register={signupForm.register} />
            )} */}

            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
              {/* {currentStep === "credentials" ? "Continue" : "Verify & Create Account"} */}
              signup
            </Button>

            {/* {currentStep === "credentials" && ( */}
              <div className="text-center">
                <Button variant="link" type="button" onClick={switchToLogin} className="text-blue-400">
                  Already have an account? Login
                </Button>
              </div>
            {/* )} */}
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

interface OtpStepProps {
  register: any;
}

function OtpStep({ register }: OtpStepProps) {
  return (
    <>
      <div className="text-center mb-4">
        <Shield className="h-12 w-12 text-blue-500 mx-auto mb-2" />
        <h3 className="text-lg font-semibold text-white">Verify Your Account</h3>
        <p className="text-gray-400 text-sm">Enter the OTP sent to your email/phone</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="otp" className="text-gray-300">OTP Code</Label>
        <div className="relative">
          <Shield className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input 
            id="otp"
            type="text" 
            placeholder="Enter 6-digit OTP"
            className="pl-10 bg-gray-800 border-gray-600 text-white text-center text-lg tracking-widest"
            maxLength={6}
            required
            {...register("otp", { required: true, minLength: 6, maxLength: 6 })}
          />
        </div>
      </div>

      <p className="text-sm text-gray-400 text-center">
        Didn't receive OTP? <Button variant="link" type="button" className="text-blue-400 p-0 h-auto">Resend</Button>
      </p>
    </>
  );
}