const chess = require('js-chess-engine');
const chessCardTemplate = require('./chessCardTemplate');

// FEN (Forsyth-Edwards Notation) for the opening board
const startPosition = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

function renderBoard(board) {
    let textBoard = '';

    '87654321'.split('').forEach(rank => {
        let textRank = rank + ' ';
        'ABCDEFGH'.split('').forEach((file, column) => {
            let square = '';
            if (parseInt(rank) & 1) square = (column & 1) ? '.' : '■'
            else square = (column & 1) ? '■' : '.'
            square = '|' + (board.pieces[file + rank] || square);
            textRank += square;
        });
        textRank += '|  \n\n';
        textBoard += textRank;
    });
    textBoard += '...a b c d e f g h';
    return textBoard;
}

exports.start = function () {
    let card = chessCardTemplate.template;
    card.body[0].columns[0].items[0].text = renderBoard(chess.status(startPosition));
    card.body[4].value = startPosition;
    return card;
}