import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold, faItalic, faUnderline, faListUl, faListOl, faCode } from '@fortawesome/free-solid-svg-icons'

function StyleButton(props) {
    const onToggle = (e) => {
        e.preventDefault();
        props.focusEditor();
        props.onToggle(props.style);
    };

    let className = 'RichEditor-styleButton';
    if (props.active) {
        className += ' RichEditor-activeButton';
    }
    let icon;
    switch (props.label) {
        case 'B':
            icon = <FontAwesomeIcon icon={faBold} />
            break;
        case 'I':
            icon = <FontAwesomeIcon icon={faItalic} />
            break;
        case 'U':
            icon = <FontAwesomeIcon icon={faUnderline} />
            break;
        case 'UL':
            icon = <FontAwesomeIcon icon={faListUl} />
            break;
        case 'OL':
            icon = <FontAwesomeIcon icon={faListOl} />
            break;
        case 'Code':
            icon = <FontAwesomeIcon icon={faCode} />
            break;

        default:
            icon = props.label;
            break;
    }


    return (
        <span className={className} onMouseDown={onToggle}>
            {icon}
        </span>
    );
}
export default StyleButton;
