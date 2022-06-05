import "./styles.css";

const Dropdown = () => {
  return (
    <div className="dropdown">
      <nav id="main-nav" className="main-nav">
        <ul id="menu-primary-menu" className="menu">
          <li className="menu-item current-menu-item menu-item-has-children">
            <a href="index.html">Home</a>
            <ul className="sub-menu">
              <li className="menu-item">
                <a href="index.html">Home 1</a>
              </li>
              <li className="menu-item">
                <a href="home2.html">Home 2</a>
              </li>
              <li className="menu-item current-item">
                <a href="home3.html">Home 3</a>
              </li>
              <li className="menu-item">
                <a href="home4.html">Home 4</a>
              </li>
              <li className="menu-item">
                <a href="home5.html">Home 5</a>
              </li>
              <li className="menu-item">
                <a href="home6.html">Home 6</a>
              </li>
              <li className="menu-item">
                <a href="home7.html">Home 7</a>
              </li>
              <li className="menu-item">
                <a href="home8.html">Home 8 ( Special )</a>
              </li>
              <li className="menu-item menu-item-has-children">
                <a href="#">Slider Styles</a>
                <ul className="sub-menu">
                  <li className="menu-item">
                    <a href="slider-typer-text.html">Text Type</a>
                  </li>
                  <li className="menu-item">
                    <a href="slider-scroll-text.html">Text Scroll</a>
                  </li>
                  <li className="menu-item">
                    <a href="slider-rotate-text.html">Text Rotate</a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li className="menu-item menu-item-has-children">
            <a href="#">Explore</a>
            <ul className="sub-menu">
              <li className="menu-item">
                <a href="explore-1.html">Explore Style 1</a>
              </li>
              <li className="menu-item">
                <a href="explore-2.html">Explore Style 2</a>
              </li>
              <li className="menu-item">
                <a href="explore-3.html">Explore Style 3</a>
              </li>
              <li className="menu-item">
                <a href="explore-4.html">Explore Style 4</a>
              </li>
              <li className="menu-item">
                <a href="auctions.html">Live Auctions</a>
              </li>
              <li className="menu-item">
                <a href="item-details.html">Item Details</a>
              </li>
              <li className="menu-item">
                <a href="item-details-2.html">Item Details 2</a>
              </li>
            </ul>
          </li>
          <li className="menu-item menu-item-has-children">
            <a href="#">Activity</a>
            <ul className="sub-menu">
              <li className="menu-item">
                <a href="activity1.html">Activity 1</a>
              </li>
              <li className="menu-item">
                <a href="activity2.html">Activity 2</a>
              </li>
            </ul>
          </li>
          <li className="menu-item menu-item-has-children">
            <a href="#">Community</a>
            <ul className="sub-menu">
              <li className="menu-item">
                <a href="blog.html">Blog</a>
              </li>
              <li className="menu-item">
                <a href="blog-details.html">Blog Details</a>
              </li>
              <li className="menu-item">
                <a href="help-center.html">Help Center</a>
              </li>
            </ul>
          </li>
          <li className="menu-item menu-item-has-children">
            <a href="#">Pages</a>
            <ul className="sub-menu">
              <li className="menu-item">
                <a href="author01.html">Authors</a>
              </li>
              <li className="menu-item">
                <a href="connect-wallet.html">Wallet Connect</a>
              </li>
              <li className="menu-item">
                <a href="create-item.html">Create Item</a>
              </li>
              <li className="menu-item">
                <a href="profile.html">Edit Profile</a>
              </li>

              <li className="menu-item">
                <a href="ranking.html">Ranking</a>
              </li>
              <li className="menu-item">
                <a href="login.html">Login</a>
              </li>
              <li className="menu-item">
                <a href="signup.html">Sign Up</a>
              </li>
              <li className="menu-item">
                <a href="no-result.html">No Result</a>
              </li>
              <li className="menu-item">
                <a href="faq.html">FAQ</a>
              </li>
            </ul>
          </li>
          <li className="menu-item  menu-item-has-children">
            <a href="#">Contact</a>
            <ul className="sub-menu">
              <li className="menu-item">
                <a href="contact1.html">Contact</a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      {/* <div className="flat-search-btn flex">
        <div className="header-search flat-show-search" id="s1">
          <a href="#" className="show-search header-search-trigger"></a>
          <div className="top-search">
            <form action="#" method="get" role="search" className="search-form">
              <input
                type="search"
                id="s"
                className="search-field"
                placeholder="Search..."
                value=""
                name="s"
                title="Search for"
                required
              />
              <button
                className="search search-submit"
                type="submit"
                title="Search"
              >
                <i className="icon-fl-search-filled"></i>
              </button>
            </form>
          </div>
        </div>
        <div className="sc-btn-top mg-r-12" id="site-header">
          <a
            href="connect-wallet.html"
            id="connectbtn"
            className="sc-button header-slider style style-1 wallet fl-button pri-1"
          >
            <span>Wallet connect </span>
          </a>
        </div>

        <div className="admin_active" id="header_admin">
          <div className="header_avatar">
            <div className="popup-notification">
              <div className="notification">
                <span className="number">3</span>
                <h1>Here lies an SVG1</h1>
              </div>
              <div className="avatar_popup2 mt-20">
                <div className="show mg-bt-18">
                  <h4>Notifications</h4>
                  <a href="#">Show All</a>
                </div>
                <div className="flat-tabs">
                  <ul className="menu-tab">
                    <li className="active">
                      <span>All</span>
                    </li>
                    <li>
                      <span>Unread</span>
                    </li>
                  </ul>
                  <div className="content-tab">
                    <div className="content-inner">
                      <div className="wrap-box">
                        <div className="heading">Today</div>
                        <div className="sc-box">
                          <div className="content">
                            <div className="avatar">
                              <img
                                src="assets/images/avatar/avt-6.jpg"
                                alt=""
                              />
                            </div>
                            <div className="infor">
                              <span className="fw-7">Tyler Covington</span>
                              <span>started following you.</span>
                              <p>1 hour ago</p>
                            </div>
                          </div>
                        </div>
                        <div className="sc-box">
                          <div className="content">
                            <div className="avatar">
                              <img
                                src="assets/images/avatar/avt-6.jpg"
                                alt=""
                              />
                            </div>
                            <div className="infor">
                              <span className="fw-7">Tyler Covington</span>
                              <span>started following you.</span>
                              <p>1 hour ago</p>
                            </div>
                          </div>
                        </div>
                        <div className="sc-box">
                          <div className="content">
                            <div className="avatar">
                              <img
                                src="assets/images/avatar/avt-6.jpg"
                                alt=""
                              />
                            </div>
                            <div className="infor">
                              <span className="fw-7">Tyler Covington</span>
                              <span>liked your items.</span>
                              <p>1 hour ago</p>
                            </div>
                          </div>
                        </div>
                        <div className="sc-box">
                          <div className="content">
                            <div className="avatar">
                              <img
                                src="assets/images/avatar/avt-6.jpg"
                                alt=""
                              />
                            </div>
                            <div className="infor">
                              <span className="fw-7">Tyler Covington</span>
                              <span>started following you.</span>
                              <p>1 hour ago</p>
                            </div>
                          </div>
                        </div>
                        <div className="sc-box">
                          <div className="content">
                            <div className="avatar">
                              <img
                                src="assets/images/avatar/avt-6.jpg"
                                alt=""
                              />
                            </div>
                            <div className="infor">
                              <span className="fw-7">Tyler Covington</span>
                              <span>started following you.</span>
                              <p>1 hour ago</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="wrap-box">
                        <div className="heading">Yesterday</div>
                        <div className="sc-box">
                          <div className="content">
                            <div className="avatar">
                              <img
                                src="assets/images/avatar/avt-6.jpg"
                                alt=""
                              />
                            </div>
                            <div className="infor">
                              <span className="fw-7">Tyler Covington</span>
                              <span>started following you.</span>
                              <p>1 hour ago</p>
                            </div>
                          </div>
                        </div>
                        <div className="sc-box">
                          <div className="content">
                            <div className="avatar">
                              <img
                                src="assets/images/avatar/avt-6.jpg"
                                alt=""
                              />
                            </div>
                            <div className="infor">
                              <span className="fw-7">Tyler Covington</span>
                              <span>started following you.</span>
                              <p>1 hour ago</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="content-inner">
                      <div className="wrap-box">
                        <div className="heading">Today</div>
                        <div className="sc-box">
                          <div className="content">
                            <div className="avatar">
                              <img
                                src="assets/images/avatar/avt-6.jpg"
                                alt=""
                              />
                            </div>
                            <div className="infor">
                              <span className="fw-7">Tyler Covington</span>
                              <span>started following you.</span>
                              <p>1 hour ago</p>
                            </div>
                          </div>
                        </div>
                        <div className="sc-box">
                          <div className="content">
                            <div className="avatar">
                              <img
                                src="assets/images/avatar/avt-6.jpg"
                                alt=""
                              />
                            </div>
                            <div className="infor">
                              <span className="fw-7">Tyler Covington</span>
                              <span>started following you.</span>
                              <p>1 hour ago</p>
                            </div>
                          </div>
                        </div>
                        <div className="sc-box">
                          <div className="content">
                            <div className="avatar">
                              <img
                                src="assets/images/avatar/avt-6.jpg"
                                alt=""
                              />
                            </div>
                            <div className="infor">
                              <span className="fw-7">Tyler Covington</span>
                              <span>started following you.</span>
                              <p>1 hour ago</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="wrap-box">
                        <div className="heading">Yesterday</div>
                        <div className="sc-box">
                          <div className="content">
                            <div className="avatar">
                              <img
                                src="assets/images/avatar/avt-6.jpg"
                                alt=""
                              />
                            </div>
                            <div className="infor">
                              <span className="fw-7">Tyler Covington</span>
                              <span>started following you.</span>
                              <p>1 hour ago</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="popup-user">
              <img
                className="avatar"
                src="assets/images/avatar/avt-5.jpg"
                alt="avatar"
              />
              <div className="avatar_popup mt-20">
                <h4>Tyler Covington</h4>
                <div className="d-flex align-items-center mt-20 mg-bt-12">
                  <div className="info">
                    <p>Balance</p>
                    <p className="style">45.57 ETH</p>
                  </div>
                </div>
                <p>Wallet</p>
                <div className="d-flex align-items-center justify-content-between mg-t-5 mg-bt-17">
                  <p>0x84569v....3d5t7e5fd</p>
                  <a href="index.html" className="ml-2">
                    <i className="fal fa-copy"></i>
                  </a>
                </div>
                <div className="divider"></div>
                <div className="hr"></div>
                <div className="links mt-20">
                  <a href="#">
                    <h1>Here lies svg3</h1>
                    <span>My Profile</span>
                  </a>
                  <a className="mt-10" href="profile.html">
                    <h1>Here lies svg4</h1>
                    <span>Wallet</span>
                  </a>
                  <a className="mt-10" href="login.html" id="logout">
                    <h1>Here lies svg5</h1>
                    <span>Log out</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Dropdown;
