import {
    SiApple,
    SiFacebook,
    SiGithub,
    SiGoogle,
} from "@icons-pack/react-simple-icons";
import { Button } from "./ui/button";

const providers = [
    { name: "Google", icon: <SiGoogle color="default" /> },
    { name: "Apple", icon: <SiApple /> },
    { name: "Facebook", icon: <SiFacebook color="default" /> },
    { name: "GitHub", icon: <SiGithub /> },
];

/** One button per sign-in provider, labelled by name so they're easy to tell apart. */
export function SocialLogin() {
    return (
        <div className="grid grid-cols-2 gap-3">
            {
                providers.map((provider) => (
                    <Button key={provider.name} type="button" variant="outline" size="lg">
                        {provider.icon}
                        {provider.name}
                    </Button>
                ))
            }
        </div>
    );
}
