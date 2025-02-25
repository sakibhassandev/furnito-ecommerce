import { InfoHighlights } from "@/ui/common/InfoHighlights";
import MyProfile from "@/ui/common/MyProfile";
import { SectionCommonHeader } from "@/ui/common/SectionCommonHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
};

const ProfilePage = () => {
  return (
    <section className="profile-container">
      <SectionCommonHeader name="Profile" prev="Home" curr="Profile" />
      <div className="max-w-screen-2xl my-20 2xl:mx-auto">
        <MyProfile />
      </div>
      <InfoHighlights />
    </section>
  );
};

export default ProfilePage;
