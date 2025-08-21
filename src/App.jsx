import { useState, useEffect, useRef } from 'react'
import './App.css'
import { apiProduct } from './service/productApi'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import Info from "./PJnfo/Pnfo"
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/info/${product.id}`)} className="product" key={product.id}>
      <img width={150} src={product.images[0]} alt={product.title} />
      <h2>{product.title}</h2>
      <div className='person'>
        <p className="p">{truncateText(product.description, 30)} <span>Read More</span></p>
        <div className="skelet">{product.category.slug}</div>
        <div className="price">
          <p><span>Price</span> - $ {product.price}</p>
          <button className="basket">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

const truncateText = (text, limit = 30) => {
  if (!text) return ""
  return text.length > limit ? text.substring(0, limit) + " ..." : text
}

function App() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [active, setActive] = useState('All')
  const [search, setSearch] = useState("")
  const indicatorRef = useRef(null)
  const buttonsRef = useRef([])

  const press = (name, id, index) => {
    setActive(name)
    moveIndicator(index)
    apiProduct.getProductsByCategory(id).then(data => {
      setProducts(data)
    })
  }

  const moveIndicator = (index) => {
    const btn = buttonsRef.current[index]
    if (btn && indicatorRef.current) {
      indicatorRef.current.style.top = btn.offsetTop + "px"
      indicatorRef.current.style.height = btn.offsetHeight + "px"
    }
  }

  const handleSearch = () => {
    if (search.trim() === "") {
      apiProduct.getProducts().then(data => setProducts(data))

    } else {
      apiProduct.getProducts().then(data => {
        const filtered = data.filter(prod =>
          prod.title.toLowerCase().includes(search.toLowerCase()) ||
          prod.description.toLowerCase().includes(search.toLowerCase())
        )
        setProducts(filtered)
      })
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  useEffect(() => {
    apiProduct.getProducts().then(data => setProducts(data))
    apiProduct.getCategories().then(data => setCategories(data))
    setTimeout(() => moveIndicator(0), 0)
  }, [])

  if (categories.length === 0) {
    return (
      <div className="offline-wrap" role="status" aria-live="polite">
        <div className="loader-spinner" aria-hidden="true"></div>
        <div style={{ textAlign: "center", marginTop: 8, fontSize: 24 }}>
          Нет интернета — пробуем восстановить соединение...
        </div>
        <div className="skeleton" style={{ marginTop: 12 }}></div>
        <div className="dots" style={{ marginTop: 8 }}>
          <span></span><span></span><span></span>
        </div>
      </div>
    )
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="container">
            <div className="content">
              <div className='inp'>
                <button className='lupa' onClick={handleSearch}><i className="bi bi-search"></i></button>
                <input
                  type="text"
                  placeholder='Search...'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <div className="products">
                <div className="products-list">
                  {products.length === 0
                    ? <h1>Продукты по этой категории пока что отсутствуют</h1>
                    : products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                </div>
                <div className="categories">
                  <h3><i className="bi bi-grid"></i>Categories :</h3>
                  <div className="indicator" ref={indicatorRef}></div>
                  <button
                    onClick={() => {
                      setActive("All")
                      apiProduct.getProducts().then(data => {
                        setProducts(data)
                        moveIndicator(0)
                      })
                    }}
                    className={active === "All" ? "btn active" : "btn"}
                    ref={(el) => (buttonsRef.current[0] = el)}>
                    All</button>
                  {categories.map((category, index) => (
                    <button
                      key={category.id}
                      ref={(el) => (buttonsRef.current[index + 1] = el)}
                      onClick={() => press(category.name, category.id, index + 1)}
                      className={active === category.name ? 'btn active' : 'btn'}>
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        } />
        <Route path="/info/:id" element={<Info />} />
      </Routes>
    </Router >
  )
}

export default App