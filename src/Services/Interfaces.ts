export interface Post {
  id: number;
  title: string;
  body: string;
}
export interface AddPost {
  title: string;
  body: string;
}
export interface AddComment {
  postId: number;
  body: string;
}

export interface Comment {
  id: number;
  postId: number;
  body: string;
}

export interface PostDescription {
  id: number;
  title: string;
  body: string;
  comments: Comment[];
}