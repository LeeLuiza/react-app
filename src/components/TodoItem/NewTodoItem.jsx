import React, {useState, useRef, useEffect} from 'react';
import {TodoItemContainer} from './TodoItemContainer';
import {TodoItemCheckbox} from './TodoItemCheckbox';
import styled from 'styled-components';
import {useSaveNewTodoItem} from '../../data/hooks/useData';
import { PrioritySelector } from './PrioritySelector';


const Input = styled.textarea`
  flex-grow: 1;

  &::placeholder {
    font-size: 15px;
    color: rgba(63,63,63,0.6);
  }
`
export const NewTodoItem = () => {
  const {mutate, isPending, isSuccess} = useSaveNewTodoItem();
  const [value, setValue] = useState('');
  const inputRef = useRef();
  const [priority, setPriority] = useState('medium');

  useEffect(() => {
    if (!isPending && isSuccess) {
      setValue('');
    }
  }, [isPending, isSuccess]);

  const onInputChange = (event) => {
    const newValue = event.nativeEvent.target.value;
    const clearedValue = newValue.replace(/\d/, '');
    setValue(clearedValue);
  }

  const onInputKeyPressed = (event) => {
    if (event.key !== 'Enter') {
      return;
    }
 
    if (value === '') {
      alert('Значение поля не должно быть пустым');
      return;
    }

    mutate({title: value, priority});
  }

  return (
    <TodoItemContainer>
      <TodoItemCheckbox disabled={true} />
      <Input 
        ref={inputRef}
        value={value}
        onChange={onInputChange}
        onKeyDown={onInputKeyPressed}
        placeholder='Write a task...'
        disabled={isPending}
      />
      <PrioritySelector selectedPriority={priority} onPriorityChange={setPriority} isSaved={false}/> 
    </TodoItemContainer>
  )
}