import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor } from '@testing-library/react';
import BlogForm from './BlogForm';
import userEvent from '@testing-library/user-event';

test('create button submit the form with new blog', async () => {
  const newBlog = {
    title: 'test is not that bad',
    author: 'Me',
    url: 'www.maybealie.com',
  };

  const addBlog = jest.fn();

  const { container } = render(<BlogForm addBlog={addBlog} />);

  const titleField = screen.getByPlaceholderText('title');
  const authorField = screen.getByPlaceholderText('author');
  const urlField = screen.getByPlaceholderText('url');

  const submitButton = container.querySelector('#submit-btn');

  await waitFor(() => userEvent.type(titleField, newBlog.title));
  await waitFor(() => userEvent.type(authorField, newBlog.author));
  await waitFor(() => userEvent.type(urlField, newBlog.url));
  await waitFor(() => userEvent.click(submitButton));

  expect(addBlog).toHaveBeenCalledTimes(1);
  waitFor(() => expect(addBlog).toHaveBeenCalledWith({ ...newBlog }));
});
