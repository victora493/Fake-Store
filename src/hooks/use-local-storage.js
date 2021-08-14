export const saveState = async (state, stateName) => {
    try {
        const serializedState = await JSON.stringify(state);
        localStorage.setItem(stateName, serializedState);
    } catch (err) {
        console.error(err)
    }
};
  
export const loadState = async (stateName) => {
    try {
        const serializedState = localStorage.getItem(stateName);
        if (!serializedState) {
            return undefined;
        }
        const state = await JSON.parse(serializedState);
        return state;
    } catch {
        return undefined;
    }
};

export default function useLocalStorage() {
    
    return { saveState, loadState }
}
