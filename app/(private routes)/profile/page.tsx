"use client";

import { useAuthStore } from "@/lib/store/authStore";
import css from "./Profile.module.css";
import Link from "next/link";
import Image from "next/image";

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link
            href="/profile/edit"
            prefetch={false}
            className={css.editProfileButton}
          >
            Edit Profile
          </Link>
        </div>

        <div className={css.avatarWrapper}>
          <Image
            src={
              user?.avatar ??
              "https://ac.goit.global/fullstack/react/default-avatar.jpg"
            }
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>

        <div className={css.profileInfo}>
          <p>Username: {user?.username}</p>
          <p>Email: {user?.email}</p>
        </div>
      </div>
    </main>
  );
}
