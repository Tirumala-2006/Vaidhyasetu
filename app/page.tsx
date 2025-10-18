"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Users, AlertCircle, MapPin } from "lucide-react"

export default function Home() {
  const [userType, setUserType] = useState<"ngo" | "user" | null>(null)

  if (userType === "ngo") {
    return <NGOAuth onBack={() => setUserType(null)} />
  }

  if (userType === "user") {
    return <UserAuth onBack={() => setUserType(null)} />
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold text-primary">HealthCare Connect</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connecting communities with NGOs for emergency first aid, health information, and life-saving support
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card className="border-2">
            <CardHeader>
              <AlertCircle className="w-6 h-6 text-accent mb-2" />
              <CardTitle>Emergency SOS</CardTitle>
              <CardDescription>Instant location tracking and ambulance dispatch</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Get immediate help with GPS location sharing and nearest hospital routing
              </p>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <Heart className="w-6 h-6 text-accent mb-2" />
              <CardTitle>First Aid Guidance</CardTitle>
              <CardDescription>Video tutorials and step-by-step instructions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Learn first aid for common emergencies while waiting for help
              </p>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <Users className="w-6 h-6 text-accent mb-2" />
              <CardTitle>NGO Network</CardTitle>
              <CardDescription>Connect with verified healthcare organizations</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Access free first aid kits and healthcare resources from trusted NGOs
              </p>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <MapPin className="w-6 h-6 text-accent mb-2" />
              <CardTitle>Hospital Locator</CardTitle>
              <CardDescription>Find nearest medical facilities instantly</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Real-time hospital and clinic locations with contact information
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Auth Selection */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Get Started</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Button
              onClick={() => setUserType("ngo")}
              className="h-32 text-lg font-semibold bg-primary hover:bg-primary/90"
            >
              <div className="flex flex-col items-center gap-2">
                <Users className="w-8 h-8" />
                <span>Register as NGO</span>
              </div>
            </Button>
            <Button
              onClick={() => setUserType("user")}
              className="h-32 text-lg font-semibold bg-accent hover:bg-accent/90"
            >
              <div className="flex flex-col items-center gap-2">
                <Heart className="w-8 h-8" />
                <span>Register as User</span>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

function NGOAuth({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState<"login" | "register">("login")

  if (step === "login") {
    return <NGOLogin onRegister={() => setStep("register")} onBack={onBack} />
  }

  return <NGORegister onBack={onBack} />
}

function UserAuth({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState<"login" | "register">("login")

  if (step === "login") {
    return <UserLogin onRegister={() => setStep("register")} onBack={onBack} />
  }

  return <UserRegister onBack={onBack} />
}

function NGOLogin({ onRegister, onBack }: { onRegister: () => void; onBack: () => void }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () => {
    if (email && password) {
      localStorage.setItem("userType", "ngo")
      localStorage.setItem("ngoName", "Sample NGO")
      window.location.href = "/dashboard"
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>NGO Login</CardTitle>
          <CardDescription>Sign in to your NGO account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-input rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-input rounded-md"
          />
          <Button onClick={handleLogin} className="w-full bg-primary hover:bg-primary/90">
            Login
          </Button>
          <Button onClick={onRegister} variant="outline" className="w-full bg-transparent">
            Create Account
          </Button>
          <Button onClick={onBack} variant="ghost" className="w-full">
            Back
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

function NGORegister({ onBack }: { onBack: () => void }) {
  const [ngoName, setNgoName] = useState("")
  const [orgName, setOrgName] = useState("")
  const [location, setLocation] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const indianCities = [
    "Delhi",
    "Mumbai",
    "Bangalore",
    "Hyderabad",
    "Chennai",
    "Kolkata",
    "Pune",
    "Ahmedabad",
    "Jaipur",
    "Lucknow",
    "Chandigarh",
    "Indore",
    "Kochi",
    "Visakhapatnam",
    "Surat",
    "Nagpur",
  ]

  const handleRegister = () => {
    if (ngoName && orgName && location && email && password) {
      localStorage.setItem("userType", "ngo")
      localStorage.setItem("ngoName", ngoName)
      localStorage.setItem("orgName", orgName)
      localStorage.setItem("location", location)
      window.location.href = "/dashboard"
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Register NGO</CardTitle>
          <CardDescription>Create your NGO account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <input
            type="text"
            placeholder="NGO Name"
            value={ngoName}
            onChange={(e) => setNgoName(e.target.value)}
            className="w-full px-3 py-2 border border-input rounded-md"
          />
          <input
            type="text"
            placeholder="Organization Name"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            className="w-full px-3 py-2 border border-input rounded-md"
          />
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-3 py-2 border border-input rounded-md"
          >
            <option value="">Select City/Location</option>
            {indianCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-input rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-input rounded-md"
          />
          <Button onClick={handleRegister} className="w-full bg-primary hover:bg-primary/90">
            Register
          </Button>
          <Button onClick={onBack} variant="ghost" className="w-full">
            Back
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

function UserLogin({ onRegister, onBack }: { onRegister: () => void; onBack: () => void }) {
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () => {
    if (phone && password) {
      localStorage.setItem("userType", "user")
      localStorage.setItem("userName", "User")
      window.location.href = "/dashboard"
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>User Login</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <input
            type="tel"
            placeholder="Mobile Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-2 border border-input rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-input rounded-md"
          />
          <Button onClick={handleLogin} className="w-full bg-accent hover:bg-accent/90">
            Login
          </Button>
          <Button onClick={onRegister} variant="outline" className="w-full bg-transparent">
            Create Account
          </Button>
          <Button onClick={onBack} variant="ghost" className="w-full">
            Back
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

function UserRegister({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState<"info" | "otp">("info")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")

  const handleSendOTP = () => {
    if (name && phone) {
      setStep("otp")
    }
  }

  const handleVerifyOTP = () => {
    if (otp) {
      localStorage.setItem("userType", "user")
      localStorage.setItem("userName", name)
      localStorage.setItem("userPhone", phone)
      window.location.href = "/dashboard"
    }
  }

  if (step === "otp") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Verify OTP</CardTitle>
            <CardDescription>Enter the OTP sent to {phone}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md"
            />
            <Button onClick={handleVerifyOTP} className="w-full bg-accent hover:bg-accent/90">
              Verify OTP
            </Button>
            <Button onClick={() => setStep("info")} variant="ghost" className="w-full">
              Back
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Register as User</CardTitle>
          <CardDescription>Create your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-input rounded-md"
          />
          <input
            type="tel"
            placeholder="Mobile Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-2 border border-input rounded-md"
          />
          <Button onClick={handleSendOTP} className="w-full bg-accent hover:bg-accent/90">
            Send OTP
          </Button>
          <Button onClick={onBack} variant="ghost" className="w-full">
            Back
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
