import Spinner from '@/components/spinner';

export default function Loading() {
  return (
    <div className="h-screen flex justify-center items-center">
      <Spinner />
    </div>
  );
}
