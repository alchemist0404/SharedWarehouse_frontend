import { IResultBuildingItem } from '@screens/BrowseSpaces/model/ResultItem';

export interface IBuildingSearchResult {
  totalPages: number;
  totalResults: number;
  items: IResultBuildingItem[];
}
