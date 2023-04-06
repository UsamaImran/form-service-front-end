import React, { ReactElement, useState } from 'react'
import { MenuItem, Select, SelectProps } from '@mui/material'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { IBaseLevelProps, INestedDropdownDataProps } from '../../layouts/demo/formSetting/FormSetting.data'
import NestedDropdownStyles from './NestedDropdown.module.scss'

interface IDropdownPropType extends SelectProps {
  labelText?: string
  DropdownData: Array<INestedDropdownDataProps>
  placeholder?: string
  errorMessage?: string
  error?: boolean
  containerClassName?: string
  setValue: (args: string) => void
  value: string
}

const NestedDropdown = ({
  labelText,
  placeholder,
  error,
  errorMessage,
  containerClassName = '',
  DropdownData = [],
  value = '',
  setValue,
  ...props
}: IDropdownPropType): ReactElement => {
  const [isOpen, setClose] = useState(false)
  const [openParticularMenu, setOpenParticularMenu] = useState('')
  const handleParticularMenu = (label: string) => {
    if (openParticularMenu === label) {
      setOpenParticularMenu('')
      return
    }
    setOpenParticularMenu(label)
  }

  return (
    <div className={[containerClassName, NestedDropdownStyles['container']].join(' ')}>
      <label className={NestedDropdownStyles['container__label']}>{labelText}</label>
      <Select
        onClick={() => {
          setClose(!isOpen)
        }}
        sx={{
          root: {
            '& .Mui-selected': {
              background: 'white',
            },
          },
        }}
        open={isOpen}
        className={NestedDropdownStyles.select}
        error={error}
        value={value}
        renderValue={() => {
          if (value === '' && placeholder) {
            return <>{placeholder}</>
          } else {
            return <>{value}</>
          }
        }}
        inputProps={{ 'aria-label': 'Without label' }}
        {...props}
      >
        <MenuItem disabled value="">
          <>{placeholder && placeholder}</>
        </MenuItem>
        {DropdownData.map(({ label = '', children: subLevel = [] }: INestedDropdownDataProps) => {
          return subLevel.length ? (
            <div>
              <div
                className={NestedDropdownStyles['nestedHover']}
                onClick={(e) => {
                  e.stopPropagation()
                  handleParticularMenu(label)
                }}
                role="button"
              >
                <MenuItem>{label}</MenuItem>
                {openParticularMenu === label ? (
                  <ExpandLess className={NestedDropdownStyles['container__expandIcon--color']} />
                ) : (
                  <ExpandMore className={NestedDropdownStyles['container__expandIcon--color']} />
                )}
              </div>
              {openParticularMenu === label
                ? subLevel.map((subLabel: IBaseLevelProps) => {
                    return (
                      <MenuItem
                        onClick={() => {
                          setValue(subLabel.label)
                        }}
                        key={subLabel.label}
                      >
                        <div style={{ paddingLeft: 8 }}>{subLabel.label}</div>
                      </MenuItem>
                    )
                  })
                : null}
            </div>
          ) : (
            <MenuItem
              onClick={() => {
                setValue(label)
                setClose(false)
                handleParticularMenu(label)
              }}
            >
              {label}
            </MenuItem>
          )
        })}
      </Select>
      {error ? <label className={NestedDropdownStyles['container__error']}>{errorMessage}</label> : null}
    </div>
  )
}

NestedDropdown.defaultProps = {
  displayEmpty: true,
}
export default NestedDropdown
