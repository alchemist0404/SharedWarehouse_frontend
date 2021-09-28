import React from 'react';
import styles from './styles.module.scss';
import { IMessage } from '@models/domain/message/IMessage';
import { Checkbox } from 'semantic-ui-react';
import moment from 'moment';

interface IMessageWrapperProps {
  message: IMessage;
}

const MessageWrapper: React.FC<IMessageWrapperProps> = ({ message }) => (
  <div className={styles.container}>
    <div className={styles.leftPart}>
      <div className={styles.checkboxWrapper}>
        <Checkbox />
      </div>
      <div className={styles.senderWrapper}>
        {message.sender}
      </div>
      <div className={styles.textWrapper}>
        {message.text}
      </div>
    </div>
    <div className={styles.rightPart}>
      <div className={styles.createdAtWrapper}>
        {moment(message.createdAt).format('DD MMM, HH:mm')}
      </div>
    </div>
  </div>
);

export default MessageWrapper;
