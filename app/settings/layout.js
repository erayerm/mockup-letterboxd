import SettingsNavbar from "../components/SettingsNav";


const SettingsLayout = ({ children }) => {
    return (
        <div>
            <div className="bg-[#20272D] h-screen">
                <h1 className="text-[#abc] text-[32px]">Account Settings</h1>
                <SettingsNavbar />
                {children}
            </div>
        </div>
    );
};

export default SettingsLayout;
