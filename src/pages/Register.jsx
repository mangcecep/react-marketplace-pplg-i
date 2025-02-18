import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { registerSubmit } from "../redux/userSlice"
import { useEffect } from "react"

const Register = () => {
    const { register, handleSubmit } = useForm()
    const dispatch = useDispatch()
    const onSubmit = (value) => dispatch(registerSubmit(value))
    const registerState = useSelector((data) => data?.user)

    useEffect(() => {
        localStorage.getItem("token") !== null ? window.location.href = '/dashboard' : null
    }, [])

    return (
        <div className="container bg-light my-5 p-5">
            <span className="text-danger">{registerState?.err?.message}</span>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">name</label>
                    <input
                        type="text"
                        className="form-control"
                        {...register("name")}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        {...register("email")}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input
                        type="password" className="form-control"
                        {...register("password")}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword2" className="form-label">Password Confirmation</label>
                    <input type="password" className="form-control"
                        {...register("password_confirmation")}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Register