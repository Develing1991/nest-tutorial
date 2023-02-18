import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v4 as uuidV4 } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards;
  }

  createBoard(createBoardDto: CreateBoardDto) {
    const { title, description } = createBoardDto;
    const board: Board = {
      id: uuidV4(),
      title,
      description,
      status: BoardStatus.PUBLIC,
    };
    this.boards.push(board);
    return board;
  }

  getBoardById(id: string): Board {
    const foundBoard = this.boards.find((board) => board.id === id);
    if (!foundBoard) {
      throw new NotFoundException(`해당 게시물이 없습니다.`);
    }
    return foundBoard;
  }

  deleteBoard(id: string): void {
    const foundBoard = this.getBoardById(id);
    this.boards = this.boards.filter((board) => board.id !== foundBoard.id);
  }

  updateBoardStatus(id: string, status: BoardStatus): Board {
    const board = this.getBoardById(id);
    board.status = status;
    return board;
  }
}
