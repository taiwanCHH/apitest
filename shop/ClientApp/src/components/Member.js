import React, { Component, useState } from 'react';
import { ContextStore } from '../index.js';
import { Button, Form, FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';
import { checkPassWordValidity, checkEmptyValidity, checkEmailValidity } from "../shared/utility";
import axios from 'axios';

export const Member = (props) => {
    const { cart, dispatch } = React.useContext(ContextStore);

    const [info, setInfo] = useState({
        name: "",
        email: "",
        firstPassword: "",
        secondPassword: "",
        sex: "M",
        phone: "",
        birthday: "",
    });
    const [errorName, setErrorName] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorSex, setErrorSex] = useState('');
    const [errorPhone, setErrorPhone] = useState('');
    const [errorBirthday, setErrorBirthday] = useState('');

    const setInfoName = (event) => { setInfo({ ...info, name: event.target.value }); };
    const setInfoEmail = (event) => { setInfo({ ...info, email: event.target.value }); };
    const setInfoFirst = (event) => { setInfo({ ...info, firstPassword: event.target.value }); };
    const setInfoSecond = (event) => { setInfo({ ...info, secondPassword: event.target.value }); };
    const setInfoSex = (event) => { setInfo({ ...info, sex: event.target.value }); };
    const setInfoPhone = (event) => { setInfo({ ...info, phone: event.target.value }); };
    const setInfoBirthday = (event) => { setInfo({ ...info, birthday: event.target.value }); };

    const submit = () => {
        setErrorName(checkEmptyValidity(info.name))
        setErrorEmail(checkEmailValidity(info.email))
        setErrorPassword(checkPassWordValidity(info.firstPassword, info.secondPassword))
        setErrorSex(checkEmptyValidity(info.sex))
        setErrorPhone(checkEmptyValidity(info.phone))
        setErrorBirthday(checkEmptyValidity(info.birthday))

        if (errorName.length === 0 &&
            errorEmail.length === 0 &&
            errorPassword.length === 0 &&
            errorSex.length === 0 &&
            errorPhone.length === 0 &&
            errorBirthday.length === 0) {
            const user = {
                "userPhone": info.phone,
                "userSex": info.sex,
                "userBirthday": info.birthday,
                "userName": info.name,
                "email": info.email,
                "password": info.firstPassword

            };
            axios.post('/api/AuthManagement/Register', user)
                .then(response => console.log(response.data))
                .catch((error) => {console.log('There was an error!', error.data.errors);});
                
        }

    }

    return (
        <Form>
            <FormGroup>
                <Label for="name" >暱稱</Label>
                <Input invalid={errorName.length > 0} type="text" onChange={setInfoName} name="name" id="name" placeholder="暱稱" />
                <FormFeedback >{errorName}</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for="email">Email</Label>
                <Input invalid={errorEmail.length > 0} type="email" onChange={setInfoEmail} name="email" id="email" placeholder="email" />
                <FormFeedback >{errorEmail}</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for="password">密碼</Label>
                <Input invalid={errorPassword.length > 0} type="password" onChange={setInfoFirst} name="password" id="password" placeholder="密碼" />
                <FormFeedback >{errorPassword}</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for="password2">確認密碼</Label>
                <Input type="password" onChange={setInfoSecond} name="password2" id="password2" placeholder="確認密碼" />
            </FormGroup>
            <FormGroup>
                <Label for="sex">性別</Label>
                <Input invalid={errorSex.length > 0} value={info.sex} onChange={setInfoSex} type="select" name="sex" id="sex">
                    <option value='M'>男</option>
                    <option value='F'>女</option>
                </Input>
                <FormFeedback >{errorSex}</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for="phone">電話</Label>
                <Input invalid={errorPhone.length > 0} type="number" onChange={setInfoPhone} name="phone" id="phone" placeholder="09xx 或 02xx" />
                <FormFeedback >{errorPhone}</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for="birthday">生日</Label>
                <Input
                    invalid={errorBirthday.length > 0}
                    type="date"
                    name="birthday"
                    id="birthday"
                    onChange={setInfoBirthday}
                />
                <FormFeedback >{errorBirthday}</FormFeedback>
            </FormGroup>
            <Button className="btn btn-primary" onClick={() => submit()}>Submit</Button>
        </Form>
    );

}


