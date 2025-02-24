"use client";

import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { collection, addDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function AdminPage() {
  interface Service {
    id: string;
    name: string;
    price: string;
    offer?: string;
  }

  const [services, setServices] = useState<Service[]>([]);
  interface Appointment {
    id: string;
    name: string;
    phone: string;
    service: string;
    date: string;
    time: string;
  }

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [newService, setNewService] = useState({ name: "", price: "", offer: "" });
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribeServices = onSnapshot(collection(db, "services"), (snapshot) => {
      setServices(snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          price: data.price,
          offer: data.offer,
        };
      }));
    });

    const unsubscribeAppointments = onSnapshot(collection(db, "appointments"), (snapshot) => {
      setAppointments(snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          phone: data.phone,
          service: data.service,
          date: data.date,
          time: data.time,
        };
      }));
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
    await addDoc(collection(db, "services"), newService);
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
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl mb-4">Admin Login</h1>
        <Input 
          type="password" 
          placeholder="Enter Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <Button className="mt-4 w-full max-w-xs" onClick={handleLogin}>Login</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Services Section */}
        <div>
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Add New Service</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="Service Name" value={newService.name} onChange={(e) => setNewService({ ...newService, name: e.target.value })} />
              <Input type="number" placeholder="Price" value={newService.price} onChange={(e) => setNewService({ ...newService, price: e.target.value })} />
              <Input placeholder="Offer (Optional)" value={newService.offer} onChange={(e) => setNewService({ ...newService, offer: e.target.value })} />
              <Button className="w-full" onClick={addService}>Add Service</Button>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800 mt-6">
            <CardHeader>
              <CardTitle>Available Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {services.length === 0 ? <p className="text-gray-400 text-center">No services added.</p> : (
                services.map((service) => (
                  <div key={service.id} className="flex flex-col sm:flex-row items-center justify-between gap-2">
                    <span className="text-center sm:text-left">{service.name} - ₹{service.price} {service.offer && `(Offer: ₹${service.offer})`}</span>
                    <Button variant="destructive" size="sm" onClick={() => removeService(service.id)}>Remove</Button>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Appointments Section */}
        <div>
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Manage Appointments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {appointments.length === 0 ? <p className="text-gray-400 text-center">No appointments booked.</p> : (
                appointments.map((appointment) => (
                  <div key={appointment.id} className="flex flex-col sm:flex-row items-center justify-between gap-2">
                    <span className="text-center sm:text-left">
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
