import type { Employee } from "./types";

export const mockEmployees: Employee[] = [
  {
    name: {
      first: "Niclas",
      last: "Stornes",
      title: "Mr",
    },
    email: "niclas.stornes@example.com",
    picture: {
      thumbnail: "https://randomuser.me/api/portraits/thumb/men/78.jpg",
    },
    id: null,
  },
  {
    name: {
      first: "Erik",
      last: "Banks",
      title: "Mr",
    },
    email: "erik.banks@example.com",
    picture: {
      thumbnail: "https://randomuser.me/api/portraits/thumb/men/67.jpg",
      large: "https://randomuser.me/api/portraits/men/67.jpg",
      medium: "https://randomuser.me/api/portraits/med/men/67.jpg",
    },
    id: null,
  },
  {
    name: {
      first: "Andrea",
      last: "Crespo",
      title: "Mrs",
    },
    email: "andrea.crespo@example.com",
    picture: {
      thumbnail: "https://randomuser.me/api/portraits/thumb/women/41.jpg",
      large: "https://randomuser.me/api/portraits/women/41.jpg",
      medium: "https://randomuser.me/api/portraits/med/women/41.jpg",
    },
    id: null,
  },
];
