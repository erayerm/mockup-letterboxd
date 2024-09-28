import FilmsMainNav from "../components/films/FilmsMainNav"



function Films() {
    return (
        <div className="w-full min-h-screen bg-[#20272D]">
            <div className="container">
                <div className="w-full flex justify-between pt-12">
                    <FilmsMainNav />
                </div>
            </div>
        </div>
    )
}

export default Films