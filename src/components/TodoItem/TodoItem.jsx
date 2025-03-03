import React from 'react';
import styled, { css } from "styled-components"
import {TodoItemContainer} from './TodoItemContainer'
import {TodoItemCheckbox} from './TodoItemCheckbox';
import { useDeleteTodoItem  } from '../../data/hooks/useData';
import { useToggleTodoItem  } from '../../data/hooks/useData';
import { PrioritySelector } from './PrioritySelector';

const checkedCss = css`
  color: #B5B5BA;
  text-decoration: line-through;
`

const Title = styled.span(props => {
  return `
    font-size: 15px;
    ${props.checked ? checkedCss : ''};
    white-space: pre-wrap;
  `;
})

const Delete = styled.span`
  display: inline-block;
  width: 13px;
  height: 13px;
  background-image: url(assets/images/png/delete.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 13px;
  cursor: pointer;
`;

export const TodoItem = ({key, title, checked, id, priority}) => {
  const { mutate: deleteItem } = useDeleteTodoItem();
  const { mutate: toggleItem } = useToggleTodoItem();

  const handleDelete = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Вы уверены, что хотите удалить этот элемент?')) {
      deleteItem(id);
    }
  }

  const handleToggle = () => {
    toggleItem({ id, checked: !checked, priority: priority });
  };

  return (
    <TodoItemContainer>
      <TodoItemCheckbox checked={checked} onClick={handleToggle}/>
      <Title checked={checked}>
        {title}
      </Title>
      <PrioritySelector selectedPriority={priority} isSaved={true}/>
      <Delete onClick={handleDelete} />
    </TodoItemContainer>
  )
}
