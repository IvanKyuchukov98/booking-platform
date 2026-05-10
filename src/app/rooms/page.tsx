import { Button } from '@/src/app/components/ui/Button';
import Image from 'next/image';
import room1Image from '@/public/images/room1.png';
import room2Image from '@/public/images/room2.png';
import room3Image from '@/public/images/room3.png';
import { StarIcon } from '@/src/app/components/icons/StarIcon';
import { HeartIcon } from '@/src/app/components/icons/HeartIcon';
import { InputField } from '@/src/app/components/inputs/InputField';
import { CheckboxGroup } from '@/app/components/inputs/CheckboxGroup';
import { SelectField } from '@/app/components/inputs/SelectField';

export default function Home() {
  return (
    <main className='bg-gray-eceef0 flex flex-1'>
      <div className='mx-auto flex w-full max-w-[1280px] flex-1'>
        <aside className='flex w-80 flex-col bg-white p-6'>
          <span className='text-black'>Filters</span>
          <span className='text-black-45464d mt-4 mb-2'>Price range</span>
          <div className='flex gap-1'>
            <InputField
              variant='light'
              className='!h-9 w-full !px-3'
              label='Min price'
              labelClassName='text-xs'
              inputClassName='!border-gray-c2c6d6 !rounded-[8px]'
              containerClassName='w-full max-w-[300px] '
            ></InputField>
            <InputField
              variant='light'
              className='!h-9 w-full !px-3'
              label='Max price'
              labelClassName='text-xs'
              inputClassName='!border-gray-c2c6d6 !rounded-[8px]'
              containerClassName='w-full max-w-[300px] '
            ></InputField>
          </div>
          <div className='bg-green-006a61 mt-4 mb-6 h-1 w-full rounded-full'></div>
          <CheckboxGroup
            label='Property type'
            name='propertyType'
            options={[
              { value: 'hotels', label: 'Hotels' },
              { value: 'apartments', label: 'Apartments' },
              { value: 'villas', label: 'Villas' },
              { value: 'resorts', label: 'Resorts' },
            ]}
            defaultValue={['hotels']}
          />
          <CheckboxGroup
            label='Amenities'
            name='amenities'
            containerClassName='mt-6'
            options={[
              { value: 'free-wo-fi', label: 'Free Wi-Fi' },
              { value: 'swimming-pool', label: 'Swimming Pool' },
              { value: 'gym', label: 'Gym' },
              { value: 'pet-friendly', label: 'Pet Friendly' },
            ]}
            defaultValue={['hotels']}
          />
          <Button
            variant='roundedFill'
            className='mt-6 h-12 !rounded-[16px] bg-black px-6'
          >
            <span className='text-white'>Show Results</span>
          </Button>
        </aside>
        <section className='flex w-full flex-col gap-8 p-6'>
          <div className='flex justify-between'>
            <div className='flex flex-col'>
              <span className='text-gray-76777D text-sm font-medium'>
                328 STAYS FOUND
              </span>
              <span className='text-black'>Stays in Amsterdam</span>
            </div>
            <SelectField
              name='propertyType'
              placeholder='Sort by:'
              containerClassName='max-w-[200px] w-full'
              options={[
                { value: 'recommended', label: 'Recommended' },
                { value: 'price-low', label: 'Price low' },
                { value: 'price-high', label: 'Price high' },
                { value: 'rating', label: 'Rating' },
              ]}
            />
          </div>

          <div className='flex flex-col gap-6'>
            <div className='flex overflow-hidden rounded-[16px] bg-white'>
              <div className='relative w-full max-w-60 shrink-0 self-stretch'>
                <Image
                  src={room1Image}
                  alt=''
                  fill
                  sizes='240px'
                  className='object-cover'
                />
                <button className='bg-gray-cfcfcf absolute top-4 right-4 cursor-pointer rounded-full p-1'>
                  <HeartIcon className='fill-black-0f172a h-6 w-6' />
                </button>
              </div>

              <div className='flex w-full flex-col p-6'>
                <div className='flex items-center justify-between'>
                  <span className='text-green-006a61 text-xs font-bold'>
                    SUPERHOST
                  </span>

                  <div className='flex items-center gap-1'>
                    <StarIcon className='fill-green-006a61 h-4 w-4' />
                    <span className='text-black-191c1e text-sm font-bold'>
                      4.9
                    </span>
                    <span className='text-gray-76777D text-sm font-medium'>
                      (128)
                    </span>
                  </div>
                </div>

                <h2 className='font-semibold text-black'>
                  The Canal House Boutique
                </h2>
                <span className='text-black-45464d'>
                  Centrum, Amsterdam • 500m from city center
                </span>
                <div className='my-4 flex flex-wrap gap-2'>
                  <span className='bg-gray-e6e8eA text-black-191c1e rounded-full px-3 py-1 text-xs font-semibold text-nowrap'>
                    Free Wi-Fi
                  </span>
                  <span className='bg-gray-e6e8eA text-black-191c1e rounded-full px-3 py-1 text-xs font-semibold text-nowrap'>
                    Breakfast included
                  </span>
                  <span className='bg-gray-e6e8eA text-black-191c1e rounded-full px-3 py-1 text-xs font-semibold text-nowrap'>
                    Historic view
                  </span>
                </div>

                <div className='mt-auto flex items-end justify-between'>
                  <span className='text-black'>
                    $245
                    <span className='text-gray-76777D text-sm font-medium'>
                      {' '}
                      / night
                    </span>
                  </span>
                  <Button
                    variant='roundedFill'
                    className='bg-green-006a61 h-12 !rounded-[16px] px-6'
                  >
                    <span className='text-white'>View Property</span>
                  </Button>
                </div>
              </div>
            </div>
            <div className='flex overflow-hidden rounded-[16px] bg-white'>
              <div className='relative w-full max-w-60 shrink-0 self-stretch'>
                <Image
                  src={room2Image}
                  alt=''
                  fill
                  sizes='240px'
                  className='object-cover'
                />
                <button className='bg-gray-cfcfcf absolute top-4 right-4 cursor-pointer rounded-full p-1'>
                  <HeartIcon className='fill-black-0f172a h-6 w-6' />
                </button>
              </div>

              <div className='flex w-full flex-col p-6'>
                <div className='flex items-center justify-between'>
                  <span className='text-blue-008ebf text-xs font-bold'>
                    RARE FIND
                  </span>

                  <div className='flex items-center gap-1'>
                    <StarIcon className='fill-green-006a61 h-4 w-4' />
                    <span className='text-black-191c1e text-sm font-bold'>
                      4.8
                    </span>
                    <span className='text-gray-76777D text-sm font-medium'>
                      (84)
                    </span>
                  </div>
                </div>

                <h2 className='font-semibold text-black'>
                  Industrial Loft at NDSM
                </h2>
                <span className='text-black-45464d'>
                  Noord, Amsterdam • 15 min by ferry
                </span>
                <div className='my-4 flex flex-wrap gap-2'>
                  <span className='bg-gray-e6e8eA text-black-191c1e rounded-full px-3 py-1 text-xs font-semibold text-nowrap'>
                    Full Kitchen
                  </span>
                  <span className='bg-gray-e6e8eA text-black-191c1e rounded-full px-3 py-1 text-xs font-semibold text-nowrap'>
                    Workspace
                  </span>
                  <span className='bg-gray-e6e8eA text-black-191c1e rounded-full px-3 py-1 text-xs font-semibold text-nowrap'>
                    Pet Friendly
                  </span>
                </div>

                <div className='mt-auto flex items-end justify-between'>
                  <span className='text-black'>
                    $189
                    <span className='text-gray-76777D text-sm font-medium'>
                      {' '}
                      / night
                    </span>
                  </span>
                  <Button
                    variant='roundedFill'
                    className='bg-green-006a61 h-12 !rounded-[16px] px-6'
                  >
                    <span className='text-white'>View Property</span>
                  </Button>
                </div>
              </div>
            </div>
            <div className='flex overflow-hidden rounded-[16px] bg-white'>
              <div className='relative w-full max-w-60 shrink-0 self-stretch'>
                <Image
                  src={room3Image}
                  alt=''
                  fill
                  sizes='240px'
                  className='object-cover'
                />
                <button className='bg-gray-cfcfcf absolute top-4 right-4 cursor-pointer rounded-full p-1'>
                  <HeartIcon className='fill-black-0f172a h-6 w-6' />
                </button>
              </div>

              <div className='flex w-full flex-col p-6'>
                <div className='flex items-center justify-between'>
                  <span className='text-green-006a61 text-xs font-bold'>
                    PREMIUM SELECTION
                  </span>

                  <div className='flex items-center gap-1'>
                    <StarIcon className='fill-green-006a61 h-4 w-4' />
                    <span className='text-black-191c1e text-sm font-bold'>
                      5.0
                    </span>
                    <span className='text-gray-76777D text-sm font-medium'>
                      (42)
                    </span>
                  </div>
                </div>

                <h2 className='font-semibold text-black'>
                  The Royal Amstel Suites
                </h2>
                <span className='text-black-45464d'>
                  Oud-Zuid, Amsterdam • Near Museums
                </span>
                <div className='my-4 flex flex-wrap gap-2'>
                  <span className='bg-gray-e6e8eA text-black-191c1e rounded-full px-3 py-1 text-xs font-semibold text-nowrap'>
                    Pool & Spa
                  </span>
                  <span className='bg-gray-e6e8eA text-black-191c1e rounded-full px-3 py-1 text-xs font-semibold text-nowrap'>
                    Concierge
                  </span>
                  <span className='bg-gray-e6e8eA text-black-191c1e rounded-full px-3 py-1 text-xs font-semibold text-nowrap'>
                    Room Service
                  </span>
                </div>

                <div className='mt-auto flex items-end justify-between'>
                  <span className='text-black'>
                    $420
                    <span className='text-gray-76777D text-sm font-medium'>
                      {' '}
                      / night
                    </span>
                  </span>
                  <Button
                    variant='roundedFill'
                    className='bg-green-006a61 h-12 !rounded-[16px] px-6'
                  >
                    <span className='text-white'>View Property</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
