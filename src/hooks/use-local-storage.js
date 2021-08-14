export const saveState = (state, stateName) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(stateName, serializedState);
    } catch (err) {
        console.error(err)
    }
};
  
export const loadState = (stateName) => {
    try {
        const serializedState = localStorage.getItem(stateName);
        if (!serializedState) {
            return undefined;
        }
        const state = JSON.parse(serializedState);
        return state;
    } catch {
        return undefined;
    }
};

export default function useLocalStorage() {
    
    return { saveState, loadState }
}
