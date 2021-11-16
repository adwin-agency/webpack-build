import React from "react"
import styles from './styles/styles.module.scss'
import Logo from './img/delivery.react.svg'

export const App = () => {


    return (
        <div className={styles.app}>
            <div className="text">text</div>
            <div className={styles.div}></div>
            <span className={styles.div} dangerouslySetInnerHTML={{ __html: Logo }} />
        </div>
    )
}