"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Package,
  Heart,
  Settings,
  LogOut,
  Edit,
  Save,
  X,
} from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

const orderHistory = [
  {
    id: "ORD-001",
    date: "2024-01-15",
    status: "Delivered",
    total: 1299,
    items: 3,
  },
  {
    id: "ORD-002",
    date: "2024-01-10",
    status: "Shipped",
    total: 899,
    items: 2,
  },
  {
    id: "ORD-003",
    date: "2024-01-05",
    status: "Processing",
    total: 599,
    items: 1,
  },
];

const wishlistItems = [
  {
    id: 1,
    name: "Premium Sparklers Pack",
    price: 299,
    image: "/placeholder.svg?height=80&width=80",
    inStock: true,
  },
  {
    id: 2,
    name: "Aerial Shell Collection",
    price: 899,
    image: "/placeholder.svg?height=80&width=80",
    inStock: false,
  },
];

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+91 9876543210",
    address: "123 Main Street, City, State 12345",
  });

  const handleSave = () => {
    setIsEditing(false);
    toast("Profile updated", {
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleLogout = () => {
    toast("Logged out", {
      description: "You have been successfully logged out.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">My Account</h1>
          <p className="text-gray-600">
            Manage your profile, orders, and preferences
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <User className="w-5 h-5" />
                      <span>Profile Information</span>
                    </CardTitle>
                    <CardDescription>
                      Update your personal information and contact details
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() =>
                      isEditing ? handleSave() : setIsEditing(true)
                    }
                  >
                    {isEditing ? (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </>
                    ) : (
                      <>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={userInfo.firstName}
                      onChange={(e) =>
                        setUserInfo({ ...userInfo, firstName: e.target.value })
                      }
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={userInfo.lastName}
                      onChange={(e) =>
                        setUserInfo({ ...userInfo, lastName: e.target.value })
                      }
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      value={userInfo.email}
                      onChange={(e) =>
                        setUserInfo({ ...userInfo, email: e.target.value })
                      }
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="phone"
                      value={userInfo.phone}
                      onChange={(e) =>
                        setUserInfo({ ...userInfo, phone: e.target.value })
                      }
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                    <textarea
                      id="address"
                      value={userInfo.address}
                      onChange={(e) =>
                        setUserInfo({ ...userInfo, address: e.target.value })
                      }
                      disabled={!isEditing}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                      rows={3}
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="flex space-x-4">
                    <Button
                      onClick={handleSave}
                      className="bg-black hover:bg-gray-800"
                    >
                      Save Changes
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="w-5 h-5" />
                  <span>Order History</span>
                </CardTitle>
                <CardDescription>
                  Track your recent orders and purchases
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderHistory.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-4">
                          <span className="font-semibold">{order.id}</span>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </div>
                        <span className="font-bold">₹{order.total}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Ordered on {order.date}</span>
                        <span>{order.items} items</span>
                      </div>
                      <div className="mt-3 flex space-x-2">
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                        {order.status === "Delivered" && (
                          <Button size="sm" variant="outline">
                            Reorder
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Wishlist Tab */}
          <TabsContent value="wishlist">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="w-5 h-5" />
                  <span>My Wishlist</span>
                </CardTitle>
                <CardDescription>
                  Items you&apos;ve saved for later
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {wishlistItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-4 border rounded-lg p-4"
                    >
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-lg font-bold">₹{item.price}</p>
                        <p
                          className={`text-sm ${
                            item.inStock ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {item.inStock ? "In Stock" : "Out of Stock"}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" disabled={!item.inStock}>
                          Add to Cart
                        </Button>
                        <Button size="sm" variant="outline">
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>Account Settings</span>
                </CardTitle>
                <CardDescription>
                  Manage your account preferences and security
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Email Notifications</h3>
                      <p className="text-sm text-gray-600">
                        Receive updates about your orders
                      </p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">SMS Notifications</h3>
                      <p className="text-sm text-gray-600">
                        Get SMS updates for order status
                      </p>
                    </div>
                    <input type="checkbox" className="w-4 h-4" />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Marketing Emails</h3>
                      <p className="text-sm text-gray-600">
                        Receive promotional offers and deals
                      </p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                  >
                    Change Password
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                  >
                    Download My Data
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-red-600 hover:text-red-700 bg-transparent"
                  >
                    Delete Account
                  </Button>
                </div>

                <Separator />

                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}
