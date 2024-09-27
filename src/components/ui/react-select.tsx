'use client'

import clsx from 'clsx'
import { ChevronDown, X } from 'lucide-react'
import Select, {
  ClearIndicatorProps,
  DropdownIndicatorProps,
  MultiValueRemoveProps,
  components,
} from 'react-select'
import makeAnimated from 'react-select/animated'
import CreatableSelect from 'react-select/creatable'
import { ServerImage } from './image'

const DropdownIndicator = (props: DropdownIndicatorProps) => {
  return (
    <components.DropdownIndicator {...props}>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </components.DropdownIndicator>
  )
}

const ClearIndicator = (props: ClearIndicatorProps) => {
  return (
    <components.ClearIndicator {...props}>
      <X />
    </components.ClearIndicator>
  )
}

const MultiValueRemove = (props: MultiValueRemoveProps) => {
  return (
    <components.MultiValueRemove {...props}>
      <X />
    </components.MultiValueRemove>
  )
}

const controlStyles = {
  base: 'border border-border rounded-0 bg-background hover:cursor-pointer hover:bg-gray-100 focus-visible:ring-primary',
  focus: 'border-border ring-ring ring-primary-500',
  nonFocus: 'border-border',
}
const placeholderStyles = 'text-muted-foreground text-sm ml-1 px-2'
const selectInputStyles = 'text-foreground text-sm ml-1 px-2 uppercase'
const valueContainerStyles = 'text-foreground text-sm px-2 py-2 uppercase'
const singleValueStyles = 'ml-1'
const multiValueStyles =
  'ml-1 bg-background border border-border rounded-0 items-center py-0.5 pl-2 pr-1 gap-1.5'
const multiValueLabelStyles = 'leading-6 py-0.5'
const multiValueRemoveStyles =
  'border border-gray-200 bg-white hover:bg-red-50 hover:text-red-800 text-gray-500 hover:border-red-300 rounded-md bg-background'
const indicatorsContainerStyles = 'p-1 gap-1 bg-transparent rounded-r-md'
const clearIndicatorStyles = 'text-gray-500 p-1 rounded-0 hover:text-red-800'
const indicatorSeparatorStyles = 'bg-mutated'
const dropdownIndicatorStyles = 'p-1 hover:text-foreground text-gray-500'
const menuStyles =
  'mt-2 p-2 border border-border bg-background text-sm rounded-0'
const optionsStyle =
  'bg-background p-2 border-0 text-base hover:bg-gray-100 hover:cursor-pointer uppercase'
const groupHeadingStyles = 'ml-3 mt-2 mb-1 text-gray-500 text-sm bg-background'
const noOptionsMessageStyles = 'text-muted-foreground bg-background'

type SelectComponentProps = {
  options: any[]
  value?: any
  onChange?: (value: any) => void
  isMulti?: boolean
  isDisabled?: boolean
  isLoading?: boolean
  createAble: boolean
  placeholder?: string
  filterOption?: any
  innerRef?: any
}

const formatOptionLabel = ({
  value,
  label,
  imagePath,
}: {
  value: string | number
  label: string
  imagePath?: string
}) => (
  <div>
    {imagePath ? (
      <div className="flex items-center gap-2">
        <div className="w-[25px] h-[25px] rounded-full">
          <ServerImage
            className="w-[25px] h-[25px] rounded-full"
            src={imagePath}
            alt="image"
            width={25}
            height={25}
          />
        </div>
        <div>{label}</div>
      </div>
    ) : (
      <div>{label}</div>
    )}
  </div>
)

export const ReactSelect = ({
  options,
  value,
  onChange,
  isMulti,
  isDisabled,
  isLoading,
  createAble,
  placeholder,
  filterOption,
  innerRef,
  ...props
}: SelectComponentProps) => {
  const animatedComponents = makeAnimated()
  const Comp = createAble ? CreatableSelect : Select
  return (
    <Comp
      ref={innerRef}
      unstyled
      isClearable
      isSearchable
      value={value}
      isDisabled={isDisabled}
      isMulti={isMulti}
      isLoading={isLoading}
      placeholder={placeholder ? placeholder : ''}
      components={{
        ...animatedComponents,
        DropdownIndicator,
        ClearIndicator,
        MultiValueRemove,
      }}
      defaultValue={value}
      options={options}
      noOptionsMessage={() => 'Sonuç bulunamadı.'}
      filterOption={filterOption}
      formatOptionLabel={formatOptionLabel}
      onChange={onChange}
      loadingMessage={() => 'Yükleniyor...'}
      classNames={{
        control: ({ isFocused }) =>
          clsx(
            isFocused ? controlStyles.focus : controlStyles.nonFocus,
            controlStyles.base
          ),
        placeholder: () => placeholderStyles,
        input: () => selectInputStyles,
        option: () => optionsStyle,
        menu: () => menuStyles,
        valueContainer: () => valueContainerStyles,
        singleValue: () => singleValueStyles,
        multiValue: () => multiValueStyles,
        multiValueLabel: () => multiValueLabelStyles,
        multiValueRemove: () => multiValueRemoveStyles,
        indicatorsContainer: () => indicatorsContainerStyles,
        clearIndicator: () => clearIndicatorStyles,
        indicatorSeparator: () => indicatorSeparatorStyles,
        dropdownIndicator: () => dropdownIndicatorStyles,
        groupHeading: () => groupHeadingStyles,
        noOptionsMessage: () => noOptionsMessageStyles,
      }}
      {...props}
    />
  )
}
