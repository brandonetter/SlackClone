import './MainChatInput.css';
import { useState } from "react";
function MainChatInput(){
    const [text, setText] = useState('');
    const [control, setControl] = useState(false);
    const [shift, setShift] = useState(false);
    const [strike, setStrike] = useState(false);
    function contentEditableInput(e){

        if(e.key !== 'Enter'){

            setText(e.target.innerText);

        }
    }
    function trackCommands(e){
        let bool = e.type === 'keydown'? true : false;
        if(e.key === 'Control'){
            setControl(bool);
        }
        if(e.key === 'Shift'){
            setShift(bool);

        }
        if(e.key === 'X'){
            if(shift && control && !bool){
                if(!strike){
                handleCommands({data: 'x'},false);
                    setStrike(true);
                }else{
                    handleCommands({data: 'NOx'},false);
                    setStrike(false);
                }
            }
        }

    }

    function handleCommands(e, bool = true){
        let elm = document.querySelector('.main-chat-input-text');
        if(e.data === "x"){
            if(bool){
        e.preventDefault();
        e.stopPropagation();
            }
        const paragraph = document.createElement('s');
        paragraph.innerHTML = '&#8203;';
        elm.append(paragraph);

        const range = new Range();
        range.selectNode(paragraph);
        range.setStart(paragraph, 1);
        range.collapse(true);

        const selection = document.getSelection();

             selection.removeAllRanges();

            selection.addRange(range);

        }
        if(e.data === "NOx"){
            if(bool){
        e.preventDefault();
        e.stopPropagation();
            }
            console.log('NOx');
            const paragraph = document.createElement('span');
        paragraph.innerHTML = '&#8203;';
        elm.append(paragraph);
        const range = new Range();
        range.selectNode(paragraph);
        //set range to end of text
        range.setStart(paragraph,1);
        range.collapse(true);

        const selection = document.getSelection();

             selection.removeAllRanges();

            selection.addRange(range);

        }


    }
    return <>
    <div className="main-chat-input">
        {text}
        <div className="main-chat-input-icons"></div>
        <div contentEditable="true" className="main-chat-input-text" onKeyDown={trackCommands} onKeyUp={trackCommands} onBeforeInput={handleCommands} onInput={contentEditableInput}></div>
        <div className="main-chat-input-buttons"></div>
    </div>
    </>
}
export default MainChatInput
