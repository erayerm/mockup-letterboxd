import FavoriteFilms from "./FavoriteFilms"
import Following from "./Following"
import PopularReviews from "./PopularReviews"
import RecentActivity from "./RecentActivity"
import RecentReviews from "./RecentReviews"
import Tags from "./Tags"

function ProfileMain() {
    return (
        <div className="basis-[640px]">
            <FavoriteFilms />
            <RecentActivity />
            <div className="space-y-16">
                <RecentReviews />
                <PopularReviews />
                <div className="flex flex-wrap w-full justify-between gap-y-10">
                    <Tags />
                    <Following />
                </div>
            </div>
        </div>
    )
}

export default ProfileMain