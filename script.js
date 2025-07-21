document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const status = document.getElementById('status');
    let selectedPiece = null;
    let currentPlayer = 'white';
    let boardState = createInitialBoard();

    function createInitialBoard() {
        const board = Array(8).fill().map(() => Array(8).fill(null));
        
        // Расстановка черных шашек
        for (let row = 0; row < 3; row++) {
            for (let col = (row + 1) % 2; col < 8; col += 2) {
                board[row][col] = { color: 'black', isKing: false };
            }
        }
        
        // Расстановка белых шашек
        for (let row = 5; row < 8; row++) {
            for (let col = (row + 1) % 2; col < 8; col += 2) {
                board[row][col] = { color: 'white', isKing: false };
            }
        }
        
        return board;
    }

    function renderBoard() {
        board.innerHTML = '';
        
        for (let row = 0; row < 8; row++) {
            const rowElement = document.createElement('div');
            rowElement.className = 'row';
            
            for (let col = 0; col < 8; col++) {
                const cell = document.createElement('div');
                cell.className = `cell ${(row + col) % 2 === 0 ? 'light' : 'dark'}`;
                cell.dataset.row = row;
                cell.dataset.col = col;
                
                if (boardState[row][col]) {
                    const piece = document.createElement('div');
                    piece.className = `piece ${boardState[row][col].color}`;
                    if (boardState[row][col].isKing) {
                        piece.classList.add('king');
                    }
                    if (selectedPiece && selectedPiece.row === row && selectedPiece.col === col) {
                        piece.classList.add('highlight');
                    }
                    piece.addEventListener('click', () => handlePieceClick(row, col));
                    cell.appendChild(piece);
                } else {
                    cell.addEventListener('click', () => handleCellClick(row, col));
                }
                
                rowElement.appendChild(cell);
            }
            
            board.appendChild(rowElement);
        }
        
        status.textContent = `Ход: ${currentPlayer === 'white' ? 'белые' : 'черные'}`;
    }

    function handlePieceClick(row, col) {
        if (boardState[row][col].color !== currentPlayer) return;
        
        selectedPiece = { row, col };
        renderBoard();
    }

    function handleCellClick(row, col) {
        if (!selectedPiece) return;
        
        const fromRow = selectedPiece.row;
        const fromCol = selectedPiece.col;
        const piece = boardState[fromRow][fromCol];
        
        if (isValidMove(fromRow, fromCol, row, col)) {
            // Выполняем ход
            boardState[row][col] = {...piece};
            boardState[fromRow][fromCol] = null;
            
            // Проверка на превращение в дамку
            if ((piece.color === 'white' && row === 0) || (piece.color === 'black' && row === 7)) {
                boardState[row][col].isKing = true;
            }
            
            // Проверка на взятие шашки
            const rowDiff = row - fromRow;
            const colDiff = col - fromCol;
            
            if (Math.abs(rowDiff) === 2) {
                const jumpedRow = fromRow + rowDiff / 2;
                const jumpedCol = fromCol + colDiff / 2;
                boardState[jumpedRow][jumpedCol] = null;
            }
            
            // Смена хода
            currentPlayer = currentPlayer === 'white' ? 'black' : 'white';
            selectedPiece = null;
            renderBoard();
        }
    }

    function isValidMove(fromRow, fromCol, toRow, toCol) {
        const piece = boardState[fromRow][fromCol];
        if (!piece) return false;
        
        const rowDiff = toRow - fromRow;
        const colDiff = toCol - fromCol;
        
        // Проверка направления движения для обычных шашек
        if (!piece.isKing) {
            if (piece.color === 'white' && rowDiff > 0) return false;
            if (piece.color === 'black' && rowDiff < 0) return false;
        }
        
        // Проверка диагонального движения
        if (Math.abs(rowDiff) !== Math.abs(colDiff)) return false;
        
        // Проверка длины хода
        if (Math.abs(rowDiff) > 2) return false;
        
        // Проверка на занятость целевой клетки
        if (boardState[toRow][toCol]) return false;
        
        // Проверка на взятие шашки
        if (Math.abs(rowDiff) === 2) {
            const jumpedRow = fromRow + rowDiff / 2;
            const jumpedCol = fromCol + colDiff / 2;
            const jumpedPiece = boardState[jumpedRow][jumpedCol];
            
            if (!jumpedPiece || jumpedPiece.color === piece.color) return false;
        }
        
        return true;
    }

    renderBoard();
});
