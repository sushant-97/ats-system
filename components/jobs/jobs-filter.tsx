"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

const filters = [
  { id: "all", name: "All jobs (152)", active: true },
  { id: "draft", name: "Draft (108)", active: false },
  { id: "published", name: "Published (2)", active: false },
]

export function JobsFilter() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search by title" className="pl-8" />
        </div>
        <div className="flex gap-2">
          {filters.map((filter) => (
            <Button key={filter.id} variant={filter.active ? "default" : "outline"}>
              {filter.name}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-md">
        <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center text-white">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20 6L9 17l-5-5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div>
          <p className="font-medium text-green-800">2/20 published jobs</p>
          <p className="text-sm text-green-700">Your published jobs are visible to candidates on remote.com/jobs</p>
        </div>
      </div>
    </div>
  )
}

