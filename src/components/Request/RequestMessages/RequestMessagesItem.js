import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import Gravatar from 'react-gravatar';
import { Link } from 'react-router-dom';
import { Comment } from 'semantic-ui-react';

const RequestMessagesItem = ({ message }) => {
  return (
    <Comment>
      <div className="avatar">
        <Gravatar email={message.user.email} />
      </div>
      <Comment.Content>
        <Comment.Author
          as={Link}
          to={`/u/${message.user.id}/${_.kebabCase(message.user.first_name + '-' + message.user.last_name)}`}
        >
          {message.user.first_name} {message.user.last_name}
        </Comment.Author>
        <Comment.Metadata>
          <div>{moment(message.created_at).format('LLL')}</div>
        </Comment.Metadata>
        <Comment.Text>
          <p className="nl2br">{message.content}</p>
        </Comment.Text>
      </Comment.Content>
    </Comment>
  );
};

export default RequestMessagesItem;
