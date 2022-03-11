import { createSlice } from '@reduxjs/toolkit';
import { blogsService } from '../services';
import { handleNotification } from './notificationSlice';

const initialState = [];

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs: (state, action) => action.payload,
    addBlog: (state, action) => {
      state.push(action.payload);
    },
    updateBlog: (state, action) => {
      const modifiedBlog = action.payload;
      return state.map((blog) => (blog.id !== modifiedBlog.id ? blog : modifiedBlog));
    },
    deleteBlog: (state, action) => {
      const blogIdToDelete = action.payload;
      return state.filter((blog) => blog.id !== blogIdToDelete);
    },
    addComment: (state, action) => {
      const { updatedComments, id: blogId } = action.payload;
      const targetedBlog = state.find((blog) => blog.id === blogId);
      const updatedBlog = { ...targetedBlog, comments: updatedComments };
      return state.map((blog) => (blog.id !== updatedBlog.id ? blog : updatedBlog));
    },
  },
});

export const { setBlogs, addBlog, updateBlog, deleteBlog, addComment } = blogSlice.actions;

export const getBlogs = () => async (dispatch) => {
  const blogs = await blogsService.getAll();
  dispatch(setBlogs(blogs));
};

export const createNewBlog = (blog) => async (dispatch) => {
  try {
    const newBlog = await blogsService.create(blog);
    dispatch(addBlog(newBlog));
    dispatch(handleNotification(`a new blog ${blog.title} by ${blog.author} added`));
  } catch (error) {
    console.error(error);
  }
};

export const updateOneBlog = (blogId, updatedBlog) => async (dispatch) => {
  try {
    const modifiedBlog = await blogsService.update(blogId, updatedBlog);
    dispatch(updateBlog(modifiedBlog));
  } catch (error) {
    console.error(error);
  }
};

export const addNewComment = (id, comment) => async (dispatch) => {
  try {
    const updatedComments = await blogsService.addComment(id, comment);
    dispatch(addComment({ updatedComments, id }));
  } catch (error) {
    console.error(error);
  }
};

export const deleteOneBlog = (blogId) => async (dispatch) => {
  try {
    await blogsService.deleteOne(blogId);
    dispatch(deleteBlog(blogId));
  } catch (error) {
    console.error(error);
  }
};

export default blogSlice.reducer;
