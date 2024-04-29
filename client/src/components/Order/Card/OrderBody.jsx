import ListItem from "../../ListItem";
import ProductCard from "../../Product/Card/ProductCard";
import { Link } from "react-router-dom";

export default function OrderBody({ order }) {
  return (
    <div className="Order-Body">
      <ul className="Product-List">
        {order.products.map((product) => (
          <ListItem key={product.name}>
            <ProductCard key={product.name}/>
            <Link
            to={`/product/${product.name}`}
            className="badge bg-primary rounded-pill"
            >
              View Product
            </Link>
          </ListItem>
        ))}
      </ul>
      <section className="Order-Total">
        <p>Order Total: {order.total}</p>
      </section>
    </div>
  )
}