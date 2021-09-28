import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  createBuildingRoutine,
  fetchAllTagsRoutine,
  fetchBuildingsRoutine,
  setPageRoutine,
  toggleFavoriteBuildingRoutine
} from '@screens/HavesDashboard/Buildings/routines';
import common from '@screens/NeedsDashboard/styles/common.module.scss';
import {
  extractBuildings,
  extractCreateBuildingLoading,
  extractFetchAllTagsLoading,
  extractFetchBuildingsLoading,
  extractPage,
  extractPageSize,
  extractTags,
  extractTotalPages
} from '@screens/HavesDashboard/Buildings/reducers';
import { IBindingAction, IBindingCallback1 } from '@models/Callbacks';
import { IPageRequest } from '@screens/NeedsDashboard/BookedSpaces/model/PageableRequest';
import { IResultBuildingItem } from '@screens/BrowseSpaces/model/ResultItem';
import { IPageable } from '@models/domain/PageableReducerState';
import ResultGridWithPagination from '@components/ResultGridWithPagination';
import styles from './styles.module.scss';
import AddButtonWithModal from '@screens/HavesDashboard/Buildings/components/AddButtonWithModal';
import { IBuildingForSave } from '@screens/BuildingEditor/model/BuildingForSave';
import { extractCurrentUser } from '@screens/Authorization/reducers';
import { ICurrentUser } from '@screens/Authorization/models/CurrentUser';
import { Link } from 'react-router-dom';
import { HAVES_DASHBOARD_ENDPOINTS } from '@screens/HavesDashboard/Root/components/Routing/endpoints';
import { IAccountLocationState } from '@screens/NeedsDashboard/Account/containers/AccountPage';
import { ENDPOINTS } from '@containers/Routing/endpoints';

export interface IBuildingsProps extends IPageable {
  currentUser?: ICurrentUser;
  loadBuildings: IBindingCallback1<IPageRequest>;
  buildings: IResultBuildingItem[];
  buildingsLoading: boolean;
  toggleFavorite: IBindingCallback1<string>;
  setPage: IBindingCallback1<number>;
  loadTags: IBindingAction;
  tagsLoading: boolean;
  createBuilding: IBindingCallback1<IBuildingForSave>;
  creationLoading: boolean;
  tags: string[];
}

const Buildings: React.FC<IBuildingsProps> = (
  {
    loadBuildings, buildings, buildingsLoading, toggleFavorite, page, setPage, pageSize, totalPages,
    loadTags, tagsLoading, createBuilding, creationLoading, tags, currentUser
  }
) => {
  const managementAllowed = !!currentUser?.companyName;

  useEffect(() => {
    if (managementAllowed && loadBuildings) {
      loadBuildings({ page, size: pageSize });
    }
  }, [managementAllowed, loadBuildings, page, pageSize]);

  return (
    <div className={common.container}>
      <div className={styles.subtitle_section}>
        <h1>Buildings</h1>
        <div className={styles.filler} />
        {managementAllowed && (
          <AddButtonWithModal
            tags={tags}
            loadTags={loadTags}
            tagsLoading={tagsLoading}
            creationLoading={creationLoading}
            createBuilding={createBuilding}
          />
        )}
      </div>
      <h2 className={styles.tab_button}><Link to={ENDPOINTS.LIST_YOUR_SPACE}>Before you list your space...</Link></h2>
      {managementAllowed
        ? (
          <div>
            <h2>My shared buildings</h2>
            <ResultGridWithPagination
              setPage={setPage}
              loading={buildingsLoading}
              items={buildings}
              page={page}
              toggleFavorite={toggleFavorite}
              totalPages={totalPages}
            />
          </div>
        )
        : (
          <div className={styles.bannerWrapper}>
            <div className={styles.banner}>
              The company name is required in order to access this page.
              <br />
              <br />
              <Link
                to={{
                  pathname: HAVES_DASHBOARD_ENDPOINTS.ACCOUNT,
                  state: {
                    autoFocusInputName: 'companyName'
                  } as IAccountLocationState
                }}
              >
                Update profile
              </Link>
            </div>
          </div>
        )}
    </div>
  );
};

const mapStateToProps = state => ({
  currentUser: extractCurrentUser(state),
  buildings: extractBuildings(state),
  buildingsLoading: extractFetchBuildingsLoading(state),
  page: extractPage(state),
  pageSize: extractPageSize(state),
  totalPages: extractTotalPages(state),
  tagsLoading: extractFetchAllTagsLoading(state),
  creationLoading: extractCreateBuildingLoading(state),
  tags: extractTags(state)
});

const mapDispatchToProps = {
  loadBuildings: fetchBuildingsRoutine,
  toggleFavorite: toggleFavoriteBuildingRoutine,
  setPage: setPageRoutine.fulfill,
  loadTags: fetchAllTagsRoutine,
  createBuilding: createBuildingRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Buildings);
