import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LazyImage from '../utilities/LazyImage';
import LoadingSpinner from '../utilities/LoadingSpinner';

const SeasonCollection = () => {
    const {categories, status, error} = useSelector((state) => state.categories);
    return (
        <div className='spaceT w-full mb-20'>
            <div className='spaceX bg-[#f8f8f8] p-0 sm:p-3 lg:p-6 sm:rounded-md flex flex-col gap-5'>
                <div className='w-full px-2 sm:px-0 flex justify-between items-center'>
                    <h2 className='text-[16px] sm:text-xl font-semibold'>Season Collection</h2>
                    <span className='text-sm sm:text-[16px] underline trans cursor-pointer hover:no-underline'>View all categories</span>
                </div>

                {/* DIV OF API DATA */}
                {status === "succeeded" &&  <div className='overflow-x-scroll scrollbar [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-md scrollbar-track-none scrollbar-thumb-[#d3d3d3]  lg:overflow-y-hidden overflow-y-hidden flex justify-center items-center gap-0 sm:gap-14 md:gap-10 lg:gap-44 w-full'>
                    {
                        categories && categories.map((coll) => (
                            <Link state={{categoryId: coll._id}} to={`${coll.slug}/all`} key={coll._id} className='min-w-[120px] md:w-fit trans hover:scale-105 py-2 rounded-md cursor-pointer flex flex-col items-center justify-center gap-2 sm:gap-4'>
                                <LazyImage src={coll.image} alt={`${coll.name} Category`} loader={<div className='w-[100px] sm:w-[120px] md:w-[200px] relative h-[100px] sm:h-[120px] md:h-[200px] rounded-full flex items-center justify-center bg-[#ddd]'><LoadingSpinner  /></div>} className={'rounded-full w-[100px] sm:w-[120px] md:w-[200px] trans'} />
                                <div className='flex flex-col gap-0.5 items-center'>
                                    <h2 className='text-[16px] sm:text-lg font-semibold'>{coll.name}</h2>
                                </div>
                            </Link>
                        ))
                    }
                </div>}

                {
                    status === "failed" && <p>{error}</p>
                }
                {status === "loading" && <div className="w-full h-44 bg-[#f8f8f8] flex items-center justify-center"> <LoadingSpinner /> </div>}

            </div>
        </div>
    )
}

export default SeasonCollection