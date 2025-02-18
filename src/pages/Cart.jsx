import { useSelector } from 'react-redux'
import { formatRupiah } from '../utils';

const Cart = () => {
    const { cart } = useSelector(root => root);

    return (
        <div className="container mt-4">
            <h2>cart</h2>
            {
                cart.map((p, idx) => <div className="card" key={idx}>
                    <div className="card-header">
                        <div className="card-title">{p?.products_name}</div>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-3">
                                <img src={p?.img_url} className='img-thumbnail' width={150} />
                            </div>
                            <div className="col-lg-5">
                                <div className="cart-title">
                                    <h6 className="card-title">Price: {formatRupiah(p.price)}</h6>
                                </div>
                                <div className="cart-text">
                                    Price: {p.description}
                                </div>
                                <div className="cart-text">
                                    qty: {p.stock}
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <h6 className="card-title">subtotal: {formatRupiah(p?.price * p?.stock)}</h6>
                        </div>
                        <div className="col-lg-1">
                            <button className="btn btn-danger"><i className="fa fa-trash" /></button>
                        </div>
                        {
                            idx === cart.length - 1 ? <div className="cart-footer p-5">
                                <div className="text-end">
                                    <h5>total {formatRupiah(cart.reduce((acc, current) => acc + (current.price * current.stock), 0))}</h5>
                                </div>
                            </div> : ""
                        }
                        <div className="cart-footer">

                        </div>
                    </div>
                </div>)
            }
        </div>
    )
}

export default Cart