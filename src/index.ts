import { ITask, ITaskService, TCreateTaskData, TUpdateTaskData } from "./interfaces";

class TaskService implements ITaskService{
private id: number = 1;
private taskList: ITask[] = [];

getTasks(): ITask[] {
    return this.taskList
}

create(data: TCreateTaskData): ITask {
const now = new Date();

    const newTask: ITask = {
        ...data,
        id: this.id,
        done: false,
        createdAt: now
    }

    this.taskList.push(newTask);
    this.id++;

    return newTask;
}

update(id: number, data: TUpdateTaskData): ITask | string {
    const currentTask = this.taskList.find((task) => task.id === id);

    if(currentTask){
        const index = this.taskList.findIndex((task) => task.id === id);
        const now = new Date();

        const updateTask = { ...currentTask, ...data, updatedAt: now };

        this.taskList.splice(index, 1, updateTask)

        return updateTask;
    } else {
        return "Tarefa não encontrada.";
    }
}

delete(id: number): string {
    const currentTask = this.taskList.find((task) => task.id === id);

    if(currentTask){
        const index = this.taskList.findIndex((task) => task.id === id);

        this.taskList.splice(index, 1)
        return "tarefa  excluida com sucesso."
    } else {
        return "Tarefa não encontrada."
    }
}
}

const taskSevice = new TaskService();

console.log("--CRIANDO NOTA 1--");
console.log(taskSevice.create({title: "Ola sou João", content: "BELEZA"}));
console.log("--CRIANDO NOTA 2--");
console.log(taskSevice.create({title: "Ola sou Maria", content: "Olá"}));
console.log(taskSevice.getTasks());
console.log(taskSevice.update(1, {done:true}));
