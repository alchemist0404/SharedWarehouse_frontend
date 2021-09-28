import React from 'react';
import { IScheduleSpaceNoteDto } from '@screens/NeedsDashboard/DropOffAndPickUp/model/ScheduleSpaceNoteDto';
import { t2aToSpaceWithAvailability } from '@screens/NeedsDashboard/DropOffAndPickUp/model/BookingDetailsDto';
import { Card, CardContent } from 'semantic-ui-react';
import SpaceItemHeader from '@screens/BuildingDetails/components/SpaceItem/SpaceItemHeader';
import { ISpaceTemplateDto } from '@screens/BookingCheckout/model/PaymentRequirementResponse';
import SpacePickUpRow from '@screens/NeedsDashboard/DropOffAndPickUp/components/SpacePickUpBlock/SpacePickUpRow';
import { IBindingCallback1 } from '@models/Callbacks';
import { IScheduleSpaceRequest } from '@screens/NeedsDashboard/DropOffAndPickUp/model/Schedule';
import styles from './styles.module.scss';

export interface ISpacePickUpBlock {
  filledSpaces: IScheduleSpaceNoteDto[];
  spaceTemplates: ISpaceTemplateDto[];
  handleUpdate: IBindingCallback1<IScheduleSpaceRequest>;
  handleDelete: IBindingCallback1<string>;
  initialRequests: IScheduleSpaceRequest[];
}

interface ISpaceTemplateWithFilledSpaces {
  spaceTemplate: ISpaceTemplateDto;
  spaces: IScheduleSpaceNoteDto[];
}

const SpacePickUpBlock: React.FC<ISpacePickUpBlock> = (
  { filledSpaces, spaceTemplates, handleUpdate, handleDelete, initialRequests }
) => {
  const filledTemplatesIds = [...new Set(filledSpaces.map(s => s.spaceTemplateId))];
  const filledTemplates: ISpaceTemplateDto[] = spaceTemplates
    .filter(t => filledTemplatesIds.includes(t.id));
  const templatesWithSpaces: ISpaceTemplateWithFilledSpaces[] = filledTemplates
    .map(spaceTemplate => ({
      spaceTemplate,
      spaces: filledSpaces.filter(s => s.spaceTemplateId === spaceTemplate.id)
    }));

  return (
    <div>
      {templatesWithSpaces.map(template => (
        <Card className={styles.card} key={template.spaceTemplate.id} fluid>
          <CardContent>
            <SpaceItemHeader
              space={t2aToSpaceWithAvailability({
                spaceTemplate: template.spaceTemplate,
                spaceIds: template.spaces.map(space => space.id)
              })}
            />
          </CardContent>
          <CardContent>
            {template.spaces.map(space => (
              <SpacePickUpRow
                key={space.id}
                space={space}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
                initialRequest={initialRequests.find(r => r.spaceId === space.id)}
              />
            ))}
          </CardContent>
        </Card>
      ))}
      {!templatesWithSpaces.length && (
        <div className={styles.banner}>
          All spaces are empty
        </div>
      )}
    </div>
  );
};

export default SpacePickUpBlock;
