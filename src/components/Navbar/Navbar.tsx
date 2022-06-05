import React, { useEffect, useState, useRef } from "react";
import Dropdown from "../Dropdown.tsx/Dropdown";
import { useWeb3React } from "@web3-react/core";
import "./styles.css";
import logo_white from "../../assets/images/logo_white.png";
import { FaWallet } from "react-icons/fa";
import Search from "../Search/Search";
import { Link, useHistory } from "react-router-dom";
import { truncateWalletString } from "../../utils";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import Button from "../MoreComponents/Button";
import ConnectModal from "../connectModal/ConnectModal";
import CustomDropdown from "../dropdown/CustomDropdown";

let useClickOutside = (handler: any) => {
  let domNode: React.MutableRefObject<any> = useRef();

  useEffect(() => {
    let maybeHandler = (event: any) => {
      if (!domNode.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  });

  return domNode;
};

const Navbar = (props: any) => {
  const { user, isUserInfoUpdated, setIsLoading } = props;
  const [showConnectModal, setShowConnectModal] = useState(false);
  const { connector, library, chainId, account, active } = useWeb3React();
  const [loginStatus, setLoginStatus] = useState(false);
  const newVariable: any = process.env.REACT_APP_NETWORK_ID;
  useEffect(() => {
    const isLoggedin: any =
      account && active && chainId === parseInt(newVariable, 10);
    setLoginStatus(isLoggedin);
  }, [connector, library, account, active, chainId]);

  const [logo, setLogo] = useState("");
  useEffect(() => {
    if (loginStatus || isUserInfoUpdated) {
      console.log("Fetching Item");
      axios.get(`/user/${account}`).then((res) => {
        setLogo(res.data.user.logo_url);
      });
    }
  }, [loginStatus, isUserInfoUpdated]);

  let domNode = useClickOutside(() => {
    setStatus("close");
    setOpen(false);
  });
  const [show, handleShow] = useState(false);
  const [navId, setNavId] = useState("mint");

  const [status, setStatus] = useState("close");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    });
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);
  const goToPage = (url: any) => {
    if (!loginStatus) {
      return;
    }
    let href = "";
    if (url === "Collection" || url === "Item") {
      href = "/" + url.toLowerCase() + "/create";
    } else {
      href = "/" + url.toLowerCase();
    }
    router.push(href);
  };

  const router = useHistory();
  const { logout }: any = useAuth();

  const goToProfilePage: any = (url: any) => {
    if (url === "Profile") {
      router.push({
        pathname: "/account",
        search: "?tab=collections",
        state: { address: account },
      });
    } else if (url === "Favorites") {
      router.push({
        pathname: "/account",
        search: "?tab=favorites",
        state: { address: account },
      });
    } else if (url === "Settings") {
      const href = "/account/settings";
      router.push(href);
    } else if (url === "My Collections") {
      const href = "/myCollections";
      router.push(href);
    } else if (url === "My Nfts") {
      const href = "/myNfts";
      router.push(href);
    } else if (url === "Log Out") {
      if (isUserInfoUpdated) router.push("/");
      logout();
    }
  };

  return (
    <div className={`navbar-container ${show && "nav_scroll"}`}>
      <div className="navbar">
        <div className="navbar-logo">
          <Link to="/">
            <img src={logo_white} alt="" />
          </Link>
        </div>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/Explore">Explorer</Link>
          <Link to="/Item-Details">Item Details</Link>
          <Link to="/Activity">Activity</Link>
          <Link to="/Contact">Contact</Link>
          <Link to="/Authors">Authors</Link>
        </div>
        <ConnectModal
          showConnectModal={showConnectModal}
          setShowConnectModal={setShowConnectModal}
          setIsLoading={setIsLoading}
        />
        <div
          ref={domNode}
          className={open ? "slider-menu active" : "slider-menu"}
        >
          <div>
            <Link
              onClick={() => {
                setStatus(status === "open" ? "close" : "open");
                setOpen(!open);
              }}
              to="/"
            >
              Home
            </Link>
          </div>
          <div>
            <Link
              onClick={() => {
                setStatus(status === "open" ? "close" : "open");
                setOpen(!open);
              }}
              to="/Explore"
            >
              Explorer
            </Link>
          </div>
          <div>
            <Link
              onClick={() => {
                setStatus(status === "open" ? "close" : "open");
                setOpen(!open);
              }}
              to="/Item-Details"
            >
              Item Details
            </Link>
          </div>
          <div>
            <Link
              onClick={() => {
                setStatus(status === "open" ? "close" : "open");
                setOpen(!open);
              }}
              to="/Activity"
            >
              Activity
            </Link>
          </div>
          <div>
            <Link
              onClick={() => {
                setStatus(status === "open" ? "close" : "open");
                setOpen(!open);
              }}
              to="/Contact"
            >
              Contact
            </Link>
          </div>
          <div>
            <Link
              onClick={() => {
                setStatus(status === "open" ? "close" : "open");
                setOpen(!open);
              }}
              to="/Authors"
            >
              Authors
            </Link>
          </div>
          {window.innerWidth < 550 && (
            <>
              <div>
                <Link
                  onClick={() => {
                    setStatus(status === "open" ? "close" : "open");
                    setOpen(!open);
                  }}
                  to="/Item/Create"
                >
                  Create Item
                </Link>
              </div>
              <div>
                <Link
                  onClick={() => {
                    setStatus(status === "open" ? "close" : "open");
                    setOpen(!open);
                  }}
                  to="/Collection/Create"
                >
                  Create Collection
                </Link>
              </div>
            </>
          )}
        </div>
        <div className="nav-btns">
          <Search />
          {loginStatus && (
            <CustomDropdown
              navDropdown
              caret={false}
              buttonText={
                <>
                  <img
                    src={logo !== "" ? logo : "/assets/img/faces/avatar.jpg"}
                    className="img"
                    alt="profile"
                  />
                  <span className="mobileLabel">Account</span>
                </>
              }
              onClick={(url) => {
                goToProfilePage(url);
              }}
              buttonProps={{
                className: "navLink imageDropdownButton",
                color: "transparent",
              }}
              dropdownList={[
                "Profile",
                "Favorites",
                "My Collections",
                "My Nfts",
                "Settings",
                "Log Out",
              ]}
              // className="activeLink"
            />
          )}
          {loginStatus && (
            <div
              onClick={() => {
                setNavId("create");
              }}
              className={
                navId === "create" ? "slected show-hide-drop" : "show-hide-drop"
              }
            >
              <CustomDropdown
                navDropdown
                buttonText="Create"
                onClick={(url) => {
                  goToPage(url);
                }}
                buttonProps={{
                  className: "navLink",
                  color: "transparent",
                }}
                dropdownList={["Collection", "Item"]}
                // className="activeLink"
              />

              {/* <HashLink to="/create/collection" smooth>Create</HashLink> */}
            </div>
          )}
          <Button
            onClick={() => {
              !loginStatus && setShowConnectModal(true);
            }}
            // label="Wallet connect"
            className="connect-wallet"
            navBar={true}
            children={
              loginStatus ? truncateWalletString(account) : "Wallet connect"
            }
            icon={<FaWallet />}
          />
          {/* <button className="connect-wallet wallet">
          </button> */}
          <div
            className="BurgerMenu__container"
            role="button"
            onClick={() => {
              setStatus(status === "open" ? "close" : "open");
              setOpen(!open);
            }}
          >
            <i className={status}></i>
            <i className={status}></i>
            <i className={status}></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
