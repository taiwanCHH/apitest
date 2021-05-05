import React, { Component,useState } from 'react';
import { ContextStore } from '../index.js';
import { Button, Form, FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';
import {checkPassWordValidity, checkValidity} from "../shared/utility";

export const Member = (props) => {
    const { cart, dispatch } = React.useContext(ContextStore);

    const [password, setPassword] = useState({
        firstPassword: "",
        secondPassword: "",
       });
    const [errorPassword, setErrorPassword] = useState('');
  
  
  const setFirst = (event) => {
    setPassword({ ...password, firstPassword: event.target.value });
  };
  const setSecond = (event) => {
    setPassword({ ...password, secondPassword: event.target.value });
  };
  
  const submit=()=>{
      var errorMessage=checkPassWordValidity(password.firstPassword,password.secondPassword)
      console.log('v:'+errorMessage)
      setErrorPassword(errorMessage)
      console.log(checkValidity(password.firstPassword,{required:true}))
  }

    return (
        <Form>
          <FormGroup>
            <Label for="name">暱稱</Label>
            <Input type="email" name="name" id="name" placeholder="暱稱" />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input type="email" name="email" id="email" placeholder="email" />
          </FormGroup>
          <FormGroup>
            <Label for="password">密碼</Label>
            <Input invalid={ errorPassword.length>0 }  type="password" onChange={setFirst} name="password" id="password" placeholder="密碼" />
            <FormFeedback >{errorPassword}</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="password2">確認密碼</Label>
            <Input type="password" onChange={setSecond} name="password2" id="password2" placeholder="確認密碼" />
          </FormGroup>
          <FormGroup>
            <Label for="sex">性別</Label>
            <Input type="select" name="sex" id="sex">
              <option>男</option>
              <option>女</option>
            </Input>
          </FormGroup>
          <FormGroup>
        <Label for="birthday">生日</Label>
        <Input
          type="date"
          name="birthday"
          id="birthday"
          placeholder="生日"
        />
      </FormGroup>
          <Button onClick={() => submit()}>Submit</Button>
        </Form>
      );

}


