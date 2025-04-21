export class TodoService {
  async getTodos() {
    return HttpService.get('todos')
  }

  async getTotoDetail(todoId: number) {
    return HttpService.get('todos/' + todoId)
  }
}
