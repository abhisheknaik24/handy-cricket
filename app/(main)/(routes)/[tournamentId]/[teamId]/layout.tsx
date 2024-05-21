import { Sidebar } from '../../../_components/sidebar';

type Props = {
  children: React.ReactNode;
};

const TeamLayout = ({ children }: Props) => {
  return (
    <div className='relative'>
      <div className='hidden w-full h-full md:block'>
        <Sidebar />
      </div>
      <div className='w-full h-full p-2 md:pl-72'>{children}</div>
    </div>
  );
};

export default TeamLayout;
