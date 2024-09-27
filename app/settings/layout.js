import ProTag from "../components/ProTag";
import SettingsNavbar from "../components/SettingsNav";


const SettingsLayout = ({ children }) => {
    return (
        <div>
            <div className="bg-[#20272D] min-h-screen">
                <div className="container">
                    <div className="py-[28px] flex w-full justify-between items-center">
                        <h1 className="text-[#abc] text-[32px]">Account Settings</h1>
                        <div className="flex items-center gap-5">
                            <p>Upgrade to <ProTag /> for additional features</p>
                            <button className="bg-inherit border-[#303840] rounded-sm border-2 hover:border-gray-400 px-2">SUBSCRIBE</button>
                        </div>
                    </div>
                    <SettingsNavbar />
                    {children}
                </div>
            </div>
        </div>
    );
};

export default SettingsLayout;
