"use client";

import { useEffect, useState } from "react";
import { db } from "@/firebase"; // ✅ Now correctly exported

import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export default function BookingPage() {
  const [isClient, setIsClient] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [services, setServices] = useState<{ id: string; name: string; price: string; offer?: string }[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    const unsubscribe = onSnapshot(collection(db, "services"), (snapshot) => {
      setServices(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as any)));
    });
    return () => unsubscribe();
  }, [isClient]);

  if (!isClient) return null; // Prevents rendering on the server

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

      // Send SMS via Firebase Cloud Function
      await fetch("https://YOUR_CLOUD_FUNCTION_URL/sendSMS", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, date, time }),
      });

      alert("Appointment booked successfully!");
      setName("");
      setPhone("");
      setDate("");
      setTime("");
      setSelectedServices([]);
    } catch (error) {
      alert("Booked Succesfully. Please do visit again. Thankyou!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-16 sm:py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12">Book an Appointment</h1>
        <div className="flex justify-center mb-6 sm:mb-8">
          <motion.div initial={{ y: -10 }} animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            <Button
              onClick={() => window.open("/draft 4_page-0001.jpg", "_blank")}
              className="bg-red-500 text-white px-5 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg hover:bg-red-600"
            >
              🎉 Special Offer 🎉
            </Button>
          </motion.div>
        </div>
        <div className="space-y-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Select Services</CardTitle>
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
                    <Label htmlFor={service.id} className="text-sm sm:text-base">{service.name}</Label>
                    <span className="text-gray-400 text-sm sm:text-base">₹{service.price} {service.offer && `(${service.offer})`}</span>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800 p-4 sm:p-6">
            <CardContent className="space-y-4">
              <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
              <Input placeholder="Phone Number" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
              <Button onClick={handleBooking} disabled={loading} className="w-full py-2 sm:py-3">
                {loading ? "Booking..." : "Book Appointment"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
