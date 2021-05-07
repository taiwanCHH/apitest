import React, { Component, useState, useEffect } from 'react';
import { ContextStore } from '../index.js';
import { Button, Form, FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';
import { checkPassWordValidity, checkEmptyValidity, checkEmailValidity } from "../shared/utility";
import axios from 'axios';
import * as ActionType from '../store/ActionType';
import {decode as base64_decode} from 'base-64';

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

    const saveToken = (token)=>{
        let aa=token.split(".");
        let deToken = base64_decode(aa[1]);
        let jsonToken = JSON.parse(deToken);
        localStorage.setItem('token', token);
        localStorage.setItem('name', jsonToken.sub);
        localStorage.setItem('email', jsonToken.email);
        dispatch({ type: ActionType.AUTH_SUCCESS, name: jsonToken.sub})
      }

    const submit = () => {
        let errName = checkEmptyValidity(info.name)
        setErrorName(errName)
        let errEmail = checkEmailValidity(info.email)
        setErrorEmail(errEmail)
        let errPassword = checkPassWordValidity(info.firstPassword, info.secondPassword)
        setErrorPassword(errPassword)
        let errSex = checkEmptyValidity(info.sex)
        setErrorSex(errSex)
        let errPhone = checkEmptyValidity(info.phone)
        setErrorPhone(errPhone)
        let errBirthday = checkEmptyValidity(info.birthday)
        setErrorBirthday(errBirthday)

        if (errName.length === 0 &&
            errEmail.length === 0 &&
            errPassword.length === 0 &&
            errSex.length === 0 &&
            errorPhone.length === 0 &&
            errBirthday.length === 0) {
            const user = {
                "userPhone": info.phone,
                "userSex": info.sex,
                "userBirthday": info.birthday,
                "userName": info.name,
                "email": info.email,
                "password": info.firstPassword

            };
            axios.post('/api/AuthManagement/Register', user)
                .then(response => {
                    saveToken(response.data.token)
                })
                .catch(e => {
                    let error = JSON.parse(e.response.data.errors[0]);
                    if (error.Email !== null) {
                        setErrorEmail(error.Email)
                    } else {
                        console.log(e.response.data.errors)
                    }

                });

        }

    }

    return (

        <Form>
            <h3>註冊</h3>
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

export const Info = () => {
    const { cart, dispatch } = React.useContext(ContextStore);

    const [info, setInfo] = useState({
        name: "",
        email: "",
        sex: "M",
        phone: '',
        birthday: "",
    });
    const [errorName, setErrorName] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorSex, setErrorSex] = useState('');
    const [errorPhone, setErrorPhone] = useState('');
    const [errorBirthday, setErrorBirthday] = useState('');

    const setInfoName = (event) => { setInfo({ ...info, name: event.target.value }); };
    const setInfoEmail = (event) => { setInfo({ ...info, email: event.target.value }); };
    const setInfoSex = (event) => { setInfo({ ...info, sex: event.target.value }); };
    const setInfoPhone = (event) => { setInfo({ ...info, phone: event.target.value }); };
    const setInfoBirthday = (event) => { setInfo({ ...info, birthday: event.target.value }); };

    const token=localStorage.getItem('token')
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
    useEffect(() => {
        axios.get('/api/UserInfo', {
            headers: headers
        })
            .then((response) => {
                console.log(response)
                setInfo({
                    name: localStorage.getItem('name'),
                    email: localStorage.getItem('email'),
                    phone: response.data.userPhone,
                    sex: response.data.userSex,
                    birthday: response.data.userBirthday
                });
            })
            .catch(e => {

            });
    }, [setInfo]);

    const submit = () => {
        console.log('llok')
        let errName = checkEmptyValidity(info.name)
        setErrorName(errName)
        let errEmail = checkEmailValidity(info.email)
        setErrorEmail(errEmail)
        let errSex = checkEmptyValidity(info.sex)
        setErrorSex(errSex)
        let errPhone = checkEmptyValidity(info.phone)
        setErrorPhone(errPhone)
        let errBirthday = checkEmptyValidity(info.birthday)
        setErrorBirthday(errBirthday)

        if (errName.length === 0 &&
            errEmail.length === 0 &&
            errSex.length === 0 &&
            errorPhone.length === 0 &&
            errBirthday.length === 0) {
            const user = {
                "userPhone": info.phone,
                "userSex": info.sex,
                "userBirthday": info.birthday,
            };
            axios.put('/api/UserInfo', user, {
                headers: headers
            })
                .then(response => {
                    console.log(response.data)
                })
                .catch(e => {
                    console.log(e.response.data.errors)
                });

        }

    }

    return (

        <Form>
            <h3>會員資料</h3>
            <FormGroup disabled>
                <Label for="name" >暱稱</Label>
                <Input value={info.name} disabled type="text" onChange={setInfoName} name="name" id="name" placeholder="暱稱" />
                <FormFeedback >{errorName}</FormFeedback>
            </FormGroup>
            <FormGroup disabled>
                <Label for="email">Email</Label>
                <Input value={info.email} disabled type="email" onChange={setInfoEmail} name="email" id="email" placeholder="email" />
                <FormFeedback >{errorEmail}</FormFeedback>
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
                <Input invalid={errorPhone.length > 0} value={info.phone} type="number" onChange={setInfoPhone} name="phone" id="phone" placeholder="09xx 或 02xx" />
                <FormFeedback >{errorPhone}</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for="birthday">生日</Label>
                <Input
                    invalid={errorBirthday.length > 0}
                    value={info.birthday}
                    type="date"
                    name="birthday"
                    id="birthday"
                    onChange={setInfoBirthday}
                />
                <FormFeedback >{errorBirthday}</FormFeedback>
            </FormGroup>
            <Button className="btn btn-primary" onClick={() =>submit()}>修改資料</Button>
        </Form>
    );


}


