'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ChevronDown, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Student {
  no: number
  last_name: string
  first_name: string
}

interface SearchableSelectProps {
  students: Student[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchableSelect({ students, value, onChange, placeholder = "Search or select..." }: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Filter students based on search term
  const filteredStudents = students.filter(student => {
    const fullName = `${student.last_name} ${student.first_name}`.toLowerCase()
    return fullName.includes(searchTerm.toLowerCase())
  })

  // Get selected student display name
  const selectedStudent = students.find(s => `${s.last_name} ${s.first_name}` === value)
  const displayValue = selectedStudent 
    ? `${selectedStudent.last_name} ${selectedStudent.first_name}`
    : ''

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSearchTerm('')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isOpen])

  const handleSelect = (student: Student) => {
    onChange(`${student.last_name} ${student.first_name}`)
    setIsOpen(false)
    setSearchTerm('')
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange('')
    setSearchTerm('')
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Select Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full px-4 py-3 bg-background/60 border-2 border-border rounded-xl",
          "focus:border-primary focus:ring-4 focus:ring-primary/20 focus:outline-none",
          "transition-all duration-300 hover:border-primary/50",
          "flex items-center justify-between gap-2 text-left"
        )}
      >
        <span className={cn(
          "flex-1",
          !displayValue && "text-muted-foreground"
        )}>
          {displayValue || placeholder}
        </span>
        
        <div className="flex items-center gap-2">
          {displayValue && (
            <X 
              className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors"
              onClick={handleClear}
            />
          )}
          <ChevronDown 
            className={cn(
              "w-4 h-4 text-muted-foreground transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </div>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-2 glass-effect rounded-xl border border-border shadow-2xl overflow-hidden"
          >
            {/* Search Input */}
            <div className="p-3 border-b border-border">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name..."
                  className="w-full pl-10 pr-4 py-2 bg-background/60 border border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all text-sm"
                />
              </div>
            </div>

            {/* Students List */}
            <div className="max-h-64 overflow-y-auto">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => {
                  const fullName = `${student.last_name} ${student.first_name}`
                  const isSelected = fullName === value

                  return (
                    <button
                      key={student.no}
                      type="button"
                      onClick={() => handleSelect(student)}
                      className={cn(
                        "w-full px-4 py-3 text-left hover:bg-primary/10 transition-colors",
                        "flex items-center justify-between group",
                        isSelected && "bg-primary/20"
                      )}
                    >
                      <div className="flex-1">
                        <div className={cn(
                          "font-medium",
                          isSelected ? "text-primary" : "text-foreground"
                        )}>
                          {student.last_name} {student.first_name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Student #{student.no}
                        </div>
                      </div>
                      {isSelected && (
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      )}
                    </button>
                  )
                })
              ) : (
                <div className="px-4 py-8 text-center text-muted-foreground">
                  <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No students found</p>
                  <p className="text-xs mt-1">Try a different search term</p>
                </div>
              )}
            </div>

            {/* Footer Info */}
            {filteredStudents.length > 0 && (
              <div className="px-4 py-2 border-t border-border bg-background/40">
                <p className="text-xs text-muted-foreground text-center">
                  {filteredStudents.length} student{filteredStudents.length !== 1 ? 's' : ''} found
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
