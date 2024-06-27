'use client'
import React, { useEffect, useState } from "react";
import { useAuth } from "@/app/AuthContext";
import { Navbar, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, NavbarBrand, NavbarContent, NavbarItem, Button, Link, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar } from "@nextui-org/react";
// import { ChevronDown, Lock, Activity, Flash, Server, TagUser, Scale } from "./Icons";

export default function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const { isLogged, setIsLogged, email } = useAuth();
    console.log('NavBar', 'isLogged:', isLogged, 'email:', email);
    const clearCookies = () => {
        document.cookie = 'authEmail=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'isLogged=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} position="sticky">
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    {/* <AcmeLogo /> */}
                    <Link href="/" className="font-bold text-inherit">Aventones</Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="/">
                        Home
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="aventones-test">
                        Aventones CRUDs
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="settings">
                        Integrations
                    </Link>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent as="div" justify="end">
                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        {isLogged ? ( // If token exists, show the avatar with the user's email
                            <Avatar
                                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                                alt="Zoey"
                                size="sm"
                            />
                        ) : (
                            <NavbarItem>
                                <Button as={Link} color="secondary" href="login" variant="ghost">
                                    Log In
                                </Button>
                            </NavbarItem>
                        )}
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                        <DropdownItem key="profile" className="h-14 gap-2">
                            <div className="font-semibold">Signed in as</div>
                            <div className="font-semibold">{email}</div>
                        </DropdownItem>
                        <DropdownItem key="aventones" href="aventones-test">AventonesCRUDs</DropdownItem>
                        <DropdownItem key="profile" href="profile">My Profile</DropdownItem>
                        <DropdownItem key="settings" href="settings">Settings</DropdownItem>
                        <DropdownItem key="help_and_feedback" href="help">Help & Feedback</DropdownItem>
                        <DropdownItem onPress={() => {
                            clearCookies(); window.location.reload(); setIsLogged(false);
                        }}
                            key="logout" color="danger">
                            Log Out
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </NavbarContent>

            <NavbarMenu>
                {isLogged ? (
                    <React.Fragment>
                        <NavbarMenuItem>
                            <Link color="secondary" href="/">Home</Link>
                        </NavbarMenuItem>
                        <NavbarMenuItem>
                            <Link color="foreground" href="aventones-test">AventonesCRUDs</Link>
                        </NavbarMenuItem>
                        <NavbarMenuItem>
                            <Link color="foreground" href="profile">My Profile</Link>
                        </NavbarMenuItem>
                        <NavbarMenuItem>
                            <Link color="foreground" href="settings">Settings</Link>
                        </NavbarMenuItem>
                        <NavbarMenuItem>
                            <Link onPress={() => {
                                sessionStorage.removeItem('token'); window.location.reload(); setIsLogged(false);
                            }}
                                key="logout" color="danger">
                                Log Out</Link>
                        </NavbarMenuItem>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <NavbarMenuItem>
                            <Link color="secondary" href="/">Home</Link>
                        </NavbarMenuItem>
                    </React.Fragment>
                )}
            </NavbarMenu>
        </Navbar>
    );
}