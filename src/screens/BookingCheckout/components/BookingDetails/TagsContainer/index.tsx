import React from 'react';
import s from '@screens/BookingCheckout/containers/BookingCheckoutPage/BookingDetailsCheckoutStep/styles.module.scss';
import { Icon, Popup } from 'semantic-ui-react';
import { ReactComponent as DockingLift } from '@images/svg/tags/docking-lift.svg';
import { ReactComponent as DockingPlatform } from '@images/svg/tags/docking-platform.svg';
import { ReactComponent as FreeCoffee } from '@images/svg/tags/free-coffee.svg';
import { ReactComponent as Freezing } from '@images/svg/tags/freezing.svg';
import { ReactComponent as Ventilation } from '@images/svg/tags/ventillation.svg';
import { ReactComponent as GreetingDance } from '@images/svg/tags/greeting-dance.svg';
import { ReactComponent as VideoSurveillance } from '@images/svg/tags/video-surveillance.svg';
import { ReactComponent as DefaultTag } from '@images/svg/tags/default-tag.svg';
import { Tags } from '@screens/BookingCheckout/model/Tags';

const selectTagIcon = (tagName: string) => {
  switch (tagName) {
    case Tags.DOCKING_LIFT:
      return DockingLift;
    case Tags.DOCKING_PLATFORM:
      return DockingPlatform;
    case Tags.VIDEO_SURVEILLANCE:
      return VideoSurveillance;
    case Tags.VENTILATION:
      return Ventilation;
    case Tags.FREEZING:
      return Freezing;
    case Tags.FREE_COFFEE:
      return FreeCoffee;
    case Tags.GREETING_DANCE:
      return GreetingDance;
    default:
      return DefaultTag;
  }
};

export interface ITagsContainerProps {
  tags: string[];
}

const TagsContainer: React.FC<ITagsContainerProps> = ({ tags }) => (
  <div className={s.details__features_container}>
    {tags.map(tag => (
      <Popup
        key={tag}
        content={tag}
        trigger={<Icon className={s.tagItem} size="large" as={selectTagIcon(tag)} />}
      />
    ))}
  </div>
);

export default TagsContainer;
