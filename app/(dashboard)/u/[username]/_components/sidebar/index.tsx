import { Navigation } from "./navigation";
import { Toggle } from "./toggle";
import { Wrapper } from "./wrapper";

export function SideBar(){
    return<>
        <Wrapper>
           <Toggle/>
           <Navigation/>
        </Wrapper>
    </>
}