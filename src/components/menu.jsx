import style from "./menu.module.css"
import home from "../assets/home.png"

export const Menu = (props) => {
    return (
        <>
            <nav className={`navegacao ${style['navBar']}`}>
           
                <ul className={`menu ${style['nav-menu']}`}>
                    <li  >
                        <a className={`nav-link ${style['nav-link']}`} href={"/"}><img src={home} alt="home"style={{width: "40px"}} /></a>
                    </li>
                         <p className={`nav-link ${style['nav-link']}`} style={{cursor: "default"}}>{props.option01}</p>
                    <li  >
                        <a className={`nav-link ${style['nav-link']}`} href={`/${props.option02}`}>{props.option03}</a>
                    </li>
                </ul>
            </nav>
        </>
    )
}