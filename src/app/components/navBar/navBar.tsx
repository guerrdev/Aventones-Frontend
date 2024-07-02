'use client'
import { useTheme } from "next-themes";
import styles from "./navBar.module.css";
import { useRouter } from 'next/navigation'
import { useAuth } from "@/app/AuthContext";
import React, { useEffect, useState } from "react";
import { Navbar, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, NavbarBrand, NavbarContent, NavbarItem, Image, Button, Link, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar } from "@nextui-org/react";
import { Moon, Sun } from "react-feather";
// import { ChevronDown, Lock, Activity, Flash, Server, TagUser, Scale } from "./Icons";

export default function NavBar() {

    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()
    const Router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const { isLogged, setIsLogged, email } = useAuth();

    useEffect(() => {
        setMounted(true)
    }, [])
    if (!mounted) return null

    //get the email from the cookie

    const clearCookies = () => {
        document.cookie = 'authEmail=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'isLogged=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
    return (
        <Navbar onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    {theme === "dark" ? (<Image
                        id={styles.Alogo}
                        isBlurred
                        src="/aventones-light.png"
                        width={156}
                        alt="Aventones' Inc Logo"
                        className="m-5"
                        disableSkeleton={true}
                        onClick={() => { Router.push('/'); }}
                    />) : (<Image
                        id={styles.Alogo}
                        isBlurred
                        src="/aventones-dark.png"
                        width={156}
                        alt="Aventones' Inc Logo"
                        className="m-5"
                        disableSkeleton={true}
                        onClick={() => { Router.push('/'); }}
                    />)}
                </NavbarBrand>
            </NavbarContent>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="/">
                        Home
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    {isLogged ? (<Link color="foreground" href="/aventones">My Aventones</Link>) :
                        <Link color="foreground" href="/reqbooking">Request an Aventon</Link>}
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="/settings">
                        Settings
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent as="div" justify="end">
                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        {isLogged ? (
                            <Avatar
                                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                                alt="Zoey"
                                size="sm"
                            />
                        ) : (
                            <>
                                <NavbarItem>
                                    <Button as={Link} color="secondary" onPress={() => Router.push('/login')} variant="ghost">
                                        Log In
                                    </Button>
                                </NavbarItem>
                                <NavbarItem>
                                    <Button as={Link} color="secondary" onPress={() => Router.push('/register')} variant="ghost">
                                        Sign Up
                                    </Button>
                                </NavbarItem>
                            </>
                        )}
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                        <DropdownItem aria-label="Profile Actions" key="profile P" className="h-14 gap-2">
                            <div aria-label="User Email" className="font-semibold">Signed in as</div>
                            <div aria-label="User Email" className="font-semibold">{email}</div>
                        </DropdownItem>
                        <DropdownItem aria-label="aventones" key="aventones" onPress={() => Router.push('/aventones')}>My Aventones</DropdownItem>
                        <DropdownItem aria-label="User Profile" key="profile" onPress={() => Router.push('/profile')}>My Profile</DropdownItem>
                        <DropdownItem aria-label="User Settings" key="settings" onPress={() => Router.push('/settings')}>Settings</DropdownItem>
                        <DropdownItem aria-label="Help" key="help_and_feedback" onPress={() => Router.push('/help')}>Help & Feedback</DropdownItem>
                        <DropdownItem aria-label="Log Out" onPress={() => {
                            clearCookies(); window.location.reload(); setIsLogged(false);
                        }}
                            key="logout" color="danger">
                            Log Out
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </NavbarContent>
            <>
                {theme === "light" && (
                    <Sun
                        color="black"
                        style={{ cursor: "pointer" }}
                        onClick={() => setTheme("dark")}
                    />
                )}

                {theme === "dark" && (
                    <Moon
                        color="white"
                        style={{ cursor: "pointer" }}
                        onClick={() => setTheme("light")}
                    />
                )}
            </>
            <NavbarMenu>
                {isLogged ? (
                    <React.Fragment>
                        <NavbarMenuItem>
                            <Link color="secondary" href="/">Home</Link>
                        </NavbarMenuItem>
                        <NavbarMenuItem>
                            {isLogged ? (<Link color="foreground" href="/aventones">My Aventones</Link>) :
                                <Link color="foreground" href="/reqbooking">Request an Aventon</Link>}
                        </NavbarMenuItem>
                        <NavbarMenuItem>
                            <Link color="foreground" href="/profile">My Profile</Link>
                        </NavbarMenuItem>
                        <NavbarMenuItem>
                            <Link color="foreground" href="/settings">Settings</Link>
                        </NavbarMenuItem>
                        <NavbarMenuItem>
                            <Link onPress={() => {
                                clearCookies(); window.location.reload(); setIsLogged(false);
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