import { connect } from 'react-redux';
import {
  Favorites,
  IFavoritesActions,
  IFavoritesState
} from '@screens/NeedsDashboard/Favorites/containers/FavoritesPage';
import {
  fetchFavoriteBuildingsRoutine,
  setPageRoutine,
  toggleFavoriteBuildingRoutine
} from '@screens/HavesDashboard/Favorites/routines';
import {
  extractBuildings,
  extractCurrentPage,
  extractFetchFavoriteBuildingsLoading,
  extractPageSize,
  extractTotalPages
} from '@screens/HavesDashboard/Favorites/reducers';

const mapStateToProps: IFavoritesState = state => ({
  page: extractCurrentPage(state),
  pageSize: extractPageSize(state),
  totalPages: extractTotalPages(state),
  buildingsLoading: extractFetchFavoriteBuildingsLoading(state),
  buildings: extractBuildings(state)
});

const mapDispatchToProps: IFavoritesActions = {
  setPage: setPageRoutine.fulfill,
  toggleFavorite: toggleFavoriteBuildingRoutine,
  loadBuildings: fetchFavoriteBuildingsRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
