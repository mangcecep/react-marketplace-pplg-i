import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getProfile } from "../redux/userSlice"
import { fetchProductType } from "../redux/productTypeSlice"

const Dashboard = () => {
    const dispatch = useDispatch()
    const user = useSelector(root => root?.user)
    const productType = useSelector(root => root?.productType)
    const [loading, setLoading] = useState(true)
    const [showModalAddProductType, setShowModalAddProductType] = useState(false)

    useEffect(() => {
        dispatch(getProfile())
        dispatch(fetchProductType())
    }, [dispatch])

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (user?.err?.status == 401) {
                window.location.href = '/login'
            }
            setLoading(false)
        }, 2000)

        return () => clearTimeout(timeout)
    }, [user])


    if (loading) return <h1>Loading..</h1>

    return (
        <div className="container p-4">
            <div className="panel bg-light">
                <div className="panel-header py-5">
                    <h2 className="text-dark">Dashboard</h2>
                </div>
            </div>
            <div className="panel bg-light my-2">
                <div className="panel-header">
                    <h4 className="text-dark">Product Types </h4>
                    <button
                        onClick={() => setShowModalAddProductType(!showModalAddProductType)}
                        className="btn btn-outline-success">
                        <i className="fas fa-plus" />
                    </button>
                </div>
                <div className="panel-body">
                    <div className="table table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className="text-dark">No</th>
                                    <th className="text-dark">Product Type</th>
                                    <th className="text-dark">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    productType?.data?.map((product, id) => <tr key={id}>
                                        <td className="text-dark">{id + 1}</td>
                                        <td className="text-dark">{product?.type_name}</td>
                                        <td className="text-dark">
                                            <button type="button" className="btn btn-outline-warning">
                                                <i className="fas fa-edit" />
                                            </button>
                                            <br />
                                            <button type="button" className="btn btn-outline-danger my-2">
                                                <i className="fas fa-trash" />
                                            </button>
                                        </td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className={`modal fade ${showModalAddProductType ? "show" : ""}`}
                style={{ display: showModalAddProductType ? "block" : 'none' }} >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Add Product Type</h1>
                            <button
                                onClick={() => setShowModalAddProductType(!showModalAddProductType)}
                                type="button" className="btn-close btn btn-outline-light" data-bs-dismiss="modal" aria-label="Close">
                            </button>
                        </div>
                        <div className="modal-body">
                            <input
                                className="form-control bg-light"
                                placeholder="Product Type"
                            />
                        </div>
                        <div className="modal-footer">
                            <button
                                onClick={() => setShowModalAddProductType(!showModalAddProductType)}
                                type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard