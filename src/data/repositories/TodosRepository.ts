import { Connection, Repository } from 'typeorm';
import { TodoModel } from '../entities/TodoModel';

interface ICreateTodoData {
  text: string;
}

export class TodosRepository {
  private ormRepository: Repository<TodoModel>;

  constructor(connection: Connection) {
    this.ormRepository = connection.getRepository(TodoModel);
  }

  public async getAll(): Promise<TodoModel[]> {
    const todos = await this.ormRepository.find();

    return todos;
  }

  public async create({ text }: ICreateTodoData): Promise<TodoModel> {
    const todo = this.ormRepository.create({
      text,
      is_toggled: false,
    });

    await this.ormRepository.save(todo);

    return todo;
  }

  public async toggle(id: number): Promise<void> {
    const oldTodo = await this.ormRepository.findOne(id)
    
    const newTodo = {
      ...oldTodo,
      is_toggled: !oldTodo?.is_toggled
    } as TodoModel

    await this.ormRepository.save(newTodo)
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
