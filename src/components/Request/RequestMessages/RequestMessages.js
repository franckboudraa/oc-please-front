import React from 'react';
import { Icon, Label, Menu, Tab } from 'semantic-ui-react';
import RequestMessagesList from './RequestMessagesList';

const RequestMessages = ({ volunteers }) => {
  const panes = [];
  console.log(volunteers);
  volunteers.map(volunteer => {
    let iconName;
    switch (volunteer.status) {
      case 'pending':
        iconName = 'wait';
        break;
      case 'declined':
        iconName = 'cancel';
        break;
      default:
        iconName = 'check circle';
    }
    return panes.push({
      menuItem: (
        <Menu.Item key={volunteer.id}>
          <Icon name={iconName} /> {volunteer.user.first_name} {volunteer.user.last_name}
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

  return <Tab panes={panes} />;
};

export default RequestMessages;
