import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { apiProduct } from "../service/productApi"
import './info.css'

const Info = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState(null)
    const [activeImage, setActiveImage] = useState(null)

    useEffect(() => {
        apiProduct.getProductById(id).then(data => {
            setProduct(data)
            setActiveImage(data.images?.[0]) 
        })
    }, [id])

    if (!product) return <h1></h1>

    return (
        <section>
            <div className="images">
                {product.images.map((img, index) => (
                    <img
                        key={index}
                        width={80}
                        src={img}
                        alt=""
                        onClick={() => setActiveImage(img)}
                        style={{ cursor: "pointer" }}
                        className={activeImage === img ? "thumb active" : "thumb"}/>
                ))}
            </div>
            <div className="owner">
                <img src={activeImage} alt={product.title} width={290} height={300} />
                <div className="column">
                    <div className="price">
                        <h1>{product.title}</h1>
                        <button
                            className="back"
                            onClick={() => navigate(-1)}>
                            Back
                        </button>
                    </div>
                    <div className="skelets">{product.category.slug}</div>
                    <div className="person">
                        <p>{product.description}</p>
                        <div className="price">
                            <p><span>Price</span> - $ {product.price}</p>
                            <button className="basket">Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Info