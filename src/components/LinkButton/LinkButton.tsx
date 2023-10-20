import { Pressable } from "@/components/Pressable/Pressable";
import Link from "next/link";

interface LinkButtonProps {
  href: string;
  children?: React.ReactNode;
}
export function LinkButton({ href, children }: LinkButtonProps) {
  return (
    <Link href={href} legacyBehavior>
      <Pressable as="a">{children}</Pressable>
    </Link>
  );
}
