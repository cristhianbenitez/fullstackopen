import { connect } from 'react-redux';
import { setFilter } from '../reducers/filterReducer';

const Filter = (props) => {
  const handleChange = (e) => {
    props.setFilter(e.target.value);
  };

  const style = {
    marginBottom: 10
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} value={props.filterInput} />
    </div>
  );
};

const mapStateToProps = (state) => ({ filterInput: state.filterInput });

const connectedFilter = connect(mapStateToProps, { setFilter })(Filter);
export default connectedFilter;
