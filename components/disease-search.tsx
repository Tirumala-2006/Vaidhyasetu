"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Play } from "lucide-react"

const DISEASES_DATABASE = [
  {
    id: 1,
    name: "Snake Bite",
    symptoms: "Puncture marks, swelling, pain, discoloration",
    firstAid: [
      "Remove any jewelry or tight clothing",
      "Keep the bitten area immobilized",
      "Apply a pressure immobilization bandage",
      "Seek immediate medical attention",
      "Do NOT apply tourniquets or cut the wound",
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    severity: "Critical",
  },
  {
    id: 2,
    name: "Burns",
    symptoms: "Redness, blistering, pain, charring",
    firstAid: [
      "Cool the burn with running water for 10-20 minutes",
      "Remove tight clothing if not stuck to skin",
      "Apply sterile, non-stick dressing",
      "Take over-the-counter pain relief",
      "Seek medical help for severe burns",
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    severity: "High",
  },
  {
    id: 3,
    name: "Fractures",
    symptoms: "Severe pain, swelling, deformity, inability to move",
    firstAid: [
      "Immobilize the injured area",
      "Apply ice wrapped in cloth",
      "Elevate the injured limb if possible",
      "Take pain relief medication",
      "Seek immediate medical attention",
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    severity: "High",
  },
  {
    id: 4,
    name: "Choking",
    symptoms: "Inability to speak, cough, or breathe",
    firstAid: [
      "Encourage coughing if able",
      "Perform Heimlich maneuver",
      "Stand behind the person",
      "Place fist above navel",
      "Call emergency services if unsuccessful",
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    severity: "Critical",
  },
  {
    id: 5,
    name: "Allergic Reaction",
    symptoms: "Rash, swelling, difficulty breathing, itching",
    firstAid: [
      "Remove the allergen if possible",
      "Give antihistamine medication",
      "Use epinephrine auto-injector if available",
      "Keep person lying down",
      "Seek medical help immediately",
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    severity: "High",
  },
  {
    id: 6,
    name: "Poisoning",
    symptoms: "Nausea, vomiting, abdominal pain, confusion",
    firstAid: [
      "Call poison control immediately",
      "Remove contaminated clothing",
      "Rinse skin with water if chemical exposure",
      "Do NOT induce vomiting",
      "Keep the poison container for reference",
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    severity: "Critical",
  },
]

export default function DiseaseSearch() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDisease, setSelectedDisease] = useState<(typeof DISEASES_DATABASE)[0] | null>(null)

  const filteredDiseases = DISEASES_DATABASE.filter((disease) =>
    disease.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (selectedDisease) {
    return (
      <div className="space-y-6">
        <Button onClick={() => setSelectedDisease(null)} variant="outline">
          ← Back to Search
        </Button>

        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">{selectedDisease.name}</CardTitle>
                <CardDescription>{selectedDisease.symptoms}</CardDescription>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  selectedDisease.severity === "Critical"
                    ? "bg-destructive text-destructive-foreground"
                    : selectedDisease.severity === "High"
                      ? "bg-accent text-accent-foreground"
                      : "bg-primary text-primary-foreground"
                }`}
              >
                {selectedDisease.severity}
              </span>
            </div>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="w-5 h-5" />
              First Aid Video Guide
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-muted rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src={selectedDisease.videoUrl}
                title="First Aid Guide"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Step-by-Step First Aid Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3">
              {selectedDisease.firstAid.map((step, index) => (
                <li key={index} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                    {index + 1}
                  </span>
                  <span className="pt-1">{step}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Search Health Issues</CardTitle>
          <CardDescription>Find first aid guides and video tutorials</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for a disease or health issue..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-input rounded-md"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {filteredDiseases.map((disease) => (
          <Card key={disease.id} className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{disease.name}</CardTitle>
                  <CardDescription className="mt-2">{disease.symptoms}</CardDescription>
                </div>
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold whitespace-nowrap ${
                    disease.severity === "Critical"
                      ? "bg-destructive text-destructive-foreground"
                      : disease.severity === "High"
                        ? "bg-accent text-accent-foreground"
                        : "bg-primary text-primary-foreground"
                  }`}
                >
                  {disease.severity}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <Button onClick={() => setSelectedDisease(disease)} className="w-full bg-primary hover:bg-primary/90">
                View First Aid Guide
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDiseases.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">No diseases found. Try a different search term.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
