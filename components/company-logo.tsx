"use client"

import { useState } from "react"
import Image from "next/image"
import { CircleIcon } from "lucide-react"

// Map of company names to their respective colors for fallback icons
const companyColors = {
  meta: "text-blue-500 dark:text-blue-400",
  ellisdon: "text-green-600 dark:text-green-400",
  vendia: "text-purple-600 dark:text-purple-400",
  "1password": "text-blue-700 dark:text-blue-400",
  huawei: "text-red-600 dark:text-red-400",
  university: "text-yellow-600 dark:text-yellow-400",
  // Add more companies as needed
}

export function CompanyLogo({ type }: { type: string }) {
  const [imageError, setImageError] = useState(false)

  // If we've already tried to load the image and it failed, use the fallback
  if (imageError) {
    return <FallbackLogo type={type} />
  }

  // Try to load the image
  return (
    <div className="w-6 h-6 flex items-center justify-center">
      <Image
        src={`/logos/${type}.svg`}
        alt={`${type} logo`}
        width={24}
        height={24}
        className="object-contain"
        onError={() => setImageError(true)}
      />
    </div>
  )
}

function FallbackLogo({ type }: { type: string }) {
  const colorClass = companyColors[type] || "text-gray-600 dark:text-gray-400"

  // Return a colored circle as fallback
  return (
    <div className={colorClass}>
      <CircleIcon className="w-6 h-6" />
    </div>
  )
}
