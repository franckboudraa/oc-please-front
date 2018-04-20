import React from 'react';
import moment from 'moment';
import { Icon, List } from 'semantic-ui-react';

const RequestVolunteersList = ({ volunteers }) => {
  return (
    <List horizontal selection size="tiny">
      {volunteers.map(volunteer => {
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
        return (
          <List.Item key={volunteer.id}>
            <Icon name={iconName} />
            <List.Content>
              <List.Header>
                {volunteer.user.first_name} {volunteer.user.last_name}
              </List.Header>
              {moment(volunteer.created_at).format('LLL')}
            </List.Content>
          </List.Item>
        );
      })}
    </List>
  );
};

export default RequestVolunteersList;
