import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Blog from './Blog';
import userEvent from '@testing-library/user-event';

describe('<Blog/>', () => {
  const blog = {
    title: 'I hate testing',
    author: 'Who does not?',
    likes: 100000,
    url: 'www.truths.com',
  };

  test('renders title and author, but not url or likes by default', () => {
    const { container } = render(<Blog blog={blog} />);
    const span = container.querySelector('.blog-title');

    expect(span).toHaveTextContent(`${blog.title} by ${blog.author}`);
    expect(span).not.toHaveTextContent(blog.likes);
    expect(span).not.toHaveTextContent(blog.url);
  });

  test('show url and likes when user click on button "show" ', () => {
    const { container } = render(<Blog blog={blog} />);
    const toggler = container.querySelector('.visibility-toggler');
    const hiddenElement = container.querySelector('.hidden-element');

    expect(hiddenElement).toHaveStyle('display:none');
    userEvent.click(toggler);
    expect(hiddenElement).toHaveStyle('display:block');
    expect(hiddenElement).toHaveTextContent(blog.likes);
    expect(hiddenElement).toHaveTextContent(blog.url);
  });

  test('if like button clicked twice the event handler is called twice', () => {
    const updateBlog = jest.fn();
    render(<Blog blog={blog} updateBlog={updateBlog} />);

    const handleAddLikes = screen.getByText('like');
    userEvent.dblClick(handleAddLikes);

    expect(updateBlog).toHaveBeenCalledTimes(2);
  });
});
