import React, { Component} from "react";
import styles from "./Skills.module.scss";


export default class Skills extends Component {
    render() {
        return(
            <table className={styles.skills}>
                <tbody>
                    {Object.entries(this.props.skills).map((entry, index) => {
                        return(<tr key={index}>
                            <td>{entry[0]} :</td>
                            <td>{entry[1]}</td>
                        </tr>)
                    })}
                </tbody>
            </table>
        );
    }
}