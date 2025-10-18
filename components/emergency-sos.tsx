"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, MapPin, Phone, Loader } from "lucide-react"

const HOSPITALS = [
  { id: 1, name: "City General Hospital", distance: "2.3 km", phone: "+91-11-2345-6789", address: "Main Road, Delhi" },
  {
    id: 2,
    name: "Emergency Care Center",
    distance: "3.1 km",
    phone: "+91-11-2345-6790",
    address: "Park Street, Delhi",
  },
  {
    id: 3,
    name: "Medical Plus Hospital",
    distance: "4.5 km",
    phone: "+91-11-2345-6791",
    address: "Central Avenue, Delhi",
  },
]

export default function EmergencySOS() {
  const [sosActive, setSosActive] = useState(false)
  const [step, setStep] = useState<"initial" | "otp" | "location" | "hospital">("initial")
  const [otp, setOtp] = useState("")
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [selectedHospital, setSelectedHospital] = useState<(typeof HOSPITALS)[0] | null>(null)

  const handleSOSClick = () => {
    setSosActive(true)
    setStep("otp")
  }

  const handleOTPVerify = () => {
    if (otp === "123456") {
      setStep("location")
      // Simulate location tracking
      setTimeout(() => {
        setLocation({ lat: 28.6139, lng: 77.209 })
        setStep("hospital")
      }, 2000)
    }
  }

  const handleAmbulanceCall = (hospital: (typeof HOSPITALS)[0]) => {
    setSelectedHospital(hospital)
    alert(`Ambulance dispatched from ${hospital.name}!\n\nYour location has been shared.\nAmbulance ETA: 8-12 minutes`)
  }

  const handleCancel = () => {
    setSosActive(false)
    setStep("initial")
    setOtp("")
    setLocation(null)
    setSelectedHospital(null)
  }

  if (!sosActive) {
    return (
      <div className="space-y-6">
        <Card className="border-2 border-destructive bg-destructive/5">
          <CardHeader>
            <CardTitle className="text-destructive">Emergency SOS System</CardTitle>
            <CardDescription>
              Press the button below to activate emergency services. Your location will be tracked and the nearest
              ambulance will be dispatched.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={handleSOSClick}
              className="w-full h-24 text-2xl font-bold bg-destructive hover:bg-destructive/90 animate-pulse"
            >
              <AlertCircle className="w-8 h-8 mr-4" />
              EMERGENCY SOS
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How SOS Works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                1
              </div>
              <div>
                <p className="font-semibold">Verify Your Identity</p>
                <p className="text-sm text-muted-foreground">Enter OTP sent to your registered phone</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                2
              </div>
              <div>
                <p className="font-semibold">Location Tracking</p>
                <p className="text-sm text-muted-foreground">Your GPS location is tracked and shared</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                3
              </div>
              <div>
                <p className="font-semibold">Hospital Locator</p>
                <p className="text-sm text-muted-foreground">Nearest hospitals are identified</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                4
              </div>
              <div>
                <p className="font-semibold">Ambulance Dispatch</p>
                <p className="text-sm text-muted-foreground">Ambulance is sent to your location</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (step === "otp") {
    return (
      <div className="space-y-6">
        <Card className="border-2 border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Verify Your Identity</CardTitle>
            <CardDescription>Enter the OTP sent to your registered phone number</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-3 border-2 border-input rounded-md text-center text-2xl tracking-widest"
              maxLength={6}
            />
            <p className="text-xs text-muted-foreground text-center">Demo: Use 123456</p>
            <Button
              onClick={handleOTPVerify}
              className="w-full bg-destructive hover:bg-destructive/90"
              disabled={otp.length !== 6}
            >
              Verify OTP
            </Button>
            <Button onClick={handleCancel} variant="outline" className="w-full bg-transparent">
              Cancel
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (step === "location") {
    return (
      <div className="space-y-6">
        <Card className="border-2 border-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Loader className="w-5 h-5 animate-spin" />
              Tracking Your Location
            </CardTitle>
            <CardDescription>Please wait while we locate you...</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Loader className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">Accessing GPS...</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (step === "hospital") {
    return (
      <div className="space-y-6">
        <Card className="border-2 border-primary bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Nearest Hospitals
            </CardTitle>
            <CardDescription>
              Your location: {location?.lat.toFixed(4)}, {location?.lng.toFixed(4)}
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="space-y-4">
          {HOSPITALS.map((hospital) => (
            <Card
              key={hospital.id}
              className={`cursor-pointer transition-all ${
                selectedHospital?.id === hospital.id ? "border-2 border-primary bg-primary/5" : ""
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{hospital.name}</CardTitle>
                    <CardDescription className="mt-2">{hospital.address}</CardDescription>
                  </div>
                  <span className="text-lg font-bold text-primary">{hospital.distance}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4" />
                  <a href={`tel:${hospital.phone}`} className="text-primary hover:underline">
                    {hospital.phone}
                  </a>
                </div>
                <Button
                  onClick={() => handleAmbulanceCall(hospital)}
                  className="w-full bg-destructive hover:bg-destructive/90"
                >
                  Call Ambulance
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button onClick={handleCancel} variant="outline" className="w-full bg-transparent">
          Cancel SOS
        </Button>
      </div>
    )
  }

  return null
}
