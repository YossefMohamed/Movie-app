import { useRouter } from "next/router";
import React from "react";
import { FaHandHoldingHeart, FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsFillBookmarkFill, BsSearch } from "react-icons/bs";
import Link from "next/link";
import {
  RiLoginCircleFill,
  RiLogoutCircleFill,
  RiVipCrownFill,
} from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { Rootstate } from "../redux/store";
import { IoAlbums } from "react-icons/io5";
import { MdFavorite } from "react-icons/md";
import { logout } from "../redux/user";
import Image from "next/image";

function SearchInput() {
  const router = useRouter();
  const [keyword, setKeyword] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const { id, name: userName } = useSelector(
    (state: Rootstate) => state.user.user
  );
  const [isUser, setIsUser] = React.useState(false);
  const dispatch = useDispatch();
  React.useEffect(() => {
    id ? setIsUser(true) : setIsUser(false);
  }, [id]);
  React.useEffect(() => {
    setIsOpen(false);
  }, [router.pathname]);
  return (
    <div>
      <form
        className=" relative rounded-xl overflow-hidden  justify-start d-none d-lg-flex"
        onSubmit={(e) => {
          e.preventDefault();
          setKeyword("");
          router.push(`/search/${keyword}`);
        }}
      >
        <button className="p-7 bg-secondary-dark " type="submit">
          <span className="text-text-dark text-4xl">
            <FaSearch />
          </span>
        </button>
        <input
          type="text"
          className="w-full border-0 outline-0 bg-secondary-dark p-7 text-text-dark
        focus:bg-secondary-dark focus:text-text-dark text-3xl font-bold"
          placeholder="Search for movies or TV series"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </form>
      <div className="resposive-bar d-block d-lg-none bg-primary-dark text-text-dark relative">
        <div className="bottom px-4 py-6 rounded-xl">
          <div className="flex justify-between items-center">
            <div className="mr-8  text-red-600 text-5xl">
              <Link href="/">
                <a>
                  <RiVipCrownFill />
                </a>
              </Link>
            </div>
            <div className="d-none d-md-block flex-1 text-xl">
              <div className="search-input d-flex px-5 ">
                <input
                  type="text"
                  placeholder="Search"
                  className="flex-1 p-3 px-4 border outline-none rounded-none"
                />
                <div className="select-input">
                  <select id="countries" className="h-full border px-2">
                    <option selected>Choose a Category</option>
                    <option>Electronics</option>
                    <option>Kitchen</option>
                    <option>Books</option>
                  </select>
                </div>
                <button className="btn bg-black text-text rounded-none border border-primary-color hover:bg-secondary hover:text-text outline-none px-4 border-none">
                  <BsSearch />
                </button>
              </div>
            </div>
            <div
              className="d-md-none menu-input text-4xl cursor-pointer"
              onClick={() => {
                setIsOpen((prev) => !prev);
              }}
            >
              <GiHamburgerMenu />
            </div>
          </div>
        </div>
        {isOpen && (
          <ul
            className="menu absolute top-full d-flex d-md-none flex-col w-full 
    text-3xl py-4  z-[90000]  bg-primary-dark"
          >
            <li className="border-y">
              <Link href="/shows">
                <a className="cursor-pointer flex text-4xl gap-4 px-4 py-4">
                  Shows <IoAlbums />
                </a>
              </Link>
            </li>
            {isUser && (
              <>
                <li className="border-y">
                  <Link href="/favorites">
                    <a className="cursor-pointer flex text-4xl gap-4 px-4 py-3">
                      Favorites <MdFavorite />
                    </a>
                  </Link>
                </li>
                <li className="border-y">
                  <Link href="/saved">
                    <a className="cursor-pointer flex text-4xl gap-4 px-4 py-3">
                      Saved <BsFillBookmarkFill />
                    </a>
                  </Link>
                </li>
              </>
            )}
            <li className="border-y">
              <Link href="/support-center">
                <a className="cursor-pointer flex text-4xl gap-4 px-4 py-3">
                  Support Center <FaHandHoldingHeart />
                </a>
              </Link>
            </li>

            {!isUser ? (
              <li className="border-y">
                <Link href="/login">
                  <a className="cursor-pointer flex text-4xl gap-4 px-4 py-4">
                    Login <RiLoginCircleFill />
                  </a>
                </Link>
              </li>
            ) : (
              <li onClick={() => dispatch(logout())}>
                <div>
                  <a className="cursor-pointer flex text-4xl gap-4 px-4 py-4">
                    Logout <RiLogoutCircleFill />
                  </a>
                </div>
              </li>
            )}

            {isUser && (
              <li className="border-y">
                <div>
                  <Link href="/me">
                    <a className="cursor-pointer flex text-4xl gap-4 px-4 py-4 items-center">
                      {userName}
                      <Image
                        src={`https://avatars.dicebear.com/api/big-ears-neutral/${id}.svg`}
                        alt="Picture of the author"
                        className="rounded-full"
                        width={30}
                        height={30}
                        objectFit="contain"
                      />
                    </a>
                  </Link>
                </div>
              </li>
            )}
            <li className="px-3 py-4 cursor-pointer">
              <div className="search-input d-flex">
                <input
                  type="text"
                  placeholder="Search"
                  className="flex-1 p-3 px-4 border outline-none rounded-none"
                />

                <button className="btn bg-black px-4 text-text rounded-none border border-primary-color hover:bg-secondary hover:text-text outline-none">
                  <BsSearch />
                </button>
              </div>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default SearchInput;
