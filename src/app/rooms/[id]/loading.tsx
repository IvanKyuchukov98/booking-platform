export default function Loading() {
  return (
    <main className='mx-auto mb-12 w-full animate-pulse'>
      <section className='mt-8 px-6'>
        <div className='mx-auto flex max-w-[1280px] flex-col gap-3'>
          <div className='h-12 w-1/2 rounded bg-gray-eceef0' />
          <div className='h-5 w-1/3 rounded bg-gray-eceef0' />
          <div className='mt-4 grid grid-cols-2 gap-3 overflow-hidden rounded-[12px]'>
            <div className='aspect-[4/3] bg-gray-eceef0' />
            <div className='grid grid-cols-2 gap-3'>
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className='aspect-[4/3] bg-gray-eceef0' />
              ))}
            </div>
          </div>
        </div>
      </section>
      <div className='mt-20 px-6'>
        <div className='mx-auto flex max-w-[1280px] gap-15'>
          <section className='flex w-full flex-col gap-6'>
            <div className='border-gray-cfcfcf flex justify-between border-b pb-8'>
              <div className='flex flex-col gap-2'>
                <div className='h-6 w-72 rounded bg-gray-eceef0' />
                <div className='h-4 w-52 rounded bg-gray-eceef0' />
              </div>
              <div className='bg-gray-eceef0 h-14 w-14 rounded-full' />
            </div>
            <div className='flex flex-col gap-4'>
              <div className='h-4 w-2/3 rounded bg-gray-eceef0' />
              <div className='h-4 w-3/4 rounded bg-gray-eceef0' />
              <div className='h-4 w-1/2 rounded bg-gray-eceef0' />
            </div>
            <div className='border-gray-cfcfcf flex flex-col gap-4 border-t pt-8'>
              <div className='h-6 w-56 rounded bg-gray-eceef0' />
              <div className='grid grid-cols-2 gap-4'>
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className='h-5 rounded bg-gray-eceef0' />
                ))}
              </div>
            </div>
          </section>
          <div className='border-gray-cfcfcf flex h-fit w-[380px] shrink-0 flex-col gap-4 rounded-[16px] border bg-white p-6'>
            <div className='h-8 w-1/3 rounded bg-gray-eceef0' />
            <div className='border-gray-cfcfcf flex flex-col rounded-[12px] border'>
              <div className='border-gray-cfcfcf flex border-b'>
                <div className='border-gray-cfcfcf flex-1 border-r p-3'>
                  <div className='h-3 w-16 rounded bg-gray-eceef0' />
                  <div className='mt-1 h-4 w-24 rounded bg-gray-eceef0' />
                </div>
                <div className='flex-1 p-3'>
                  <div className='h-3 w-16 rounded bg-gray-eceef0' />
                  <div className='mt-1 h-4 w-24 rounded bg-gray-eceef0' />
                </div>
              </div>
              <div className='p-3'>
                <div className='h-3 w-16 rounded bg-gray-eceef0' />
                <div className='mt-1 h-4 w-20 rounded bg-gray-eceef0' />
              </div>
            </div>
            <div className='h-14 rounded-[12px] bg-gray-eceef0' />
          </div>
        </div>
      </div>
    </main>
  );
}
