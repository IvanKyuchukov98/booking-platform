export default function Loading() {
  return (
    <main className='bg-gray-eceef0 flex flex-1 animate-pulse'>
      <div className='mx-auto flex w-full max-w-[1280px] flex-1'>
        <aside className='flex w-80 flex-col gap-3 bg-white p-6'>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className='h-11 rounded-[12px] bg-gray-eceef0' />
          ))}
          <div className='border-gray-e6e8eA mt-5 h-28 rounded-[16px] border bg-white' />
        </aside>
        <section className='flex w-full flex-col p-6'>
          <div className='h-10 w-72 rounded bg-white' />
          <div className='mt-2 h-5 w-96 rounded bg-white' />
          <div className='mt-8 flex items-center justify-between'>
            <div className='h-8 w-48 rounded bg-white' />
            <div className='h-11 w-[220px] rounded-xl bg-white' />
          </div>
          <div className='mt-6 grid grid-cols-3 gap-6'>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className='flex flex-col gap-3'>
                <div className='aspect-square rounded-[24px] bg-white' />
                <div className='h-5 w-3/4 rounded bg-white' />
                <div className='h-4 w-1/2 rounded bg-white' />
                <div className='flex gap-2'>
                  <div className='h-11 flex-1 rounded-[16px] bg-white' />
                  <div className='h-11 w-20 rounded-[16px] bg-white' />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
