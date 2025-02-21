"use client";

import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export default function BookingPage() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [services, setServices] = useState<{ id: string; name: string; price: string; offer?: string }[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "services"), (snapshot) => {
      setServices(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as any)));
    });
    return () => unsubscribe();
  }, []);

  const handleCheckboxChange = (serviceId: string) => {
    setSelectedServices((prevSelected) =>
      prevSelected.includes(serviceId)
        ? prevSelected.filter((id) => id !== serviceId)
        : [...prevSelected, serviceId]
    );
  };

  const handleBooking = async () => {
    if (!name || !phone || !date || !time || selectedServices.length === 0) {
      alert("Please fill all details and select at least one service.");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "appointments"), {
        name,
        phone,
        date,
        time,
        services: selectedServices,
        timestamp: new Date(),
      });

      alert("Appointment booked successfully!");
      setName("");
      setPhone("");
      setDate("");
      setTime("");
      setSelectedServices([]);
    } catch (error) {
      alert("Failed to book appointment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Book an Appointment</h1>
        
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ y: -10 }}
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="relative"
          >
            <Button
              onClick={() => window.open("/draft 4_page-0001.jpg", "_blank")}
              className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-600"
            >
              🎉 Special Offer 🎉
            </Button>
          </motion.div>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Select Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {services.length === 0 ? (
                <p className="text-gray-400 text-center">No services available.</p>
              ) : (
                services.map((service) => (
                  <div key={service.id} className="flex items-center space-x-4">
                    <Checkbox
                      id={service.id}
                      checked={selectedServices.includes(service.id)}
                      onCheckedChange={() => handleCheckboxChange(service.id)}
                    />
                    <Label htmlFor={service.id}>{service.name}</Label>
                    <span className="text-gray-400">₹{service.price} {service.offer && `(${service.offer})`}</span>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800 p-6">
            <CardContent className="space-y-4">
              <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
              <Input placeholder="Phone Number" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />

              <Button onClick={handleBooking} disabled={loading} className="w-full">
                {loading ? "Booking..." : "Book Appointment"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}