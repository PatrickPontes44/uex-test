function useLocalStorage() {
  function getValue(key){
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : undefined;
    } catch (error) {
      console.error(`Error getting localStorage key “${key}”:`, error);
      return undefined;
    }
  };

  const setValue = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Não foi possível setar os dados para a chave ${key}:`, error);
    }
  };

  const removeValue = (key) => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
      console.error(`Não foi possível remover a chave ${key}:`, error);
    }
  };

  return {getValue, setValue, removeValue};
}

export default useLocalStorage;
