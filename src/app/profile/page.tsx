"use client";

import React, { useState } from "react";
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
import {
  User,
  Mail,
  Lock,
  Save,
  Eye,
  EyeOff,
  Bell,
  CreditCard,
  MapPin,
} from "lucide-react";
import { motion } from "framer-motion";

const ProfilePage = () => {
  const { currentUser, updateDisplayName, updatePassword } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [profileData, setProfileData] = useState({
    displayName: currentUser?.displayName || "",
    email: currentUser?.email || "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateDisplayName(profileData.displayName);
      setIsEditing(false);
    } catch (error) {
      console.error("Profile update error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    try {
      await updatePassword(passwordData.newPassword);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Password change error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Profile Settings
          </h1>
          <p className="text-lg text-foreground-secondary">
            Manage your account settings and preferences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <Card>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-accent/20 to-accent/10 rounded-full flex items-center justify-center">
                    <User className="h-10 w-10 text-accent" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold flex items-center space-x-2">
                  <User className="h-6 w-6" />
                  <span>{currentUser?.displayName || "User"}</span>
                </CardTitle>
                <CardDescription>{currentUser?.email}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-foreground-secondary mb-1">
                      Member Since
                    </h3>
                    <p className="text-foreground">
                      {currentUser?.metadata?.creationTime
                        ? new Date(
                            currentUser.metadata.creationTime
                          ).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-foreground-secondary mb-1">
                      Email Verified
                    </h3>
                    <p className="text-foreground">
                      {currentUser?.emailVerified ? "Yes" : "No"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Settings Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center">
                        <User className="h-5 w-5 mr-2" />
                        Profile Information
                      </CardTitle>
                      <CardDescription>
                        Update your personal information
                      </CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? "Cancel" : "Edit"}
                    </Button>
                  </div>
                </CardHeader>

                <CardContent>
                  <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Full Name
                      </label>
                      <Input
                        value={profileData.displayName}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            displayName: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Email Address
                      </label>
                      <Input
                        value={profileData.email}
                        disabled
                        className="bg-muted"
                      />
                      <p className="text-xs text-foreground-secondary">
                        Email cannot be changed. Contact support if needed.
                      </p>
                    </div>

                    {isEditing && (
                      <Button
                        type="submit"
                        disabled={loading}
                        variant="accent"
                        className="w-full"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        {loading ? "Saving..." : "Save Changes"}
                      </Button>
                    )}
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Change Password */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Lock className="h-5 w-5 mr-2" />
                    Change Password
                  </CardTitle>
                  <CardDescription>
                    Update your password to keep your account secure
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <form onSubmit={handlePasswordChange} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Current Password
                      </label>
                      <div className="relative">
                        <Input
                          type={showCurrentPassword ? "text" : "password"}
                          value={passwordData.currentPassword}
                          onChange={(e) =>
                            setPasswordData({
                              ...passwordData,
                              currentPassword: e.target.value,
                            })
                          }
                          placeholder="Enter current password"
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowCurrentPassword(!showCurrentPassword)
                          }
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground-tertiary hover:text-foreground transition-colors"
                        >
                          {showCurrentPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        New Password
                      </label>
                      <div className="relative">
                        <Input
                          type={showNewPassword ? "text" : "password"}
                          value={passwordData.newPassword}
                          onChange={(e) =>
                            setPasswordData({
                              ...passwordData,
                              newPassword: e.target.value,
                            })
                          }
                          placeholder="Enter new password"
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground-tertiary hover:text-foreground transition-colors"
                        >
                          {showNewPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Confirm New Password
                      </label>
                      <Input
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            confirmPassword: e.target.value,
                          })
                        }
                        placeholder="Confirm new password"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      variant="accent"
                      className="w-full"
                    >
                      <Lock className="h-4 w-4 mr-2" />
                      {loading ? "Updating..." : "Update Password"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Additional Settings */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="h-5 w-5 mr-2" />
                    Preferences
                  </CardTitle>
                  <CardDescription>
                    Manage your account preferences
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-background-secondary rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-accent" />
                      <span className="text-sm">Email Notifications</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-background-secondary rounded-lg">
                    <div className="flex items-center space-x-2">
                      <CreditCard className="h-4 w-4 text-accent" />
                      <span className="text-sm">Payment Methods</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-background-secondary rounded-lg">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-accent" />
                      <span className="text-sm">Shipping Addresses</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
