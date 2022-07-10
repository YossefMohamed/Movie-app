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
export default function Header() {
  const { id } = useSelector((state: any) => state.user.user);
  const [isUser, setIsUser] = React.useState(false);
  React.useEffect(() => {
    id ? setIsUser(true) : setIsUser(false);
  }, [id]);
  const dispatch = useDispatch();
  return (
    <div className="opacity-0 lg:opacity-100 flex container   fixed top-4 left-4 w-fit flex-col flex-1 items-center gap-8 bg-secondary-dark rounded-3xl h-full">
      <div className="icon text-red-600 text-6xl">
        <Link href="/">
          <a>
            <RiVipCrownFill />
          </a>
        </Link>
      </div>
      <div className="links text-text-dark text-6xl mt-10">
        <Link href="/shows">
          <a>
            <IoAlbums />
          </a>
        </Link>
      </div>
      {isUser && (
        <>
          <div className="links text-text-dark text-6xl mt-10">
            <Link href="/favorites">
              <a>
                <MdFavorite />
              </a>
            </Link>
          </div>
          <div className="links text-text-dark text-6xl mt-10">
            <Link href="/saved">
              <a>
                <BsFillBookmarkFill />
              </a>
            </Link>
          </div>
        </>
      )}
      <div className="links text-text-dark text-6xl mt-10">
        <Link href="/saved">
          <a>
            <IoMoon />
          </a>
        </Link>
      </div>

      <div className="links text-text-dark text-6xl mt-10">
        <Link href="/support-center">
          <a>
            <FaHandHoldingHeart />
          </a>
        </Link>
      </div>

      {!isUser ? (
        <div className="links text-text-dark text-6xl mt-10">
          <Link href="/login">
            <a>
              <RiLoginCircleFill />
            </a>
          </Link>
        </div>
      ) : (
        <div
          className="links text-text-dark text-6xl mt-10"
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
        <div className="links text-text-dark text-6xl mt-auto">
          <div>
            <Link href="/me">
              <a>
                <Image
                  src={`https://avatars.dicebear.com/api/big-ears-neutral/${id}.svg`}
                  alt="Picture of the author"
                  className="rounded-full"
                  width={50}
                  height={50}
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
