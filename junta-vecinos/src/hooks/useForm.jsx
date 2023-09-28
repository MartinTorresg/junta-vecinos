import React, { useState } from 'react'

export const useForm = (initialObj) => {
  
  const [form, setForm] = useState(initialObj);

  const changed = (target) => {
    
  }
  
    return {
        form,
        changed
    };
}
