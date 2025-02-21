"use client";

import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { collection, addDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function AdminPage() {
  const [services, setServices] = useState<{ id: string; name: string; price: string; offer?: string }[]>([]);
  const [appointments, setAppointments] = useState<{ id: string; name: string; phone: string; date: string; time: string; service: string }[]>([]);
  const [newService, setNewService] = useState({ name: "", price: "", offer: "" });
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribeServices = onSnapshot(collection(db, "services"), (snapshot) => {
      setServices(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as any)));
    });

    const unsubscribeAppointments = onSnapshot(collection(db, "appointments"), (snapshot) => {
      setAppointments(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as any)));
    });

    return () => {
      unsubscribeServices();
      unsubscribeAppointments();
    };
  }, []);

  const handleLogin = () => {
    if (password === "Farhan001") {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password!");
    }
  };

  const addService = async () => {
    if (!newService.name || !newService.price) return alert("Name and price are required!");

    await addDoc(collection(db, "services"), {
      name: newService.name,
      price: newService.price,
      offer: newService.offer || null,
    });

    setNewService({ name: "", price: "", offer: "" });
  };

  const removeService = async (id: string) => {
    await deleteDoc(doc(db, "services", id));
  };

  const removeAppointment = async (id: string) => {
    await deleteDoc(doc(db, "appointments", id));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <h1 className="text-2xl mb-4">Admin Login</h1>
        <Input 
          type="password" 
          placeholder="Enter Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <Button className="mt-4" onClick={handleLogin}>Login</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-20">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Services Section (Left Side) */}
        <div>
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Add New Service</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input 
                placeholder="Service Name" 
                value={newService.name} 
                onChange={(e) => setNewService({ ...newService, name: e.target.value })} 
              />
              <Input 
                type="number" 
                placeholder="Price" 
                value={newService.price} 
                onChange={(e) => setNewService({ ...newService, price: e.target.value })} 
              />
              <Input 
                placeholder="Offer (Optional)" 
                value={newService.offer} 
                onChange={(e) => setNewService({ ...newService, offer: e.target.value })} 
              />
              <Button className="w-full" onClick={addService}>Add Service</Button>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800 mt-6">
            <CardHeader>
              <CardTitle>Available Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {services.length === 0 ? (
                <p className="text-gray-400 text-center">No services added.</p>
              ) : (
                services.map((service) => (
                  <div key={service.id} className="flex items-center justify-between">
                    <span>{service.name} - ₹{service.price} {service.offer && `(Offer: ₹${service.offer})`}</span>
                    <Button variant="destructive" size="sm" onClick={() => removeService(service.id)}>Remove</Button>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Appointments Section (Right Side) */}
        <div>
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Manage Appointments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {appointments.length === 0 ? (
                <p className="text-gray-400 text-center">No appointments booked.</p>
              ) : (
                appointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between space-x-4">
                    <span>
                      <strong>{appointment.name}</strong> - {appointment.phone} <br />
                      <small>{appointment.service} on {appointment.date} at {appointment.time}</small>
                    </span>
                    <Button variant="destructive" size="sm" onClick={() => removeAppointment(appointment.id)}>Remove</Button>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
