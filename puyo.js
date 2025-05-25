const canvas = document.getElementById('puyo');
const ctx = canvas.getContext('2d');
ctx.scale(20, 20);

const COLS = 6;
const ROWS = 12;
const COLORS = ['#f00', '#0f0', '#00f', '#ff0'];

function createBoard() {
    const board = [];
    for (let y = 0; y < ROWS; y++) {
        board.push(new Array(COLS).fill(0));
    }
    return board;
}

const board = createBoard();
let piece = null;
let dropCounter = 0;
let dropInterval = 500;
let lastTime = 0;

function newPiece() {
    const c1 = COLORS[(Math.random() * COLORS.length) | 0];
    const c2 = COLORS[(Math.random() * COLORS.length) | 0];
    return { x: COLS / 2 - 1, y: 0, dir: 0, cells: [c1, c2] };
}

function rotatePiece() {
    piece.dir = (piece.dir + 1) % 4;
}

function cellPositions(p) {
    const positions = [];
    if (p.dir % 2 === 0) {
        // vertical
        positions.push({ x: p.x, y: p.y });
        positions.push({ x: p.x, y: p.y + (p.dir === 0 ? 1 : -1) });
    } else {
        // horizontal
        positions.push({ x: p.x, y: p.y });
        positions.push({ x: p.x + (p.dir === 1 ? 1 : -1), y: p.y });
    }
    return positions;
}

function collide(p) {
    for (const { x, y } of cellPositions(p)) {
        if (x < 0 || x >= COLS || y >= ROWS) return true;
        if (y >= 0 && board[y][x]) return true;
    }
    return false;
}

function merge(p) {
    const pos = cellPositions(p);
    pos.forEach(({ x, y }, i) => {
        if (y >= 0) {
            board[y][x] = p.cells[i];
        }
    });
}

function clearBoard() {
    let cleared = false;
    const visited = Array.from({ length: ROWS }, () => Array(COLS).fill(false));

    function flood(x, y, color, group) {
        if (x < 0 || x >= COLS || y < 0 || y >= ROWS) return;
        if (visited[y][x] || board[y][x] !== color) return;
        visited[y][x] = true;
        group.push({ x, y });
        flood(x + 1, y, color, group);
        flood(x - 1, y, color, group);
        flood(x, y + 1, color, group);
        flood(x, y - 1, color, group);
    }

    for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
            const color = board[y][x];
            if (!color || visited[y][x]) continue;
            const group = [];
            flood(x, y, color, group);
            if (group.length >= 4) {
                cleared = true;
                group.forEach(({ x, y }) => board[y][x] = 0);
            }
        }
    }

    if (cleared) {
        for (let x = 0; x < COLS; x++) {
            for (let y = ROWS - 1; y >= 0; y--) {
                if (!board[y][x]) {
                    for (let yy = y - 1; yy >= 0; yy--) {
                        if (board[yy][x]) {
                            board[y][x] = board[yy][x];
                            board[yy][x] = 0;
                            break;
                        }
                    }
                }
            }
        }
    }
}

function playerDrop() {
    piece.y++;
    if (collide(piece)) {
        piece.y--;
        merge(piece);
        clearBoard();
        piece = newPiece();
        if (collide(piece)) {
            board.forEach(row => row.fill(0));
        }
    }
    dropCounter = 0;
}

function playerMove(dir) {
    const p = { ...piece, x: piece.x + dir };
    if (!collide(p)) {
        piece.x += dir;
    }
}

function update(time = 0) {
    const delta = time - lastTime;
    lastTime = time;
    dropCounter += delta;
    if (dropCounter > dropInterval) {
        playerDrop();
    }
    draw();
    requestAnimationFrame(update);
}

function drawCell(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 1, 1);
}

function draw() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
            const c = board[y][x];
            if (c) drawCell(x, y, c);
        }
    }
    cellPositions(piece).forEach(({ x, y }, i) => {
        if (y >= 0) drawCell(x, y, piece.cells[i]);
    });
}

document.addEventListener('keydown', e => {
    if (e.keyCode === 37) playerMove(-1);
    else if (e.keyCode === 39) playerMove(1);
    else if (e.keyCode === 40) playerDrop();
    else if (e.keyCode === 38) rotatePiece();
});

piece = newPiece();
update();
