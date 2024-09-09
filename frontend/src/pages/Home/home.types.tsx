export interface BlogStructure {
  id: string;
  title: string;
  content: string;
  published: boolean;
  authorId: string;
  uploadedDate: string;
  author: {
    id: string;
    email: string;
    name: string;
    password: string;
  };
}
