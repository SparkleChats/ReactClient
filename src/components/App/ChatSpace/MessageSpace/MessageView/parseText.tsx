import {ReactNode} from "react";

const urlPattern =
    /(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}(\.[a-zA-Z0-9()]{1,6})?\b[-a-zA-Z0-9()@:%_+.~#?&\/=]*)/;
const fullMediaUrlPattern =
    /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}(\.[a-zA-Z0-9()]{1,6})?\b[-a-zA-Z0-9()@:%_+.~#?&\/=]*\.[a-zA-Z0-9]+$/;

function parseText(text: string): ReactNode {
    if (fullMediaUrlPattern.test(text))
        return <></>
    return text.split("\n").map((line, i) => {
        return (
            <p key={i}>
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
            </p>
        );
    });
}


export default parseText;