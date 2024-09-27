import ProfileSettingsForm from "../components/ProfileSettingsForm";

const SettingsPage = () => {
    return <div>
        <h1 className="text-[25px] py-5">Profile</h1>
        <div className="flex justify-between pb-20">
            <div className="basis-2/5">{/*left 4/10*/}
                <ProfileSettingsForm />
            </div>
            <div className="basis-1/2">{/*right 5/10*/}
                <div>favorite films</div>
                <div className="w-full">I'll implement this after made films section</div>
            </div>
        </div>
    </div>;
};

export default SettingsPage;
