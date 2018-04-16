import React from 'react';
import { Icon, Label, Menu, Tab } from 'semantic-ui-react';
import RequestMessagesList from './RequestMessagesList';

const RequestMessages = ({ volunteers }) => {
  const panes = [];

  volunteers.map(volunteer => {
    return panes.push({
      menuItem: (
        <Menu.Item key={volunteer.id}>
          <Icon name={volunteer.status === 'pending' ? 'wait' : 'checkmark'} /> {volunteer.user.first_name}{' '}
          {volunteer.user.last_name}
          <Label>{volunteer.messages.length}</Label>
        </Menu.Item>
      ),
      render: () => (
        <Tab.Pane key={volunteer.id}>
          <RequestMessagesList key={volunteer.id} volunteer={volunteer} />
        </Tab.Pane>
      )
    });
  });
  /*const panes = [
    { menuItem: 'Tab 1', render: () => <Tab.Pane>Tab 1 Content</Tab.Pane> },
    { menuItem: 'Tab 2', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
    { menuItem: 'Tab 3', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> }
  ];*/

  /*{volunteers.map(volunteer => {
  return <Tab.Pane key={volunteer.id}>test</Tab.Pane>;
})}*/

  return <Tab panes={panes} />;
};

export default RequestMessages;
