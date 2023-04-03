import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import './EmojiDrawer.css';
function EmojiDrawer(props) {
    const [open, setOpen] = useState(false);
    const emojis = [
        "😀",
        "😃",
        "😄",
        "😁",
        "😆",
        "😅",
        "😂",
        "🤣",
        "😉",
        "😊",
        "😇",
        "🙂",
        "🙃",
        "😋",
        "😌",
        "😍",
    ]
    let sendEmoji = props.sendEmoji;
    const emojiDivs = emojis.map((emoji, idx) =>
        <div key={idx + "emoji"} className="emoji-drawer__container__emoji" onMouseDown={() => sendEmoji(emoji)} >
            {emoji}
        </div>
    );


    return (
        <div className="emoji-drawer">
            <FontAwesomeIcon icon={faSmile} className='emoji-button' onClick={() => setOpen(!open)} />
            {open && (
                <>
                    <div className='emoji-blocker'></div>
                    <div className="emoji-drawer__container">
                        {emojiDivs}
                    </div>
                </>
            )}
        </div>
    );
}
export default EmojiDrawer;
