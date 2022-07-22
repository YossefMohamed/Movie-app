import React from "react";
import { BsFillBookmarkFill } from "react-icons/bs";
import {
  RiVipCrownFill,
  RiLoginCircleFill,
  RiLogoutCircleFill,
} from "react-icons/ri";
import { IoAlbums, IoMoon } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { MdFavorite } from "react-icons/md";
import { FaHandHoldingHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logout } from "../redux/user";
import { Rootstate } from "../redux/store";
export default function Header() {
  const { id } = useSelector((state: Rootstate) => state.user.user);
  const [isUser, setIsUser] = React.useState(false);
  React.useEffect(() => {
    id ? setIsUser(true) : setIsUser(false);
  }, [id]);
  const dispatch = useDispatch();
  return (
    <div className="d-none d-lg-flex py-6 px-4 md:fixed top-[3%] left-4 w-fit flex-col flex-1 items-center gap-8 bg-secondary-dark rounded-3xl h-[94%] ">
      <div className="icon text-red-600 text-5xl">
        <Link href="/">
          <a>
            <RiVipCrownFill />
          </a>
        </Link>
      </div>
      <div className="links text-text-dark text-5xl mt-10">
        <Link href="/shows">
          <a>
            <IoAlbums />
          </a>
        </Link>
      </div>
      {isUser && (
        <>
          <div className="links text-text-dark text-5xl mt-10">
            <Link href="/favorites">
              <a>
                <MdFavorite />
              </a>
            </Link>
          </div>
          <div className="links text-text-dark text-5xl mt-10">
            <Link href="/saved">
              <a>
                <BsFillBookmarkFill />
              </a>
            </Link>
          </div>
        </>
      )}
      <div className="links text-text-dark text-5xl mt-10">
        <Link href="/support-center">
          <a>
            <FaHandHoldingHeart />
          </a>
        </Link>
      </div>

      {!isUser ? (
        <div className="links text-text-dark text-5xl mt-10">
          <Link href="/login">
            <a>
              <RiLoginCircleFill />
            </a>
          </Link>
        </div>
      ) : (
        <div
          className="links text-text-dark text-5xl mt-10"
          onClick={() => dispatch(logout())}
        >
          <div>
            <a className="cursor-pointer">
              <RiLogoutCircleFill />
            </a>
          </div>
        </div>
      )}
      {isUser && (
        <div className="links text-text-dark text-5xl mt-auto">
          <div>
            <Link href="/me">
              <a>
                <Image
                  src={`https://avatars.dicebear.com/api/big-ears-neutral/${id}.svg`}
                  alt="Picture of the author"
                  className="rounded-full"
                  width={40}
                  height={40}
                  objectFit="contain"
                />
              </a>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
