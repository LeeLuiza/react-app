import React from 'react';
import styled from 'styled-components';

const PriorityButton = styled.button`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-left: 6px;
  cursor: pointer;
  background-color: ${({ priority }) => {
    if (priority === 'high') return '#F44336';
    if (priority === 'medium') return '#FFC107';
    return '#4CAF50';
  }};
  border: ${({ selected }) => (selected ? '3px solid black' : 'none')};
  position: relative;
`;

const PrioritiesContainer = styled.div`
  display: inline-block;
`;

export const PrioritySelector = ({ selectedPriority, onPriorityChange, isSaved }) => {
  const priorities = ['low', 'medium', 'high'];

  return (
    <PrioritiesContainer>
      {isSaved ? (
        <PriorityButton
          priority={selectedPriority}
          selected={true}
        />
      ) : (
        priorities.map(priority => (
          <PriorityButton
            key={priority}
            priority={priority}
            onClick={() => onPriorityChange(priority)}
            selected={selectedPriority === priority}
          />
        ))
      )}
    </PrioritiesContainer>
  );
};