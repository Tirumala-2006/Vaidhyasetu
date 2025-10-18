"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Heart, Search, LogOut } from "lucide-react"
import DiseaseSearch from "@/components/disease-search"
import EmergencySOS from "@/components/emergency-sos"

export default function Dashboard() {
  const [userType, setUserType] = useState<"ngo" | "user" | null>(null)
  const [userName, setUserName] = useState("")
  const [activeTab, setActiveTab] = useState<"home" | "search" | "sos">("home")

  useEffect(() => {
    const type = localStorage.getItem("userType") as "ngo" | "user" | null
    setUserType(type)

    if (type === "ngo") {
      setUserName(localStorage.getItem("ngoName") || "NGO")
    } else {
      setUserName(localStorage.getItem("userName") || "User")
    }
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    window.location.href = "/"
  }

  if (!userType) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary">
              {userType === "ngo" ? `Hello ${userName}` : `Hello ${userName}`}
            </h1>
            <p className="text-muted-foreground">{userType === "ngo" ? "NGO Dashboard" : "User Dashboard"}</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="gap-2 bg-transparent">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        {/* Navigation Tabs */}
        {userType === "user" && (
          <div className="flex gap-4 mb-8">
            <Button
              onClick={() => setActiveTab("home")}
              variant={activeTab === "home" ? "default" : "outline"}
              className={activeTab === "home" ? "bg-primary hover:bg-primary/90" : ""}
            >
              Home
            </Button>
            <Button
              onClick={() => setActiveTab("search")}
              variant={activeTab === "search" ? "default" : "outline"}
              className={activeTab === "search" ? "bg-primary hover:bg-primary/90" : ""}
            >
              <Search className="w-4 h-4 mr-2" />
              Search Diseases
            </Button>
            <Button
              onClick={() => setActiveTab("sos")}
              variant={activeTab === "sos" ? "default" : "outline"}
              className={activeTab === "sos" ? "bg-destructive hover:bg-destructive/90" : ""}
            >
              <AlertCircle className="w-4 h-4 mr-2" />
              Emergency SOS
            </Button>
          </div>
        )}

        {/* Content */}
        {userType === "ngo" ? (
          <NGODashboard />
        ) : (
          <>
            {activeTab === "home" && <UserHome />}
            {activeTab === "search" && <DiseaseSearch />}
            {activeTab === "sos" && <EmergencySOS />}
          </>
        )}
      </div>
    </main>
  )
}

function NGODashboard() {
  const orgName = localStorage.getItem("orgName") || "Organization"
  const location = localStorage.getItem("location") || "Location"

  return (
    <div className="space-y-8">
      <Card className="border-2">
        <CardHeader>
          <CardTitle>NGO Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Organization Name</p>
            <p className="text-lg font-semibold">{orgName}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Location</p>
            <p className="text-lg font-semibold">{location}</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">1,234</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Emergency Responses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-accent">89</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">First Aid Kits Distributed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">456</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 pb-4 border-b">
              <AlertCircle className="w-5 h-5 text-destructive" />
              <div>
                <p className="font-semibold">Emergency Response</p>
                <p className="text-sm text-muted-foreground">Snake bite case - Ambulance dispatched</p>
              </div>
            </div>
            <div className="flex items-center gap-4 pb-4 border-b">
              <Heart className="w-5 h-5 text-accent" />
              <div>
                <p className="font-semibold">First Aid Kit Delivered</p>
                <p className="text-sm text-muted-foreground">10 kits distributed in local village</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Users className="w-5 h-5 text-primary" />
              <div>
                <p className="font-semibold">New User Registration</p>
                <p className="text-sm text-muted-foreground">45 new users joined this week</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function UserHome() {
  return (
    <div className="space-y-8">
      <Card className="border-2 bg-gradient-to-r from-primary/10 to-accent/10">
        <CardHeader>
          <CardTitle>Welcome to HealthCare Connect</CardTitle>
          <CardDescription>Your trusted platform for emergency first aid and healthcare support</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            In case of emergency, use the SOS button to get immediate help. Browse diseases to learn first aid
            techniques.
          </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <AlertCircle className="w-6 h-6 text-destructive mb-2" />
            <CardTitle>Emergency SOS</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Get immediate help with location tracking and ambulance dispatch
            </p>
            <Button className="w-full bg-destructive hover:bg-destructive/90">Activate SOS</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Search className="w-6 h-6 text-primary mb-2" />
            <CardTitle>Search Diseases</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Find first aid guides and videos for common health issues
            </p>
            <Button className="w-full bg-primary hover:bg-primary/90">Browse</Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Common Health Issues</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {["Snake Bite", "Burns", "Fractures", "Choking", "Allergic Reaction", "Poisoning"].map((issue) => (
              <Button key={issue} variant="outline" className="justify-start bg-transparent">
                {issue}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

import { Users } from "lucide-react"
