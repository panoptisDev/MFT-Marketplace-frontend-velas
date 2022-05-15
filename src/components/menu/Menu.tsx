import "./menu.scss"
import { HashLink } from 'react-router-hash-link'
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import CustomDropdown from "components/dropdown/CustomDropdown";
type MenuType = {
    menuOpen: boolean;
    setMenuOpen(flag: boolean): void;
};

export default function Menu({ menuOpen, setMenuOpen }: MenuType) {
    const [navId, setNavId] = useState('mint')
    const search = useLocation();
    useEffect(() => {
        const label = search.pathname.replace('/', '')
        setNavId(label)
        // console.log(tabID); //101

    }, [setNavId, search]);

    const router = useHistory ();
	const goToPage = (url) => {
		const href = "/create/" + url.toLowerCase();
		router.push(href)
	};
    
    return (
        <div className={"sidebar " + (menuOpen && "active")}>
            <ul>
                <li onClick={() => setMenuOpen(false)} className={`menuItem1 ${menuOpen && "active"} ${navId === "collections" && "colored"}`}>
                    <HashLink to="/collections">COLLECTIOONS</HashLink>
                </li>

                <li onClick={() => setMenuOpen(false)} className={`menuItem2 ${menuOpen && "active"} ${navId === "myNfts" && "colored"}`}>
                    <HashLink to="/myNfts" smooth>My NFTS</HashLink>
                </li>
                <li onClick={() => setMenuOpen(false)} className={`menuItem3 ${menuOpen && "active"} ${navId === "offers" && "colored"}`}>
                    <HashLink to="/offers" smooth>LATEST OFFER</HashLink>
                </li>


                <li onClick={() => setMenuOpen(false)} className={`menuItem4 ${menuOpen && "active"} ${navId === "trades" && "colored"}`}>
                    <HashLink to="/trades" smooth>LATEST TRADE</HashLink>
                </li>

                

                <li className={`menuItem5 ${menuOpen && "active"} ${navId === "create" && "colored"}`}>
                <CustomDropdown
                            navDropdown
                            buttonText="Create"
                            onClick={(url) => {
                                goToPage(url);
                                setMenuOpen(false);
                            }}
                            buttonProps={{
                                className: "navLink",
                                color: "transparent",
                                
                            }}
                            dropdownList={[
                                "Collection",
                                "Item",
                            ]}
                        />
                </li>

              
                <li onClick={() => setMenuOpen(false)} className={`menuItem6 ${menuOpen && "active"} ${navId === "trailer" && "colored"}`}>
                    <HashLink to="/trailer" smooth>Trailer</HashLink>
                </li>
                <li onClick={() => setMenuOpen(false)} className={`menuItem7 ${menuOpen && "active"} ${navId === "docs" && "colored"}`}>
                    <HashLink to="/docs" smooth>Docs</HashLink>
                </li>

                <li onClick={() => setMenuOpen(false)} className={`menuItem7 ${menuOpen && "active"} ${navId === "docs" && "colored"}`}>
                    <div className="socialLinks">
                        <a href="https://discord.gg/m7TcCtzhCm" target="_blank" rel="noreferrer"><img src="assets/discord.webp" alt="" /></a>
                        <a href="https://twitter.com/streetbrawlerz" target="_blank" rel="noreferrer"><img src="assets/twitter.webp" alt="" /></a>
                        <a href="https://verify.raritysniper.com/" target="_blank" rel="noreferrer"><img src="assets/image03.png" alt="" /></a>
                        
                    </div>
                </li>
            </ul>
        </div>
    )
}

