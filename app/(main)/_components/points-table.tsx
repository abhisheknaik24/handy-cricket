import { Loader } from '@/components/loader/loader';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useGetPointsTable } from '@/hooks/useGetPointsTable';
import { cn } from '@/lib/utils';

export const PointsTable = () => {
  const { data: res, isLoading } = useGetPointsTable();

  if (isLoading) {
    return <Loader />;
  }

  if (!res?.data?.pointsTable?.length) {
    return null;
  }

  return (
    <div className='mt-4'>
      <Table className='border border-secondary'>
        <TableHeader className='bg-secondary'>
          <TableRow>
            <TableHead>Team</TableHead>
            <TableHead>Total Matches</TableHead>
            <TableHead>Played Matches</TableHead>
            <TableHead>Wins</TableHead>
            <TableHead>Losses</TableHead>
            <TableHead>Points</TableHead>
            <TableHead>Run Rate</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {res?.data?.pointsTable?.map((item: any, index: number) => (
            <TableRow
              key={item?.id}
              className={cn(
                index < 4 && 'bg-yellow-500/50 hover:bg-yellow-500'
              )}
            >
              <TableCell className='capitalize'>{item?.team}</TableCell>
              <TableCell>{item?.totalMatches}</TableCell>
              <TableCell>{item?.playedMatches}</TableCell>
              <TableCell>{item?.wins}</TableCell>
              <TableCell>{item?.losses}</TableCell>
              <TableCell>{item?.points}</TableCell>
              <TableCell>{item?.runRate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
