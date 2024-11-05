import { useDispatch, useSelector } from 'react-redux';
import css from './SearchBox.module.css';
import { selectNameFilter } from '../../redux/filters/selectors';
import { changeFilter } from '../../redux/filters/slice';

function SearchBox() {
  const dispatch = useDispatch();
  const filter = useSelector(selectNameFilter);

  const handleChange = (e) => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <div className={css.container}>
      <p className={css.label}>Find contacts by name</p>

      <input className={css.search} type="text" value={filter} onChange={handleChange} />
    </div>
  );
}

export default SearchBox;
