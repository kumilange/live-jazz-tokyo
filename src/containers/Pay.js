import { connect } from 'react-redux';
import Pay from '../components/Pay';

const mapStateToProps = state => ({
  event: state.eventDetails,
});

const mapDispatchToProps = () => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Pay);
