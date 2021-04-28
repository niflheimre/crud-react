const candidateReducer = (state = [], action) => {
    
    switch (action.type) {
      case "CREATE":
        return state.concat([action.data]);
      case "DELETE":
        return state.filter((item) => !action.idArr.includes(item.id));
        case "CLEAR":
            return [];
      case "EDIT":
        return state.map((item) =>
          item.id === action.id ? { ...item, editing: !item.editing } : item
        );
      case "UPDATE":
        return state.map((item) => {
          if (item.id === action.data.id) {
            return action.data;
          } else return item;
        });
      default:
        return state;
    }
}

export default candidateReducer;