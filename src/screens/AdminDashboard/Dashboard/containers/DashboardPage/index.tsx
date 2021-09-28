import React from 'react';
import common from '@screens/NeedsDashboard/styles/common.module.scss';
import { connect } from 'react-redux';
import MessagesSection from '@components/MessagesSection';
import PopularBuildingsSection from '@screens/AdminDashboard/Dashboard/components/PopularBuildingsSection';
import TransactionsSection from '@screens/NeedsDashboard/Dashboard/components/TransactionsSection';
import { IMessage } from '@models/domain/message/IMessage';

export interface IDashboardProps {
}

const mockMessages: IMessage[] = [
  {
    sender: 'James Baldwin',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet. ',
    createdAt: '2020-12-24 14:12'
  },
  {
    sender: 'Michael Martin Smith',
    text: 'Aliquam a malesuada massa, eget molestie tellus. eget molestie tellus. eget molestie tellus.',
    createdAt: '2020-12-24 14:12'
  },
  {
    sender: 'Bella Cruise',
    text: 'Fusce laoreet accumsan massa, ut tincidunt arcu aliquet ac. ut tincidunt arcu aliquet ac.',
    createdAt: '2020-12-24 14:12'
  },
  {
    sender: 'Abigayle Romero',
    text: 'Quisque sagittis justo sit amet arcu consectetur lobortis.',
    createdAt: '2020-12-24 14:12'
  },
  {
    sender: 'Kaden West',
    text: 'Etiam luctus mauris sit amet est auctor, a malesuada mauris lobortis. a malesuada mauris lobortis.',
    createdAt: '2020-12-24 14:12'
  },
  {
    sender: 'Violet Luna',
    text: ' Maecenas eget erat sit amet magna tristique mattis nec ac tortor.',
    createdAt: '2020-12-24 14:12'
  }
];

const Dashboard: React.FC<IDashboardProps> = () => (
  <div className={common.container}>
    <h1>Dashboard</h1>
    <MessagesSection
      items={mockMessages}
      fetchItems={() => console.warn('implement loading messages')}
      itemsLoading={false}
    />
    <PopularBuildingsSection />
    <TransactionsSection
      title="Recent Transactions"
      items={[]}
      fetchItems={() => console.warn('implement loading transactions')}
      itemsLoading={false}
      haveMore={false}
    />
  </div>
);

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
