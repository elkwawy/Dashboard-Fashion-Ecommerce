import { MdClose } from "react-icons/md";
const Search = ({toggleShowSearch}) => {
    return (
        <div className='w-full flex gap-1 justify-between items-center h-full'>
            <input maxLength={150} autoFocus={true} type="text" placeholder='Type your search here...' className='outline-none w-full bg-[#F8F8F8] ' />
            <MdClose onClick={toggleShowSearch} size={22} className=" cursor-pointer" />
        </div>
    )
}

export default Search