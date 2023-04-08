import defaultIcon from "../../../assets/defaultIcon.png";
import { marked } from "marked";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import MainChatInput from "../../MainChatInput";
// marked.setOptions({
//     breaks: true,
//     gfm: true,
// });


function ChatMessage({ message, user, deleteMessage, editMessage, socket }) {
    const [isHovering, setIsHovering] = useState(false);
    const [dropDown, setDropDown] = useState(false);
    const [edit, setEdit] = useState(false);
    const [editMessageText, setEditMessageText] = useState("");
    function getTimeFromDate(date) {
        let time = new Date(date);
        let hours = time.getHours();
        let minutes = time.getMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        let strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }
    function convertMonthDayYearToFullWords(date) {
        let dateObj = new Date(date);
        let month = dateObj.toLocaleString('default', { month: 'long' });
        let day = dateObj.getDate();
        let year = dateObj.getFullYear();
        return `${month} ${day}, ${year}`;
    }
    function messageP() {
        return message.message;
    }
    if (message.message) {
        // strip single spaces bettween letters and an asterisk
        message.message = message.message.replace(/(\w) \*(.*?)/g, '$1*$2');
        message.message = message.message.replace(/__(.*?)__/gm, '<u>$1</u>');
        //remove (undefined) from the message
        message.message = message.message.replace(/\(undefined\)/g, '');

        // conver @mentions to bold
        message.message = message.message.replace(/\[@(\w+)\]/g, ' <b class="chat-mention-in-chat">@$1</b> ');
        message.message = marked(message.message);
    }
    if (message.isDate) {
        return (
            <div className='chat-message-date-breaker'>
                <div className="chat-message-date">
                    {convertMonthDayYearToFullWords(message.date)}
                </div>
            </div>
        )
    }
    function convertToTint(name) {
        // if the first letter of the name is A-E, return tint-A
        // if the first letter of the name is F-J, return tint-B
        // if the first letter of the name is K-O, return tint-C
        // if the first letter of the name is P-T, return tint-D
        // if the first letter of the name is U-Z, return tint-E

        let firstLetter = name[0].toUpperCase();
        let tint = 'A';
        if (firstLetter >= 'F' && firstLetter <= 'J') {
            tint = 'B';
        }
        if (firstLetter >= 'K' && firstLetter <= 'O') {
            tint = 'C';
        }
        if (firstLetter >= 'P' && firstLetter <= 'T') {
            tint = 'D';
        }
        if (firstLetter >= 'U' && firstLetter <= 'Z') {
            tint = 'E';
        }
        return `chat-logo-tint-${tint}`;

    }

    function showDelete() {
        if (message.userid === user.id && isHovering) {
            return true;
        }
        return false;
    }
    function showDropDown() {
        setDropDown(!dropDown);
    }
    function trySetEdit(content) {
        setEdit(!edit);
        setEditMessageText(content);
        setDropDown(false);
    }
    function sendEditedMessage(content) {
        console.log("sendEditedMessage", content, message.id);
        //editMessage(message.id, editMessageText);
        editMessage(message.id, content);
        setEdit(false);
    }
    return (

        <div className="chat-message" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <div className="chat-message-icon">
                {message.profileicon ? <img src={message.profileicon} alt="profile icon" /> : <img src={defaultIcon} alt="profile icon" className={convertToTint(message.firstname)} />}
            </div>
            <div className="chat-message-content">
                <div className="chat-message-content-header">
                    <h4>{message.firstname} {message.lastname} <span className='chat-message-date'>{getTimeFromDate(message.date)}</span></h4>

                    {showDelete() && <div className="chat-message-edit-delete">
                        <div className="chat-message-edit-dropdown-button" onClick={showDropDown}>
                            <FontAwesomeIcon icon={faEllipsis} />
                        </div>
                        {dropDown && <div className="chat-message-edit-dropdown">
                            <div className="chat-message-edit-dropdown-item" onClick={() => trySetEdit(message.message)}>Edit</div>
                            <div className="chat-message-edit-dropdown-item" onClick={() => deleteMessage(message.id)}>Delete</div>
                        </div>}
                    </div>}
                </div>

                {edit ? <MainChatInput socket={socket} editMessageText={editMessageText} onSend={sendEditedMessage} /> :
                    <p dangerouslySetInnerHTML={{ __html: message.message }}></p>}

            </div>
        </div>

    )
}
export default ChatMessage;
