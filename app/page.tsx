import Image from "next/image"
import Video from "next/video"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageCarousel } from "@/components/image-carousel"
import { Instagram, Phone, MapPin } from "lucide-react"
import { MobileNav } from "@/components/mobile-nav"
import { RevealSection } from "@/components/reveal-section"
import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowDown } from "lucide-react";


export default function Home() {
  const specialists = [
    {
      name: "Farhan Sheikh",
      role: "Founder, Hair Stylist",
      image: "/placeholder.svg?height=400&width=400",
      about: "Farhan is a master stylist with over 10 years of experience in hair transformations.",
    },
    {
      name: "Sachin",
      role: "Color Specialist",
      image: "/placeholder.svg?height=400&width=400",
      about: "Sachin specializes in hair coloring techniques that enhance your natural beauty.",
    },
    {
      name: "Anushka",
      role: "Makeup Artist",
      image: "/placeholder.svg?height=400&width=400",
      about: "Anushka is an expert in bridal and fashion makeup, creating stunning looks.",
    },
    {
      name: "Farhan Sheikh",
      role: "Founder, Hair Stylist",
      image: "/placeholder.svg?height=400&width=400",
      about: "Farhan is a master stylist with over 10 years of experience in hair transformations.",
    },
    {
      name: "Farhan Sheikh",
      role: "Founder, Hair Stylist",
      image: "/placeholder.svg?height=400&width=400",
      about: "Farhan is a master stylist with over 10 years of experience in hair transformations.",
    },
    {
      name: "Farhan Sheikh",
      role: "Founder, Hair Stylist",
      image: "/placeholder.svg?height=400&width=400",
      about: "Farhan is a master stylist with over 10 years of experience in hair transformations.",
    },
  ];

  const workImages = [
    "/WhatsApp Image 2025-02-18 at 15.05.51.jpeg",
    "/WhatsApp Image 2025-02-20 at 07.55.49 (1).jpeg",
    "/WhatsApp Image 2025-02-20 at 07.55.49 (2).jpeg",
    "/WhatsApp Image 2025-02-20 at 07.55.49.jpeg",
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header with Mobile Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            The Style Hub
          </Link>
          <nav className="hidden lg:flex space-x-4">
            <Button asChild className="bg-white text-black hover:bg-blue-500 hover:text-white transition-colors">
              <Link href="/book">Book Now</Link>
            </Button>
            <Button asChild className="bg-white text-black hover:bg-blue-500 hover:text-white transition-colors">
              <Link href="/admin">Admin</Link>
            </Button>
          </nav>
          <MobileNav />
        </div>
      </header>

      <main className="pt-20">
        {/* Welcome Section */}
        <section
      className="min-h-[85vh] flex flex-col items-center justify-center bg-gradient-to-b from-black to-gray-900 relative bg-cover bg-center"
      style={{
        backgroundImage: "url('/image.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "70vh" // Adjust this value as needed
      }}
      
    >
      {/* Faded Overlay */}
      <div className="absolute inset-0 bg-black opacity-30"></div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">Welcome to The Style Hub</h1>
        <p className="text-lg md:text-xl text-gray-400 mb-6">Where Style Meets Excellence</p>
        <div className="relative flex items-center justify-center mt-4">
          <Button
            asChild
            size="lg"
            className="bg-white text-black hover:bg-blue-500 hover:text-white transition-colors px-6 py-3"
          >
            <Link href="/book">Book Your Appointment</Link>
          </Button>
          <Button
            className="absolute left-[350px] top-[150px] bg-white text-black hover:bg-blue-500 hover:text-white transition-colors px-6 py-3"
          >
            <Link href="#">Left Button</Link>
          </Button>
          <Button
            className="absolute right-[350px] top-[150px] bg-white text-black hover:bg-blue-500 hover:text-white transition-colors px-6 py-3"
          >
            <Link href="#">Right Button</Link>
          </Button>
        </div>
      </div>

      {/* Downward Arrow Indicator */}
      <div className="absolute bottom-6 flex flex-col items-center z-10">
        <p className="text-gray-400 text-sm mb-2">Scroll Down</p>
        <ArrowDown className="text-gray-400 w-6 h-6 animate-bounce" />
      </div>
    </section>





        {/* About Us Section */}
        <RevealSection>
        <section className="py-20 bg-black">
  <div className="container mx-auto px-4">
    <h2 className="text-4xl font-bold text-center mb-12 text-white">About Us</h2>
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div>
      <video
  src="/WhatsApp Video 2025-02-20 at 07.30.10.mp4"
  width={900}
  height={500}  // Adjusted height
  className="rounded-lg h-[500px]" // Ensures height control via CSS
  controls
  autoPlay
  muted
/>


      </div>
      <div className="space-y-6">
        <p className="text-lg text-gray-300">
          The Style Hub is more than just a salon – it's a destination for transformation and self-expression.
          Our team of skilled professionals is dedicated to helping you look and feel your absolute best.
        </p>
        <p className="text-lg text-gray-300">
          With years of experience and a passion for beauty, we offer a wide range of services tailored to
          your unique style and preferences. From cutting-edge hair treatments to expert styling, we're here
          to enhance your natural beauty.
        </p>
      </div>
    </div>
  </div>
</section>

        </RevealSection>

        {/* Specialists Section */}
        <RevealSection>
          <section className="py-20 bg-gray-900">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold text-center mb-12">Our Specialists</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {specialists.map((specialist, index) => (
                  <Card
                    key={index}
                    className="bg-black border-gray-800 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-blue-500"
                  >
                    <CardContent className="p-6">
                      <Image
                        src={specialist.image || "/placeholder.svg"}
                        alt={specialist.name}
                        width={200}
                        height={60}
                        className="rounded-lg mb-6"
                      />
                      <h3 className="text-xl font-semibold mb-2">{specialist.name}</h3>
                      <p className="text-gray-400">{specialist.role}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </RevealSection>
  

        {/* Our Work Section */}
        <RevealSection>
  <section className="py-20 bg-black">
    <div className="container mx-auto px-4">
      <h2 className="text-4xl font-bold text-center mb-12">Our Work</h2>
      <ImageCarousel images={workImages} />
    </div>
  </section>
</RevealSection>



        {/* Connect Section */}
        <RevealSection>
          <section className="py-20 bg-gray-900">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold text-center mb-12">Connect With Us</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <a
                  href="https://www.instagram.com/thestylehub10?igsh=ZWZ6ZDZmNjVsbWE0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center p-6 rounded-lg bg-black border border-gray-800 hover:border-blue-500 transition-colors"
                >
                  <Instagram className="w-8 h-8 mr-3" />
                  <span className="text-lg">Follow us on Instagram</span>
                </a>
                <a
                  href="tel:+917018330781"
                  className="flex items-center justify-center p-6 rounded-lg bg-black border border-gray-800 hover:border-blue-500 transition-colors"
                >
                  <Phone className="w-8 h-8 mr-3" />
                  <span className="text-lg"></span>
                </a>
                <a
                  href="https://maps.app.goo.gl/YN5LbrzH99UsRUCQ9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center p-6 rounded-lg bg-black border border-gray-800 hover:border-blue-500 transition-colors"
                >
                  <MapPin className="w-8 h-8 mr-3" />
                  <span className="text-lg">Find us on Map</span>
                </a>
              </div>
            </div>
          </section>
        </RevealSection>
      </main>
    </div>
  )
}

