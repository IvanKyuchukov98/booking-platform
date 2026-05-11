export default function Loading() {
  return (
    <main className='bg-gray-eceef0 flex flex-1 animate-pulse'>
      <div className='mx-auto flex w-full max-w-[1280px] flex-1'>
        <aside className='flex w-80 flex-col gap-4 bg-white p-6'>
          <div className='h-5 w-20 rounded bg-gray-eceef0' />
          <div className='h-9 rounded-[8px] bg-gray-eceef0' />
          <div className='h-9 rounded-[8px] bg-gray-eceef0' />
          <div className='bg-green-006a61 h-1 w-full rounded-full opacity-40' />
          <div className='h-32 rounded-[8px] bg-gray-eceef0' />
          <div className='h-32 rounded-[8px] bg-gray-eceef0' />
          <div className='h-12 rounded-[16px] bg-gray-eceef0' />
        </aside>
        <section className='flex w-full flex-col gap-8 p-6'>
          <div className='flex justify-between'>
            <div className='flex flex-col gap-2'>
              <div className='h-4 w-32 rounded bg-white' />
              <div className='h-6 w-40 rounded bg-white' />
            </div>
            <div className='h-11 w-[200px] rounded-xl bg-white' />
          </div>
          <div className='flex flex-col gap-6'>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className='flex h-[240px] overflow-hidden rounded-[16px] bg-white'
              >
                <div className='bg-gray-eceef0 w-60 shrink-0' />
                <div className='flex flex-1 flex-col gap-3 p-6'>
                  <div className='h-4 w-24 rounded bg-gray-eceef0' />
                  <div className='h-6 w-3/4 rounded bg-gray-eceef0' />
                  <div className='h-4 w-1/2 rounded bg-gray-eceef0' />
                  <div className='mt-auto flex justify-between'>
                    <div className='h-5 w-24 rounded bg-gray-eceef0' />
                    <div className='h-12 w-32 rounded-[16px] bg-gray-eceef0' />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
