import React from "react";
import {Link} from "react-router-dom";
import {Iform} from "../../../../interfaces/interface";
import "./Login.css";



const Login = () => {
    const [form, setForm] = React.useState<Iform>({name: "", room: ""});
    const formHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [event.target.name]: event.target.value});
    };
    return (
        <div>
            <h1>Login</h1>
            <div>
                <input
                    type="text"
                    placeholder="Name"
                    value={form.name}
                    name="name"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => formHandler(event)}
                />
                <input
                    type="text"
                    placeholder="Room"
                    value={form.room}
                    name="room"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => formHandler(event)}
                />
                <Link
                    onClick={(event: React.MouseEvent<HTMLAnchorElement>) => (!form.name || !form.room ? event.preventDefault() : null)}
                    to={`/chat?user=${form.name}&room=${form.room}`}
                >
                    <button>LOGIN</button>
                </Link>
            </div>
        </div>
    )
};
export default Login