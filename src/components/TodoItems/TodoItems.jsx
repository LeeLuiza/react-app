import React, {useState} from 'react';
import {TodoItemsContainer} from './TodoItemsContainer';
import {NewTodoItem} from '../TodoItem/NewTodoItem';
import {TodoItem} from '../TodoItem/TodoItem';
import {useData} from '../../data/hooks/useData';
import {SearchInput} from './components/SearchInput';

export const TodoItems = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isAscending, setIsAscending] = useState(true);

  const {data: todoItems, isLoading} = useData();

  if (!todoItems || isLoading) {
    return (
      <TodoItemsContainer>
        Загрузка данных...
      </TodoItemsContainer>
    );
  }

  const clearedSearchValue = searchValue.trim().toLowerCase();

  const filteredBySearchItems = todoItems.filter((todoItem) => {
    if (clearedSearchValue.length < 3) {
      return true;
    }
    const clearedTodoItemTitle = todoItem.title.trim().toLowerCase();
    const isSearched = clearedTodoItemTitle.indexOf(clearedSearchValue) !== -1;
    return isSearched;
  });

  const sortedTodoItems = filteredBySearchItems.sort((a, b) => {
    const priorityOrder = ['high', 'medium', 'low'];
    const comparison = priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority);
    return isAscending ? comparison : -comparison;
  });

  const todoItemsElements = sortedTodoItems.map((item) => {
    return <TodoItem key={item.id} title={item.title} checked={item.isDone} id={item.id} priority={item.priority} />;
  });

  const toggleSortOrder = () => {
    setIsAscending(!isAscending);
  };

  return (
    <TodoItemsContainer>
      <SearchInput value={searchValue} setValue={setSearchValue} />
      {todoItemsElements}
      <NewTodoItem />
      <button onClick={toggleSortOrder}>
        Сортировать по приоритету: {isAscending ? 'По возрастанию' : 'По убыванию'}
      </button>
    </TodoItemsContainer>
  );
}