import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

export default function Signin({ onSignIn }) {
    let history = useHistory();

    const [email, setEmail] = useState('ginobili@gmail.com')
    const [password, setPassword] = useState('ginobili')

    function onEmailChange(e) {
        setEmail(e.target.value)
    }

    function onPasswordChange(e) {
        setPassword(e.target.value)
    }
    function onSubmitSignIn() {
        fetch('http://localhost:3002/signin', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3002'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    onSignIn(user)
                    history.push('profile')
                }
            })
    }

    return (
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="email"
                                name="email-address"
                                onChange={onEmailChange}
                                value={email}
                                id="email-address" />
                        </div>

                        <div className="mv3">
                            <label
                                className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input value={password} onChange={onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" />
                        </div>
                    </fieldset>
                    <div className="">
                        <input
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit"
                            type="submit"
                            value="Sign in"
                            onClick={onSubmitSignIn}
                        />

                    </div>
                    <div className="lh-copy mt3">
                        <p
                            onClick={() => history.push('register')}
                            className="f6 link dim black db pointer"
                        >
                            Register
                        </p>
                    </div>
                </div>
            </main>
        </article >
    )
}


