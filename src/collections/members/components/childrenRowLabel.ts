const component = ({ data, index }: { data: any; index: number }) => {
  return data?.name || `Child`;
  // return data?.name || `Child ${String(index).padStart(2, '0')}`;
};

export default component;
