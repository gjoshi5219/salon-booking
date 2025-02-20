"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function BookingPage() {
  const [selectedServices, setSelectedServices] = useState<string[]>([])

  const services = [
    { id: "haircut", name: "Haircut", price: "₹500" },
    { id: "coloring", name: "Hair Coloring", price: "₹2000" },
    { id: "styling", name: "Hair Styling", price: "₹800" },
    { id: "treatment", name: "Hair Treatment", price: "₹1500" },
  ]

  const handleServiceChange = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId]
    )
  }

  const handleBooking = async () => {
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const phone = (document.getElementById("phone") as HTMLInputElement).value;
    const date = (document.getElementById("date") as HTMLInputElement).value;
    const time = (document.getElementById("time") as HTMLInputElement).value;

    if (!name || !phone || !date || !time || selectedServices.length === 0) {
      alert("Please fill all details and select at least one service.");
      return;
    }

    const response = await fetch("/api/send-sms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, date, time, services: selectedServices }),
    });

    const data = await response.json();
    if (data.success) {
      alert("Appointment booked! You will receive an SMS confirmation.");
    } else {
      alert("Failed to send SMS. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Book an Appointment</h1>
        <div className="max-w-2xl mx-auto">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Select Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                {services.map((service) => (
                  <div key={service.id} className="flex items-center space-x-4">
                    <Checkbox
                      id={service.id}
                      checked={selectedServices.includes(service.id)}
                      onCheckedChange={() => handleServiceChange(service.id)}
                    />
                    <Label htmlFor={service.id} className="flex-1">
                      {service.name}
                    </Label>
                    <span className="text-gray-400">{service.price}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" className="bg-black" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="Your phone number" className="bg-black" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Preferred Date</Label>
                  <Input id="date" type="date" className="bg-black" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Preferred Time</Label>
                  <Input id="time" type="time" className="bg-black" />
                </div>
              </div>

              <Button
                onClick={handleBooking}
                className="w-full bg-white text-black hover:bg-blue-500 hover:text-white transition-colors"
              >
                Book Appointment
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


