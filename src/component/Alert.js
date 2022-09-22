import styles from "./Alert.module.css";

function Alert(props) { // color info
    return (
        <aside className={styles.alert}>
            <div className={styles.alertContent} style={{
                color: props.color
            }}>
                <svg style={{
                    marginRight: "5px"
                }}
                fill="none" width="22px" height="22px" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 7v6M12 17.01l.01-.011M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke={props.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                { props.info }
                </div>
        </aside>
    )
}

export default Alert;