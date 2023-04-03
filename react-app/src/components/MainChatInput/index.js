import './MainChatInput.css';
import { useState, useEffect } from "react";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold, faItalic, faPaperPlane, faUnderline, faListUl, faListOl, faCode } from '@fortawesome/free-solid-svg-icons'
import { Editor, EditorState, RichUtils, getDefaultKeyBinding, Modifier, ContentState, CompositeDecorator, convertFromRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import StyleButton from './aux/StyleButton';
import EmojiDrawer from './aux/EmojiDrawer';
import { BLOCK_TYPES, styleMap } from './aux/blockTypes';
function MainChatInput() {

    function BlockStyleControls(props) {

        const selection = editorState.getSelection();
        const blockType = editorState
            .getCurrentContent()
            .getBlockForKey(selection.getStartKey())
            .getType();

        const inlineStyle = editorState.getCurrentInlineStyle();


        return (
            <div className="RichEditor-controls" onClick={focusEditor}>
                {BLOCK_TYPES.map((type) => (
                    <StyleButton

                        key={type.label}
                        active={type.style === blockType || inlineStyle.has(type.style)}
                        label={type.label}
                        focusEditor={focusEditor}
                        onToggle={type.type ? toggleInlineStyle : toggleBlockType}
                        style={type.style}
                    />
                ))}
            </div>
        );
    }

    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty(),
    );
    const editor = React.useRef(null);
    function focusEditor() {
        editor.current.focus();
    }


    function toggleBlockType(blockType) {

        onChange(
            RichUtils.toggleBlockType(
                editorState,
                blockType
            )
        );
    }
    function toggleInlineStyle(inlineStyle) {
        onChange(
            RichUtils.toggleInlineStyle(
                editorState,
                inlineStyle
            )
        );
    }
    function getBlockStyle(block) {
        switch (block.getType()) {
            case 'blockquote': return 'RichEditor-blockquote';
            default: return null;
        }
    }
    function mapKeyToEditorCommand(e) {
        if (e.key === "Enter") {
            console.log(editorState.getCurrentContent().getPlainText('\u0001'));
        }

        if (e.keyCode === 9 /* TAB */) {
            e.preventDefault();
            const newEditorState = RichUtils.onTab(
                e,
                editorState,
                4, /* maxDepth */
            );
            if (newEditorState !== editorState) {
                onChange(newEditorState);
            }
            return;

        }
        return getDefaultKeyBinding(e);
    }
    const sendTextToEditor = (text) => {
        setEditorState(insertText(text, editorState));
    };

    const insertText = (text, editorValue) => {
        const currentContent = editorValue.getCurrentContent();
        const currentSelection = editorValue.getSelection();

        const newContent = Modifier.replaceText(
            currentContent,
            currentSelection,
            text
        );

        const newEditorState = EditorState.push(
            editorValue,
            newContent,
            "insert-characters"
        );
        return EditorState.forceSelection(
            newEditorState,
            newContent.getSelectionAfter()
        );
    };





    function handleKeyCommand(command, editorState) {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    }
    function onChange(value) {
        setEditorState(value);
    }
    return <>
        <div className="main-chat-input">

            <div className="main-chat-input-controls" >
                <BlockStyleControls
                    editorState={editorState}
                    onToggle={toggleBlockType}
                />
            </div>
            <div className="main-chat-input-text" onClick={focusEditor}>
                <Editor
                    ref={editor}
                    blockStyleFn={getBlockStyle}
                    editorState={editorState}
                    handleKeyCommand={handleKeyCommand}
                    onChange={setEditorState}
                    placeholder="... Message"
                    keyBindingFn={mapKeyToEditorCommand}
                    customStyleMap={styleMap}
                /></div>
            <div className="main-chat-input-buttons">

                <div className='main-chat-emojis'><EmojiDrawer sendEmoji={sendTextToEditor} /></div>
                <div className='main-chat-submit'><FontAwesomeIcon icon={faPaperPlane} /></div>

            </div>
        </div>
    </>
}
export default MainChatInput
