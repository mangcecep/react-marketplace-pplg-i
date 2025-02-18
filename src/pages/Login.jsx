import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { loginSubmit } from "../redux/userSlice"
import { useEffect } from "react"
// import Swal from "sweetalert2"

const Login = () => {
    const { register, handleSubmit } = useForm()
    const loginState = useSelector(root => root.user)
    const dispatch = useDispatch()
    const onSubmit = (value) => dispatch(loginSubmit(value))

    useEffect(() => {
        localStorage.getItem("token") !== null ? window.location.href = '/dashboard' : null
    }, [])

    return (
        <div className="container bg-secondary my-5 p-5">
            <span className="text-danger">{loginState?.err?.message}</span>
            <form
                onSubmit={handleSubmit(onSubmit)}
            >
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
                    <input type="password" className="form-control"
                        {...register("password")}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login