import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFields } from '../hooks';

const CreateNew = (props) => {
  const { reset: contentReset, ...content } = useFields('name');
  const { reset: authorReset, ...author } = useFields('name');
  const { reset: infoReset, ...info } = useFields('name');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    });
    navigate('/anecdotes');
    props.setNotification(`a new anecdote ${content.value} created!`);
    setTimeout(() => props.setNotification(''), 5000);
  };

  const handleReset = () => {
    contentReset();
    authorReset();
    infoReset();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name="content" {...content} />
        </div>
        <div>
          author
          <input name="author" {...author} />
        </div>
        <div>
          url for more info
          <input name="info" {...info} />
        </div>
        <button type="submit">create</button>
        <button onClick={handleReset} type="reset">
          reset
        </button>
      </form>
    </div>
  );
};

export default CreateNew;
