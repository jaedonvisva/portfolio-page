"use client"

import Image from "next/image"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { AnimatedSection } from "@/components/animated-section"
import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"
import { CompanyLogo } from "@/components/company-logo"
import { GithubProjects } from "@/components/github-projects"
import { SpotifyNowPlaying } from "@/components/spotify-now-playing"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#faf8f3] dark:bg-[#121212] text-[#333333] dark:text-[#e0e0e0] font-mono transition-colors duration-200">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Navigation */}
        <nav className="flex justify-center mb-16 text-sm">
          <div className="flex space-x-6">
            <Link href="/about" className="hover:underline">
              about
            </Link>
            <Link href="https://drive.google.com/drive/folders/1NT32FAcfo1nJadgju_SBq9StJYHSTDL8" className="hover:underline">
              resume
            </Link>
          </div>
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </nav>

        {/* Profile Section */}
        <AnimatedSection className="flex flex-col md:flex-row justify-between items-start mb-20">
          <div className="md:max-w-[60%]">
            <h1 className="text-4xl font-bold mb-2">Jaedon Visva</h1>
            <p className="mb-4">Engineering Student @ the University of Waterloo</p>

            <div className="space-y-4">
              <p>
                I am passionate about building impactful tech — from full-stack apps to AI-powered tools that solve real-world problems.
              </p>
            </div>
          </div>

          <div className="mt-6 md:mt-0">
            <div className="rounded-md overflow-hidden w-[200px] h-[200px]">
              <Image
                src="/jaedon.svg?height=200&width=200"
                alt="Profile picture"
                width={200}
                height={200}
                className="object-cover brightness-105"
              />
            </div>
          </div>
        </AnimatedSection>

        {/* Projects Section */}
        <AnimatedSection className="mb-20" delay={100}>
          <h2 className="text-xl font-medium mb-8">What I&apos;ve Worked On</h2>
          <GithubProjects
            username="JaedonVisva"
            includeCustomProjects={true}
            customProjectsFirst={true} // Set to true if you want custom projects to appear first
          />
        </AnimatedSection>

        {/* Experience Section */}
        <AnimatedSection className="mb-20" delay={200}>
          <h2 className="text-xl font-medium mb-8">Where I&apos;ve Worked</h2>
          
          <div className="space-y-6">
            <AnimatedExperience
              logo="blackstone"
              company="Blackstone Energy Services"
              position="Machine Learning Intern"
              date="Summer 2025"
              delay={300}
            />
            <AnimatedExperience
              logo="ammu"
              company="Ammu IT Consulting"
              position="Software Developer"
              date="Summer 2024"
              delay={0}
            />
            <AnimatedExperience
              logo="holland"
              company="Holland Bloorview Kids Rehabilitation Hospital"
              position="Robotics Instructor"
              date="Summer 2024"
              delay={200}
            />
            <AnimatedExperience
              logo="ellisdon"
              company="EllisDon"
              position="Engineering Projects Analyst Intern"
              date="Spring 2023"
              delay={100}
            />

            

            <div className="border-t border-gray-200 dark:border-gray-700 my-8"></div>

            <AnimatedExperience
              logo="university"
              company="University of Waterloo"
              position="BASc in Management Engineering"
              date="2024-2029"
              delay={600}
            />
          </div>
        </AnimatedSection>

        {/* Footer */}
        <AnimatedSection className="flex justify-center items-center py-4" delay={300}>
          <div className="flex items-center space-x-2">
            <div className="border-t border-gray-300 dark:border-gray-700 w-32"></div>
            <span className="flex space-x-2">
              <span>Made with</span>
              <span className="text-red-500">❤️</span>
              <span>by</span>
              <span>Jaedon Visva</span>
              <span>© 2025</span>
            </span>
            <div className="border-t border-gray-300 dark:border-gray-700 w-32"></div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}

function AnimatedExperience({ logo, company, position, date, delay = 0 }) {
  const [ref, isInView] = useInView<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-start transition-all duration-700 ease-in-out",
        isInView ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-4",
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-8 mr-8 mt-1">
        <CompanyLogo type={logo} />
      </div>
      <div className="flex-1">
        <div className="font-medium">{position}</div>
        <div className="text-sm text-gray-600 dark:text-gray-400">{company}</div>
      </div>
      <div className="flex items-center">
        <div className="border-t border-dotted border-gray-300 dark:border-gray-700 w-16 md:w-32 mr-4"></div>
        <div className="text-sm whitespace-nowrap">{date}</div>
      </div>
    </div>
  )
}
