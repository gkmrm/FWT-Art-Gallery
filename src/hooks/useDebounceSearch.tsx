import _ from 'lodash';

const useDebounceSearch = (func: (str: string) => void, delay: number) => {
  const debounceSearch = _.debounce(func, delay);

  return debounceSearch;
};

export default useDebounceSearch;
