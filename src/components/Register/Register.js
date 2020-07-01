import React, { useState } from 'react'

export default function Register({ onRouteChange, loadUser }) {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    function onNameChange(e) {
        setName(e.target.value)
    }
    function onEmailChange(e) {
        setEmail(e.target.value)
    }
    function onPasswordChange(e) {
        setPassword(e.target.value)
    }


    function onSubmitRegister() {
        fetch('http://localhost:3002/register', {
            method: 'post',
            headers: {
                'Content-type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3002'
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        }).then(response => response.json()
            .then(user => {
                if (user.id) {
                    onRouteChange('home')
                    loadUser(user)
                }
            })
        )

    }

    return (
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
                            <input onChange={onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name" id="name" />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input onChange={onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="email-address" />
                        </div>

                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input onChange={onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" />
                        </div>
                    </fieldset>
                    <div className="">
                        <input
                            onChange={onSubmitRegister}
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit"
                            value="Register"
                            onClick={onSubmitRegister}
                            type="submit"
                        />
                    </div>
                </div>
            </main>
        </article >
    )
}


