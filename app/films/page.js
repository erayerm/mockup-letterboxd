import FilmsMainNav from "../components/films/FilmsMainNav"
import FilmsSearchInput from "../components/films/FilmsSearchInput"

function Films() {
    return (
        <div className="w-full min-h-screen bg-[#20272D]">
            <div className="container">
                <div className="w-full flex justify-between pt-12 text-gray-500">
                    <FilmsMainNav />
                    <FilmsSearchInput />
                </div>
            </div>
        </div>
    )
}

export default Films