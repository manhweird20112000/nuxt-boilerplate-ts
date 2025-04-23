export class TodoService {
  getTodos() {
    return HttpService.get('todos')
  }

  getTotoDetail(todoId: number) {
    return HttpService.get('todos/' + todoId)
  }
}
