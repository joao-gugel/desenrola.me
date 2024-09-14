type ThreadAuthor = {
  avatar: string;
  handle: string;
  name: string;
};

export type ThreadSectionProps = {
  text: string;
  images: string[];
};

export type ThreadProps = {
  id: string;
  author?: ThreadAuthor;
  content: string;
};
