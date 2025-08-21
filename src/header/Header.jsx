import React, { use } from 'react'
import './Header.css'
import { useEffect } from 'react'

const Header = () => {
    const [toggle, setToggle] = React.useState(false)

    useEffect(() => {
        document.body.classList.add('light')
    }, [])

    const light = () => {
        document.body.classList.remove("dark")
        document.body.classList.add("light")
        setToggle(false)
    }

    const night = () => {
        document.body.classList.remove("light")
        document.body.classList.add("dark")
        setToggle(true)
    }

    return (
        <header style={
            {
                backgroundImage: 'url("https://t4.ftcdn.net/jpg/02/84/84/15/360_F_284841568_6xzLo9f4rKxEoX9QkeqeBL29UcsUj6Kf.jpg")'
            }
        }>
            <div className='container'>
                <div className='owl'>
                    <strong>React Shop</strong>
                    <ul className='forward'>
                        <li>Home</li>
                        <li>Products</li>
                        <li>About</li>
                    </ul>
                    <div className='batons'>
                        <div className='h-search'>
                            <button onClick={light} className={toggle ? 'baton' : 'baton active'}><i className="bi bi-sun"></i></button>
                            <button onClick={night} className={!toggle ? 'baton' : 'baton active'}><i className="bi bi-moon-stars"></i></button>
                        </div>
                        <hr className='hr'/>
                        <button className='arsen'>
                            <a href="https://github.com/arsen21-px" target="_blank" rel="noopener noreferrer">
                                <i class="bi bi-github"></i>
                            </a>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header