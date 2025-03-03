const TODO_ITEMS_LOCAL_STORAGE_KEY = 'TODO_ITEMS_LOCAL_STORAGE_KEY';

export const LocalStorage = {
  getTodoItemsFromLocalStorage: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const rawData = localStorage.getItem(TODO_ITEMS_LOCAL_STORAGE_KEY);
        const defaultResult = [];
        
        if (!rawData) {
          resolve(defaultResult);
          return;
        }
        const data = JSON.parse(rawData);
    
        if (!Array.isArray(data)) {
          resolve(defaultResult);
          return;
        }
    
        resolve(data);
      }, 500);
    })
  },

  saveTodoItemToLocalStorage: (todoItem) => {
    return new Promise((resolve, reject) => {
      LocalStorage.getTodoItemsFromLocalStorage().then((todoItems) => {
        const newTodoItems = [...todoItems, todoItem];
        localStorage.setItem(TODO_ITEMS_LOCAL_STORAGE_KEY, JSON.stringify(newTodoItems));
        resolve();
      })
    });
  },

  deleteTodoItemFromLocalStorage: (id) => {
    return new Promise((resolve, reject) => {
      LocalStorage.getTodoItemsFromLocalStorage().then((todoItems) => {
        const filteredTodoItems = todoItems.filter(item => item.id !== id);
        localStorage.setItem(TODO_ITEMS_LOCAL_STORAGE_KEY, JSON.stringify(filteredTodoItems));
        resolve();
      });
    });
  },

  toggleTodoItemInLocalStorage: (id, checked) => {
    return new Promise((resolve, reject) => {
        LocalStorage.getTodoItemsFromLocalStorage().then((todoItems) => {
            const updatedTodoItems = todoItems.map(item => {
              if(item.id === id) {
                return {...item, isDone: checked}
              }
              return item;
           });
            localStorage.setItem(TODO_ITEMS_LOCAL_STORAGE_KEY, JSON.stringify(updatedTodoItems));
            resolve();
        });
    });
  }
}