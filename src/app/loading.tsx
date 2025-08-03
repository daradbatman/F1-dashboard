'use client'

import Spinner from "@/components/ui/spinner"

export default function Loading() {
  return (
    <div className="h-screen flex items-center justify-center">
      <Spinner />
      <span className="ml-2 text-lg">Loading...</span>
    </div>
  )
}