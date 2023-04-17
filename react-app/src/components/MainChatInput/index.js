import './MainChatInput.css';
import { useState, useEffect, useMemo, useCallback } from "react";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold, faItalic, faPaperPlane, faUnderline, faListUl, faListOl, faCode } from '@fortawesome/free-solid-svg-icons'
import { Editor, EditorState, SelectionState, RichUtils, getDefaultKeyBinding, Modifier, ContentState, CompositeDecorator, convertFromRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { joinDefaultRoom, getUsersInRoom } from "../../store/channel";
import { useSelector } from "react-redux";
import StyleButton from './aux/StyleButton';
import EmojiDrawer from './aux/EmojiDrawer';
import { BLOCK_TYPES, styleMap } from './aux/blockTypes';
import draftToMarkdown from 'draftjs-to-markdown';
import { convertToRaw } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
function MainChatInput(props) {
    const [users, setUsers] = useState([]);
    const [mention, setMention] = useState({ state: undefined });
    const currentUsers = useSelector((state) => state.channel.users);
    const currentChannel = useSelector((state) => state.channel.room);
    useEffect(() => {
        if (!currentUsers) return;
        setUsers(currentUsers);
    }, [currentUsers]);



    useEffect(() => {
        // the editor must be reset when users change to update the decorator
        // using push
        if (props.editMessageText) {
            const blocksFromHtml = htmlToDraft(props.editMessageText);
            const { contentBlocks, entityMap } = blocksFromHtml;
            const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
            const editorStates = EditorState.push(editorState, contentState);
            setEditorState(editorStates);
            return;
        } else {
            const editorStates = EditorState.push(editorState, ContentState.createFromText(''));
            setEditorState(editorStates);
        }
    }, [users]);
    let socket = props.socket;



    const Mention = ({ children, contentState, entityKey }) =>
        <span className="chat-mention" title={contentState.getEntity(entityKey).getData().id}>{children}</span>

    const newEntityLocationStrategy = type => {
        const findEntitiesOfType = (contentBlock, callback, contentState) => {
            contentBlock.findEntityRanges(character => {
                const entityKey = character.getEntity()
                return (
                    entityKey !== null &&
                    contentState.getEntity(entityKey).getType() === type
                )
            }, callback)
        }
        return findEntitiesOfType
    }

    const decorator = new CompositeDecorator([
        {
            strategy: newEntityLocationStrategy('MENTION'),
            component: Mention
        }
    ])

    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty(decorator),
    );
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



        return getDefaultKeyBinding(e);
    }
    const sendTextToEditor = (text, editorS = editorState) => {
        setEditorState(insertText(text, editorS));
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
    function handleReturn(e) {
        if (!e.shiftKey) {

            const rawContentState = convertToRaw(editorState.getCurrentContent());

            // check if content is empty or just spaces
            if (rawContentState.blocks[0].text.trim().length === 0) {
                return 'handled';
            }
            const markup = draftToMarkdown(rawContentState);
            if (props.editMessageText) {
                props.onSend(markup);
                return;
            }
            socket.emit("chat-message", { channelId: currentChannel.id, 'message': markup });
            setEditorState(EditorState.createEmpty(decorator));

            return 'handled';
        }
        return 'not-handled';
    }
    function onChange(value) {
        setEditorState(value);
    }

    const getMentionPosition = () => {
        const range = window.getSelection().getRangeAt(0).cloneRange();
        const rect = range.getBoundingClientRect();
        return { top: rect.bottom, left: rect.left }
    }

    const getCaretPosition = (editorState) => {
        return editorState.getSelection().getAnchorOffset()
    }

    const getText = (editorState, start, end) => {
        const block = getCurrentBlock(editorState)
        const blockText = block.getText()
        return blockText.substring(start, end)
    }

    const getCurrentBlock = editorState => {
        if (editorState.getSelection) {
            const selectionState = editorState.getSelection()
            const contentState = editorState.getCurrentContent()
            const block = contentState.getBlockForKey(selectionState.getStartKey())
            return block
        }
    }
    function handleBeforeInput(chars, editorState) {
        if (chars === '@') {
            setMention(
                {
                    state: 'active',
                    people: [],
                    selectedIndex: 0,
                    offset: getCaretPosition(editorState),
                    position: getMentionPosition()
                }

            );
            return false;
        }
        if (chars === ' ') {
            setMention({ state: undefined })
        }


        return 'not-handled';
    }
    function Person(props) {

        const { person: { firstname, lastname, id }, selected } = props

        return (


            <li className={selected ? 'selected' : ''} onMouseDown={() => confirmMention(props.person)}>
                <span>{firstname} {lastname}</span>
            </li>
        )
    }
    function confirmMention(person) {
        // the current state of the editor
        const contentState = editorState.getCurrentContent()
        // create a new entity with the type mention and the person data
        const contentStateWithEntity = contentState.createEntity(
            'MENTION',
            'IMMUTABLE',
            person
        )
        // get the key of the new entity
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
        const block = getCurrentBlock(editorState)
        const blockKey = block.getKey()
        const mentionText = '@' + person.firstname
        // create a new content state with the entity added
        const contentStateWithReplacedText = Modifier.replaceText(
            contentStateWithEntity,
            new SelectionState({
                anchorKey: blockKey,
                anchorOffset: mention.offset,
                focusKey: blockKey,
                focusOffset: getCaretPosition(editorState),
                isBackward: false,
                hasFocus: true
            }),
            mentionText,
            null,
            entityKey
        )
        // create a new editor state with the new content state
        const newEditorState = EditorState.set(editorState, {
            currentContent: contentStateWithReplacedText,
            selection: new SelectionState({
                anchorKey: blockKey,
                anchorOffset: mention.offset + mentionText.length,
                focusKey: blockKey,
                focusOffset: mention.offset + mentionText.length,
                isBackward: false,
                hasFocus: true
            })
        })
        // set the new editor state
        setEditorState(newEditorState)
        setMention({ state: undefined })
        setTimeout(() => sendTextToEditor(' ', newEditorState), 50);

    }
    const People = ({ top, left, people, selectedIndex = 0, click }) =>
        <div className="chat-people" style={{ top, left }}>

            {
                people.map((person, idx) =>
                    <Person key={person.id} person={person} selected={idx === selectedIndex} />
                )
            }
        </div>

    function acceptSelectedPerson(ev) {

        if (mention.state) {
            if (mention.people && mention.people.length > mention.selectedIndex) {
                let person = mention.people[mention.selectedIndex]
                confirmMention(person)
            } else {
                setMention({ state: undefined })
            }
            ev.preventDefault()
            return true
        }
        return false
    }

    function handleTab(ev) {
        if (mention.state) {
            acceptSelectedPerson(ev)
        } else {
            return 'handled';
        }
    }
    function handleChange(editorState) {
        if (mention) {
            const caret = getCaretPosition(editorState)
            if (caret > mention.offset) {
                const mentionText = getText(editorState, mention.offset + 1, caret).toLowerCase()
                const candidates = currentUsers.filter(person => person.firstname.toLowerCase().startsWith(mentionText))
                setEditorState(editorState)
                setMention({
                    ...mention,
                    people: candidates,
                    selectedIndex: 0,
                })

            } else {
                // last change deleted the @ character, so exit mention mode
                setEditorState(editorState)
                setMention({ state: undefined })
            }
        } else {
            setEditorState(editorState)
        }
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
                    onChange={handleChange}
                    placeholder="... Message"
                    handleReturn={handleReturn}
                    keyBindingFn={mapKeyToEditorCommand}
                    customStyleMap={styleMap}
                    handleBeforeInput={handleBeforeInput}
                    onTab={handleTab}
                />
                {mention.state &&
                    <People
                        {...(mention.position)}
                        people={mention.people}
                        selectedIndex={mention.selectedIndex}
                        click={confirmMention} />}
            </div>
            <div className="main-chat-input-buttons">

                <div className='main-chat-emojis'><EmojiDrawer sendEmoji={sendTextToEditor} /></div>
                <div className='main-chat-submit'><FontAwesomeIcon icon={faPaperPlane} /></div>

            </div>
        </div>
    </>
}
export default MainChatInput
