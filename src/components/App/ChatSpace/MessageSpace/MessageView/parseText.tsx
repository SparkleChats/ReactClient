import {ReactNode} from "react";
import styles from "./MessageView.module.scss"

const urlPattern =
    /(https?:\/\/[-a-zA-Z0-9@:%._+~#=]{1,256}(\.[a-zA-Z0-9()]{1,6})?\b[-a-zA-Z0-9()!@:%_+.~#?&\/=]*)/;
const fullMediaUrlPattern =
    /^https?:\/\/[-a-zA-Z0-9@:%._+~#=]{1,256}(\.[a-zA-Z0-9()]{1,6})?\b[-a-zA-Z0-9()!@:%_+.~#?&\/=]*\.[a-zA-Z0-9]+$/;

function parseText(text: string): ReactNode {
    if (fullMediaUrlPattern.test(text) ||
        text.startsWith(window.location.origin + "/invitation/"))
        return <></>
    return text.split("\n").map((line, i) =>
        <div key={i} className={styles.text}>
            {line.split(urlPattern).map((part, j) => {
                if (urlPattern.test(part)) {
                    return (
                        <a key={j} href={part} target="_blank" rel="noopener noreferrer">
                            {part}
                        </a>
                    );
                } else {
                    return part;
                }
            })}
        </div>
    );
}


export default parseText;