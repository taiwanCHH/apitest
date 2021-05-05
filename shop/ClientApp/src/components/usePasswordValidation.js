import { useState, useEffect } from "react";

export const usePasswordValidation = ({
  
    firstPassword = "",
    secondPassword = "",
    requiredLength = 6
      
    }) => {
    const [validLength, setValidLength] = useState(null);
    const [hasNumber, setHasNumber] = useState(null);
    const [match, setMatch] = useState(null);
      
    useEffect(() => {
      
    setValidLength(firstPassword.length >= requiredLength ? true : false);
    setHasNumber(/\d/.test(firstPassword));
    setMatch(firstPassword && firstPassword === secondPassword);
      
    }, [firstPassword, secondPassword, requiredLength]);
      
    return [validLength, hasNumber, match];
    };
  