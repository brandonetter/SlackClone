import defaultIcon from "../../../assets/defaultIcon.png";
import { marked } from "marked";
// marked.setOptions({
//     breaks: true,
//     gfm: true,
// });


function ChatMessage({ message }) {
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

    return (

        <div className="chat-message">
            <div className="chat-message-icon">
                {message.profileicon ? <img src={message.profileicon} alt="profile icon" /> : <img src={defaultIcon} alt="profile icon" />}
            </div>
            <div className="chat-message-content">
                <h4>{message.firstname} {message.lastname} <span className='chat-message-date'>{getTimeFromDate(message.date)}</span></h4>
                <p dangerouslySetInnerHTML={{ __html: message.message }}></p>
            </div>
        </div>

    )
}
export default ChatMessage;
