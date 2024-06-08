import useUser from "../../../Hooks/useUser/useUser";
import CommonProfile from "../../../Sheared/commonProfile/CommonProfile";


const ParticipantProfile = () => {
    const [userData] = useUser();
    return (
        <div>
            <CommonProfile data={userData}></CommonProfile>
        </div>
    );
};

export default ParticipantProfile;