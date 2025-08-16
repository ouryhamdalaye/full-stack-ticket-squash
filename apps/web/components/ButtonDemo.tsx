"use client"

import { Button } from '@/components/ui/button'

export default function ButtonDemo() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Button variant="outline">Type Outline</Button>
      <Button variant="destructive">Type Destructive</Button>
      <Button variant="secondary">Type Secondary</Button>
      <Button variant="ghost">Type Ghost</Button>
      <Button variant="link">Type Link</Button>
      <Button variant="default">Type Default</Button>
      {/* A custom styled button */}
      <Button className="bg-blue-500 text-white hover:bg-blue-600">Custom Styled Button</Button>
    </div>
  )
}