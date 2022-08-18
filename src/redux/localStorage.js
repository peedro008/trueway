const KEY = "redux";
export function loadState() {
  try {
    const serializedState = localStorage.getItem(KEY);
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
}

export async function saveState(state) {
  try {
    const serializedState = JSON.stringify(state.UserRole, state.UserName, state.UserId, state.user);
    localStorage.setItem(KEY, serializedState);
  } catch (e) {
    // Ignore
  }
}
