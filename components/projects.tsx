"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Github, ExternalLink } from "lucide-react"
import { useState, useEffect, useRef } from "react"

interface Project {
  title: string
  description: string
  tags: string[]
  image: string
  github: string | null
  live: string | null
}

const PROJECTS: Project[] = [
  {
    title: "Base Day 1 Challenge",
    description:
      "My first smart contract deployed on Base Sepolia testnet. A foundational Web3 project demonstrating smart contract development, deployment, and interaction with the Base blockchain network.",
    tags: ["Solidity", "Base", "Web3", "Smart Contracts"],
    image: "base-smart-contract.jpg",
    github: "https://github.com/abdunur-dev/Base-day1-challeng",
    live: null,
  },
  {
    title: "BaseLink App",
    description:
      "My second Web3 OnchainKit project for Base network. A decentralized application featuring wallet integration, on-chain interactions, and modern Web3 user experience built with Next.js.",
    tags: ["Next.js", "OnchainKit", "Base", "Web3"],
    image: "baselink-app.jpg",
    github: "https://github.com/abdunur-dev/Base-day-2-challeng",
    live: "https://baselink-app.vercel.app",
  },
  {
    title: "Salah Apologetics",
    description:
      "A comprehensive Islamic apologetics and comparative religion platform. Features multilingual support (Arabic, Amharic, English), article management system, and educational resources for interfaith dialogue.",
    tags: ["Next.js", "React", "Tailwind", "CMS"],
    image: "salah-apologetics.jpg",
    github: null,
    live: "https://salahapologetics.com",
  },
  {
    title: "DeFi Lending Protocol",
    description:
      "A decentralized lending and borrowing platform built with Solidity smart contracts. Features include collateralized loans, interest rate calculations, and liquidity pools.",
    tags: ["Solidity", "Next.js", "Ethers.js", "Web3"],
    image: "defi.jpg",
    github: null,
    live: null,
  },
  {
    title: "NFT Marketplace",
    description:
      "Full-featured NFT marketplace with minting, buying, selling, and auction capabilities. Built with React and integrated with IPFS for decentralized storage.",
    tags: ["React", "Solidity", "IPFS", "Tailwind"],
    image: "InShot_20251014_203422592~2.jpg",
    github: null,
    live: null,
  },
]

export function Projects() {
  const [visibleProjects, setVisibleProjects] = useState<boolean[]>([])
  const projectRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers = projectRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleProjects((prev) => {
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
    <section id="projects" className="py-20 lg:py-32 relative">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        <div className="space-y-4 mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold tracking-tight">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl">
            A selection of recent work showcasing my expertise in building modern web applications.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, index) => (
            <div
              key={project.title}
              ref={(el) => {
                projectRefs.current[index] = el
              }}
              className={`transition-all duration-700 ${
                visibleProjects[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <Card className="group overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 h-full flex flex-col hover:-translate-y-2">
                <div className="relative aspect-video overflow-hidden bg-secondary">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-60" />

                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-background/90 backdrop-blur-sm rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                        aria-label="View GitHub repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-background/90 backdrop-blur-sm rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                        aria-label="View live demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col">
                  <div className="space-y-2 flex-1">
                    <h3 className="text-xl sm:text-2xl font-bold group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{project.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium bg-secondary text-foreground rounded-full hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3 pt-2">
                    {project.live && (
                      <Button
                        variant="default"
                        size="sm"
                        className="gap-2 group/btn flex-1 hover:scale-105 transition-all duration-300"
                        asChild
                      >
                        <a href={project.live} target="_blank" rel="noopener noreferrer">
                          <span>Live Demo</span>
                          <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                        </a>
                      </Button>
                    )}
                    {project.github && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 group/btn flex-1 hover:scale-105 transition-all duration-300 bg-transparent"
                        asChild
                      >
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4" />
                          <span>Code</span>
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
