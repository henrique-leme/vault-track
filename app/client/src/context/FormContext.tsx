import React, { createContext, useContext, useState, ReactNode } from 'react'

interface FormContextType {
  formData: Record<string, any>
  updateFormData: (newData: Record<string, any>) => void
  resetFormData: () => void
}

const initialFormState: FormContextType = {
  formData: {},
  updateFormData: () => {},
  resetFormData: () => {},
}

const FormContext = createContext<FormContextType>(initialFormState)

export const useFormContext = () => useContext(FormContext)

interface FormProviderProps {
  children: ReactNode
}

export const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
  const [formData, setFormData] = useState<Record<string, any>>({})

  const updateFormData = (newData: Record<string, any>) => {
    setFormData((prevData) => ({ ...prevData, ...newData }))
  }

  const resetFormData = () => {
    setFormData({})
  }

  return (
    <FormContext.Provider value={{ formData, updateFormData, resetFormData }}>
      {children}
    </FormContext.Provider>
  )
}
