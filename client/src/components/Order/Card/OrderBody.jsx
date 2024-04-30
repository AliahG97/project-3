import ListItem from "../../ListItem";
import ProductHeader from "../../Product/Card/ProductHeader";
import { Link } from "react-router-dom";

export default function OrderBody(order) {

  const {
    _id,
    purchaseDate,
    products
  } = order

  return (
    <div className="Order-Body">
      <ul className="Product-List">
        {products.map((product) => (
          <ListItem key={product.name}>
            <ProductHeader key={product}/>
            <Link
            to={`/product/${product._id}`}
            className="badge bg-primary rounded-pill"
            >
              View Product
            </Link>
          </ListItem>
        ))}
      </ul>
      <section className="Order-Total">
        {/* <p>Order Total: {order.total}</p> */}
      </section>
    </div>
  )
}