import {LocalStorage} from '../services/LocalStorage';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {TodoItem} from '../entity/TodoItem'

export const useData = () => {
  const {data, isLoading} = useQuery({
    queryKey: ['todo'],
    queryFn: LocalStorage.getTodoItemsFromLocalStorage,
  });

  return {
    data,
    isLoading,
  };
}

export const useSaveNewTodoItem = () => {
  const client = useQueryClient();

  const {mutate, isPending, isSuccess} = useMutation({
    mutationFn: ({title, priority}) => {
      const newTodoItem = new TodoItem(new Date().getTime(), title, false, priority);
      return LocalStorage.saveTodoItemToLocalStorage(newTodoItem)
    },
    onSuccess: () => {
      client.invalidateQueries(['todo']);
    },
  });

  return {
    mutate,
    isPending,
    isSuccess
  }
}

export const useDeleteTodoItem = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (id) => {
      return LocalStorage.deleteTodoItemFromLocalStorage(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['todo']);
    },
  });

  return { mutate, isPending, isSuccess };
}

export const useToggleTodoItem = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: ({ id, checked, priority }) => {
      return LocalStorage.toggleTodoItemInLocalStorage(id, checked, priority);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['todo']);
    },
  });

  return { mutate, isPending, isSuccess };
};