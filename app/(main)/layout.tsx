type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return <div className='p-2'>{children}</div>;
};

export default MainLayout;
