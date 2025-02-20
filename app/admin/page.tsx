"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [services, setServices] = useState<{ name: string; price: string; offer?: string }[]>([])
  const [serviceName, setServiceName] = useState("")
  const [servicePrice, setServicePrice] = useState("")
  const [serviceOffer, setServiceOffer] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === "Farhan001") {
      setIsLoggedIn(true)
      setError("")
    } else {
      setError("Invalid password")
    }
  }

  const handleAddService = () => {
    if (serviceName && servicePrice) {
      const newService = {
        name: serviceName,
        price: servicePrice,
        offer: serviceOffer,
      }
      setServices([...services, newService])
      setServiceName("")
      setServicePrice("")
      setServiceOffer("")
    }
  }

  const handleRemoveService = (index: number) => {
    setServices(services.filter((_, i) => i !== index))
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center py-20">
        <Card className="w-[350px] bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-black"
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button
                type="submit"
                className="w-full bg-white text-black hover:bg-blue-500 hover:text-white transition-colors"
              >
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Admin Dashboard</h1>
        <div className="max-w-2xl mx-auto">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Add New Service</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="service-name">Service Name</Label>
                <Input id="service-name" value={serviceName} onChange={(e) => setServiceName(e.target.value)} placeholder="Enter service name" className="bg-black" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="service-price">Price</Label>
                <Input id="service-price" value={servicePrice} onChange={(e) => setServicePrice(e.target.value)} placeholder="Enter price" className="bg-black" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="service-offer">Offer (Optional)</Label>
                <Input id="service-offer" value={serviceOffer} onChange={(e) => setServiceOffer(e.target.value)} placeholder="Enter offer details" className="bg-black" />
              </div>
              <Button onClick={handleAddService} className="w-full bg-white text-black hover:bg-blue-500 hover:text-white transition-colors">
                Add Service
              </Button>
            </CardContent>
          </Card>

          <Card className="mt-8 bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Current Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {services.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-black rounded-lg">
                    <div>
                      <h3 className="font-medium">{service.name}</h3>
                      <p className="text-sm text-gray-400">₹{service.price}</p>
                      {service.offer && <p className="text-sm text-green-400">Offer: {service.offer}</p>}
                    </div>
                    <Button
                      onClick={() => handleRemoveService(index)}
                      variant="destructive"
                      className="bg-white text-black hover:bg-red-500 hover:text-white transition-colors"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
