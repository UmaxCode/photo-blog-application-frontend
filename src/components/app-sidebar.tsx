import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { ChevronUp, Home, User2, Users, Recycle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useAuth } from "../contexts/AuthContext";
import { useConfig } from "../contexts/ConfigContext";

// Menu items.
const items = [
  {
    title: "Home",
    url: ".",
    icon: Home,
    end: true,
  },
  {
    title: "Others Photos",
    url: "others-photos",
    icon: Users,
    end: false,
  },
  {
    title: "Recycling Bin",
    url: "recycling-bin",
    icon: Recycle,
    end: false,
  },
];
export function AppSidebar() {
  const { firstName, lastName, clearAuthData } = useAuth();
  const { auth, clientId } = useConfig();

  const logout = () => {
    clearAuthData();
    const logoutUrl = window.location.origin;
    window.location.href = `${auth}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(
      logoutUrl
    )}`;
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-orange-600 text-[1.2em] my-2">
            UmaxPhotoShare
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <NavLink
                    to={item.url}
                    className={({ isActive }) =>
                      `flex items-center space-x-2 px-4 py-2 rounded mt-2 ${
                        isActive
                          ? "text-white bg-orange-600"
                          : "text-gray-700 hover:bg-orange-300 hover:text-white"
                      } `
                    }
                    end={item.end}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> {firstName} {lastName}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span onClick={logout}>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
