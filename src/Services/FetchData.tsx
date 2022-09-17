import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AddComment, AddPost, Post, PostDescription } from "./Interfaces";

export const dataApi = createApi({
  reducerPath: "dataApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://bloggy-api.herokuapp.com/",
  }),
  tagTypes: ["Post", "Comment"],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], undefined>({
      query: () => `posts`,
      providesTags: ["Post"],
    }),
    getPostInfo: builder.query<PostDescription, string>({
      query: (id) => `posts/${id}?_embed=comments`,
      providesTags: ["Post", "Comment"],
    }),
    addNewPost: builder.mutation<Post, AddPost>({
      query: (payload) => ({
        url: "posts",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Post"],
    }),
    EditPost: builder.mutation<Post, { id: number; post: AddPost }>({
      query: ({ id, post }) => ({
        url: `posts/${id}`,
        method: "PUT",
        body: post,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Post"],
    }),

    DeletePost: builder.mutation({
      query: (id: string) => ({
        url: `posts/${id}`,
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Post"],
    }),
    addNewComment: builder.mutation<Comment, AddComment>({
      query: (payload) => ({
        url: "comments",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Comment"],
    }),
  }),
});

export const {
  useGetPostInfoQuery,
  useGetPostsQuery,
  useEditPostMutation,
  useAddNewCommentMutation,
  useAddNewPostMutation,
  useDeletePostMutation,
} = dataApi;
