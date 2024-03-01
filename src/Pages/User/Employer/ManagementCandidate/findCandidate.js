import HeaderEmployer from "../../Themes/Header/headerEmployer";
import SideBar from "../MangementPage/sidebar";

function FindCandidate() {
    return (
        <>
            <HeaderEmployer />
            <div className="employer-page">
                <div className="employer-page-sidebar">
                    <SideBar />
                </div>

                <div className="employer-page-content">
                    <h1>1</h1>
                </div>
            </div>
        </>
    )
}

export default FindCandidate;