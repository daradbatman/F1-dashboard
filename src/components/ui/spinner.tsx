'use client'

import Image from "next/image"

export default function Spinner() {
  return (
    <Image src="/F1_tire.svg" alt="Loading" width={64} height={64} className="animate-spin" />
  )
}