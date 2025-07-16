"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sparkles, Mail, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await resetPassword(email);
      setSent(true);
    } catch (error) {
      console.error("Reset password error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background-secondary to-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl border-0 bg-background-tertiary/80 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="relative">
                <Sparkles className="h-12 w-12 text-accent" />
                <div className="absolute inset-0 bg-accent/20 rounded-full blur-lg" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">
              {sent ? "Check Your Email" : "Reset Password"}
            </CardTitle>
            <CardDescription className="text-foreground-secondary">
              {sent
                ? "We've sent a password reset link to your email address"
                : "Enter your email address and we'll send you a link to reset your password"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {sent ? (
              <div className="text-center space-y-4">
                <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                  <p className="text-sm text-foreground-secondary">
                    If an account with that email exists, you&apos;ll receive a
                    password reset link shortly. Check your spam folder if you
                    don&apos;t see it in your inbox.
                  </p>
                </div>

                <Button
                  onClick={() => {
                    setSent(false);
                    setEmail("");
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Send Another Email
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground-tertiary" />
                    <Input
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading}
                  variant="accent"
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </Button>
              </form>
            )}

            <div className="text-center">
              <Link
                href="/auth/signin"
                className="inline-flex items-center text-sm text-accent hover:text-accent-light transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Sign In
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;
