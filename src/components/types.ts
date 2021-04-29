export type Employee = {
  name: {
    first: string;
    last: string;
    title?: string;
  };
  email?: string;
  picture?: {
    thumbnail?: string;
    large?: string;
    medium?: string;
  };
  id?: string | null;
};
