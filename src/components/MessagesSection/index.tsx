import React from 'react';
import { IInformationSectionProps, InformationSection } from '@components/InformationSection';
import MessagesSectionWrapper from '@components/MessagesSection/SectionWrapper';
import { IMessage } from '@models/domain/message/IMessage';
import MessageWrapper from '@components/MessagesSection/MessageWrapper';

export type IMessagesSectionProps = IInformationSectionProps<IMessage>

const defaultMessageRender = (message: IMessage) => <MessageWrapper message={message} />;

const MessagesSection: React.FC<IMessagesSectionProps> = (
  { title = 'MY REMINDERS / UNREAD MESSAGES', renderItem = defaultMessageRender, ...props }
) => (
  <InformationSection
    {...props}
    renderItem={renderItem}
    title={title}
    itemsWrapper={MessagesSectionWrapper}
    noItemsPlaceholder={() => <div>No items</div>}
  />
);

export default MessagesSection;
