export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};
export const checkPassWordValidity = (firstPassword, secondPassword) => {
    let error = ''
    let requiredLength = 6
    if (error.length === 0) {
        let len = (firstPassword.length >= requiredLength ? true : false);
        error = len ? '' : '長度不夠,至少要有六位密碼'
    }
    if (error.length === 0) {
        let num = (/\d/.test(firstPassword));
        error = num ? "" : "至少包含一個數字"
    }
    if (error.length === 0) {
        let mat = (firstPassword && firstPassword === secondPassword);
        error = mat ? '' : '確認密碼輸入不符'
    }
    return error
}
export const checkEmptyValidity = (value) => {
    let error = ''
    if (error.length === 0) {
        let isValid = (value.trim().length > 0);
        error = isValid ? "" : "輸入不能空白"
    }
    return error
}
export const checkEmailValidity =(value)=>{
    let error = ''
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    let isValid = pattern.test(value)
    error = isValid ? "" : "請輸入Email格式"
    return error
}

export const checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
        return true;
    }

    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid
    }

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }

    return isValid;
}
