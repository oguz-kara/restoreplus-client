'use client'

import * as React from 'react'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import useControlledInitializer from '@/hooks/use-controlled-initializer'

interface Option {
  value: string
  label: string
}

export function Combobox({
  options,
  onValueChange,
  value: defaultValue,
}: {
  options: Option[]
  onValueChange: (val: string | undefined) => void
  value?: string
}) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = useControlledInitializer<string | undefined>(
    defaultValue
  )

  React.useEffect(() => {
    onValueChange(value)
  }, [value])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : 'Select framework...'}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    console.log({ currentValue })
                    setValue(currentValue === value ? undefined : currentValue)
                    setOpen(false)
                  }}
                >
                  {option.label}
                  <CheckIcon
                    className={cn(
                      'ml-auto h-4 w-4',
                      value === option.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}