export type Page = {
  id: number;
  title: string;
  newTab: boolean;
};

export type Menu = {
  id: number;
  title: string;
  newTab: boolean;
} & (
  | {
      path: string;
      submenu?: never;
    }
  | {
      path?: never;
      submenu: Menu[];
    }
);
