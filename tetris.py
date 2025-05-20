import curses
import random

# Configuration
BOARD_WIDTH = 10
BOARD_HEIGHT = 20
TETROMINOS = {
    'I': [[1,1,1,1]],
    'O': [[1,1], [1,1]],
    'T': [[0,1,0],[1,1,1]],
    'S': [[0,1,1],[1,1,0]],
    'Z': [[1,1,0],[0,1,1]],
    'J': [[1,0,0],[1,1,1]],
    'L': [[0,0,1],[1,1,1]]
}

# Rotate matrix clockwise

def rotate(shape):
    return [list(row) for row in zip(*shape[::-1])]

class Tetris:
    def __init__(self, stdscr):
        self.stdscr = stdscr
        self.board = [[0]*BOARD_WIDTH for _ in range(BOARD_HEIGHT)]
        self.new_piece()
        self.score = 0
        self.level = 1

    def new_piece(self):
        self.piece = random.choice(list(TETROMINOS.values()))
        self.piece_x = BOARD_WIDTH//2 - len(self.piece[0])//2
        self.piece_y = 0

    def collision(self, offx=0, offy=0, shape=None):
        shape = shape or self.piece
        for y, row in enumerate(shape):
            for x, cell in enumerate(row):
                if not cell:
                    continue
                nx = x + self.piece_x + offx
                ny = y + self.piece_y + offy
                if nx < 0 or nx >= BOARD_WIDTH or ny < 0 or ny >= BOARD_HEIGHT:
                    return True
                if self.board[ny][nx]:
                    return True
        return False

    def freeze(self):
        for y, row in enumerate(self.piece):
            for x, cell in enumerate(row):
                if cell:
                    self.board[y+self.piece_y][x+self.piece_x] = 1
        self.clear_lines()
        self.new_piece()
        if self.collision():
            self.game_over()

    def clear_lines(self):
        new_board = []
        cleared = 0
        for row in self.board:
            if all(row):
                cleared += 1
            else:
                new_board.append(row)
        while len(new_board) < BOARD_HEIGHT:
            new_board.insert(0, [0]*BOARD_WIDTH)
        self.board = new_board
        self.score += cleared**2

    def move(self, dx):
        if not self.collision(offx=dx):
            self.piece_x += dx

    def drop(self):
        if not self.collision(offy=1):
            self.piece_y += 1
        else:
            self.freeze()

    def rotate_piece(self):
        new_shape = rotate(self.piece)
        if not self.collision(shape=new_shape):
            self.piece = new_shape

    def game_over(self):
        self.stdscr.addstr(10, BOARD_WIDTH*2+2, "GAME OVER")
        self.stdscr.refresh()
        self.stdscr.getch()
        raise SystemExit

    def draw(self):
        self.stdscr.clear()
        for y, row in enumerate(self.board):
            for x, cell in enumerate(row):
                char = '#' if cell else '.'
                self.stdscr.addstr(y, x*2, char*2)
        for y, row in enumerate(self.piece):
            for x, cell in enumerate(row):
                if cell:
                    self.stdscr.addstr(self.piece_y+y, (self.piece_x+x)*2, '##')
        self.stdscr.addstr(0, BOARD_WIDTH*2+2, f"Score: {self.score}")
        self.stdscr.refresh()

    def run(self):
        self.stdscr.nodelay(True)
        key = None
        while True:
            try:
                key = self.stdscr.getch()
            except curses.error:
                key = None
            if key == curses.KEY_LEFT:
                self.move(-1)
            elif key == curses.KEY_RIGHT:
                self.move(1)
            elif key == curses.KEY_UP:
                self.rotate_piece()
            elif key == curses.KEY_DOWN:
                self.drop()
            self.drop()
            self.draw()
            curses.napms(max(50, 500 - self.level*50))


def main(stdscr):
    curses.curs_set(0)
    game = Tetris(stdscr)
    game.run()

if __name__ == '__main__':
    curses.wrapper(main)
