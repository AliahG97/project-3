export default function ProductHeader({ product }) {
  return (
    <div className="Product-Header">
      <h2 className="Product-Name col-8">{product.name}</h2>
      <p className="Product-Price col-4">{product.price}</p>
    </div>
  )
}