import ChangePassword from "@/components/ChangePassword";

export const metadata = {
    title: "Create a new password",
};

const ChangePasswordPage = ({params}) => {
    return (
        <>
            <ChangePassword params={params} />
        </>
    );
};

export default ChangePasswordPage;
