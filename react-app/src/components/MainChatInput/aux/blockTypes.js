const toggleInlineStyle = true;
export const BLOCK_TYPES = [
    { label: 'B', style: 'BOLD', type: toggleInlineStyle },
    { label: 'I', style: 'ITALIC', type: toggleInlineStyle },
    { label: 'U', style: 'UNDERLINE', type: toggleInlineStyle },
    { label: 'UL', style: 'unordered-list-item' },
    { label: 'OL', style: 'ordered-list-item' },
    { label: 'Code', style: 'CODE', type: toggleInlineStyle }
];

export const styleMap = {
    'CODE': {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        color: 'white',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        lineHeight: '1.35',
    },


};
