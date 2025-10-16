"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Code2, Blocks, Palette, Shield, Rocket, Users } from "lucide-react"
import { useState, useEffect, useRef } from "react"

interface Service {
  icon: React.ReactNode
  title: string
  description: string
  features: string[]
}

const SERVICES: Service[] = [
  {
    icon: <Blocks className="w-8 h-8" />,
    title: "Smart Contract Development",
    description: "Build secure and efficient smart contracts for your blockchain applications.",
    features: ["Solidity & Rust", "Security Audits", "Gas Optimization", "Testing & Deployment"],
  },
  {
    icon: <Code2 className="w-8 h-8" />,
    title: "DApp Development",
    description: "Create full-stack decentralized applications with modern web technologies.",
    features: ["Web3 Integration", "Wallet Connection", "IPFS Storage", "Real-time Updates"],
  },
  {
    icon: <Palette className="w-8 h-8" />,
    title: "Frontend Development",
    description: "Design and develop beautiful, responsive user interfaces for Web3 applications.",
    features: ["React & Next.js", "Tailwind CSS", "Responsive Design", "UI/UX Best Practices"],
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Blockchain Consulting",
    description: "Expert guidance on blockchain architecture and implementation strategies.",
    features: ["Technical Advisory", "Architecture Design", "Best Practices", "Code Review"],
  },
  {
    icon: <Rocket className="w-8 h-8" />,
    title: "DeFi Solutions",
    description: "Build decentralized finance protocols including DEXs, lending platforms, and more.",
    features: ["Liquidity Pools", "Yield Farming", "Token Economics", "Protocol Design"],
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "NFT & DAO Development",
    description: "Create NFT marketplaces and DAO governance systems for your community.",
    features: ["NFT Minting", "Marketplace Logic", "Governance Tokens", "Voting Systems"],
  },
]

export function Services() {
  const [visibleServices, setVisibleServices] = useState<boolean[]>([])
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers = serviceRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleServices((prev) => {
                const newVisible = [...prev]
                newVisible[index] = true
                return newVisible
              })
            }
          })
        },
        { threshold: 0.1 },
      )

      if (ref) observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [])

  return (
    <section id="services" className="py-20 lg:py-32 bg-secondary/30 relative">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        <div className="space-y-4 mb-16 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold tracking-tight">
            My <span className="text-primary">Services</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive Web3 development services to bring your blockchain vision to life.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <div
              key={service.title}
              ref={(el) => {
                serviceRefs.current[index] = el
              }}
              className={`transition-all duration-700 ${
                visibleServices[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <Card className="group p-6 h-full bg-card border-border hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2">
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:scale-110">
                    {service.icon}
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-bold group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{service.description}</p>
                  </div>

                  <ul className="space-y-2 pt-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
