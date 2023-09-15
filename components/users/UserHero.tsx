import Image from "next/image";
import useUser from "@/hooks/useUser";
import Avatar from "../Avatar";

interface UserHeroProps{
    userId:string;
}

const UserHero:React.FC<UserHeroProps>  = ({userId})=>{
    const {data:fetchedUSer}=useUser(userId);
    return(
        
        <div>
            <div className="bg-neutral-700 h-44 relative">
                {fetchedUSer?.coverImage && (
                    <Image src={fetchedUSer.coverImage} fill alt="Cover Image" style={{objectFit: 'cover'}}/>
                )}
                <div className="absolute -bottom-16 left-4">
                    <Avatar userId={userId} isLarge hasBorder/>
                </div>
            </div>
        </div>
    );
}
export default UserHero;